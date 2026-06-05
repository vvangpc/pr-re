/* ============================================================================
 * match.js —— 专利优先审查查找工具 · 匹配引擎（纯前端，无依赖）
 *
 * 判定规则：分类号匹配 且 关键词匹配。
 *   - IPC：逐字段相等比较，支持 * 通配（子树）与排除项（不含/不包括）。
 *   - 关键词：按命中核心词强度匹配（单字/泛词降噪）；排除项「查询词含排除词」单向判定。
 *   - 空关键词（ipc_only）不直接放行，单列为 IPC_ONLY_WARN 提醒人工确认。
 *
 * 数据来源：全局 window.DB（由 data/_loader.js + data/<目录>.js 注入）。
 * ==========================================================================*/
(function (global) {
  'use strict';

  /* ----------------------------- 工具函数 ------------------------------- */

  // 全角 → 半角（数字/字母/常见标点）
  function toHalf(s) {
    return String(s).replace(/[！-～]/g, function (c) {
      return String.fromCharCode(c.charCodeAt(0) - 0xFEE0);
    }).replace(/　/g, ' ');
  }

  /* --------------------------- IPC 归一化 / 匹配 ------------------------- */

  // 解析一个 IPC 码为结构字段。
  // 形如 B60L50/30、B60K6*、H01M10/0563、G06F* 等。
  function normalizeIpc(raw) {
    if (raw == null) return { valid: false, raw: raw };
    var s = toHalf(raw).toUpperCase().replace(/\s+/g, '').replace(/／/g, '/');
    var wildcard = false;
    if (s.charAt(s.length - 1) === '*') { wildcard = true; s = s.slice(0, -1); }
    // 部(A-H) 大类(2位) 小类(1字母)? 大组(1-3位)? (/小组 2-6位)?
    // 注：Y 部为 CPC 专有，IPC 不含；本工具数据零 Y，故部首仅 A-H。
    var m = s.match(/^([A-H])(\d{2})([A-Z])?(\d{1,3})?(?:\/(\d{2,6}))?$/);
    if (!m) return { valid: false, raw: raw };
    var section = m[1], cls = m[2], subclass = m[3] || null,
        group = m[4] || null, subgroup = m[5] || null;
    // 正则要求两位大类数字，故 level 最低为 class，不存在纯部级 section
    var level = subgroup ? 'subgroup' : group ? 'group'
              : subclass ? 'subclass' : 'class';
    return {
      valid: true, raw: raw, norm: s + (wildcard ? '*' : ''),
      section: section, cls: cls, subclass: subclass,
      group: group, subgroup: subgroup, wildcard: wildcard, level: level
    };
  }

  // 查询码 q 是否落入模式码 p 的范围。两者均为 normalizeIpc 结果。
  // 关键：逐字段相等，绝不做原始字符串前缀（否则 B60L8* 会错配 B60L80）。
  function ipcMatches(q, p) {
    if (!q || !p || !q.valid || !p.valid) return false;
    if (q.section !== p.section) return false;

    function eqClass()    { return q.cls === p.cls; }
    function eqSubclass() { return eqClass() && q.subclass === p.subclass; }
    function eqGroup()    { return eqSubclass() && q.group === p.group; }

    if (p.wildcard) {
      switch (p.level) {
        case 'class':    return eqClass();
        case 'subclass': return eqSubclass();
        case 'group':    return eqGroup();            // 大组相等，子组任意
        case 'subgroup': return eqGroup() &&
                 (q.subgroup === p.subgroup ||
                  (q.subgroup || '').indexOf(p.subgroup) === 0); // 子组分数边界
      }
    } else {
      switch (p.level) {
        case 'class':    return eqClass();
        case 'subclass': return eqSubclass();         // 整个小类
        // 裸大组 B60L8 视同主组 B60L8/00（仅 /00 或无子组）
        case 'group':    return eqGroup() &&
                 (q.subgroup === null || q.subgroup === '00');
        case 'subgroup': return eqGroup() && q.subgroup === p.subgroup; // 精确子组
      }
    }
    return false;
  }

  // 命中任一 patterns 且 不命中任一 exclusions。返回命中的 pattern 字符串或 null。
  function ipcQualify(qNorm, patterns, exclusions) {
    var hit = null, i;
    for (i = 0; i < patterns.length; i++) {
      if (ipcMatches(qNorm, normalizeIpc(patterns[i]))) { hit = patterns[i]; break; }
    }
    if (hit === null) return null;
    for (i = 0; i < (exclusions || []).length; i++) {
      if (ipcMatches(qNorm, normalizeIpc(exclusions[i]))) return null; // 落入排除
    }
    return hit;
  }

  /* --------------------------- 关键词归一化 / 匹配 ----------------------- */

  function normKw(s) {
    s = toHalf(s).toLowerCase();
    s = s.replace(/[\s\-_·．。.]/g, '');     // 去空白、连字符、中点、句点
    s = s.replace(/等$/, '');                // 去开放式「等」
    return s.trim();
  }

  // 泛词表：单独成词时几乎无领域区分度，靠子串命中它们只会制造噪音。
  // 仅当「命中的核心词整串等于」其中之一才降级为弱命中；如「控制系统」整串
  // 不在表内，仍按实词处理。表保持保守，只收纯结构性、无技术指向的词。
  var GENERIC_KW = {
    '系统':1,'装置':1,'设备':1,'方法':1,'制造':1,'材料':1,'技术':1,'服务':1,
    '产品':1,'生产':1,'加工':1,'控制':1,'管理':1,'应用':1,'平台':1,'器件':1,
    '仪器':1,'工艺':1
  };
  var KW_STRONG = 2;  // score ≥ 此值才算「强命中」（足以判 MATCHED）

  // 正向匹配强度：双向子串（中文无词边界），但按命中核心词收紧噪音。
  //   0  不匹配
  //   1  仅泛词命中（弱，不足以 MATCHED）
  //  ≥2  强命中，数值含命中核心词长度（越长越特异，用于组内排序；精确相等再 +1）
  // 核心词 = 被整体包含的较短串：单字（<2）一律判 0，挡掉「光/电/车」泛滥。
  function kwScore(a, b) {
    var x = normKw(a), y = normKw(b);
    if (!x || !y) return 0;
    var core;
    if (x === y) core = x;
    else if (x.indexOf(y) >= 0) core = y;     // x 含 y：核心是 y
    else if (y.indexOf(x) >= 0) core = x;     // y 含 x：核心是 x
    else return 0;
    if (core.length < 2) return 0;            // 单字守卫
    if (GENERIC_KW[core]) return 1;           // 泛词单独命中 → 弱
    return core.length + (x === y ? 1 : 0);   // 强命中；精确相等略加成
  }

  // 对外仍是布尔语义（向后兼容），但收紧为「强命中」。
  function kwMatch(a, b) { return kwScore(a, b) >= KW_STRONG; }

  // 排除匹配：仅当「查询词 包含 排除词」才算命中排除，避免泛词误杀
  // （如排除「燃料汽车」，查询「汽车」不应被排除）。
  function kwExcludeHit(queryKws, excludes) {
    for (var i = 0; i < (excludes || []).length; i++) {
      var ex = normKw(excludes[i]);
      if (ex.length < 2) continue;           // 单字排除词不参与，避免泛词误杀整行
      for (var j = 0; j < queryKws.length; j++) {
        if (normKw(queryKws[j]).indexOf(ex) >= 0) return excludes[i];
      }
    }
    return null;
  }

  function splitKeywords(str) {
    if (!str) return [];
    return toHalf(str).split(/[\s,，、;；]+/).map(function (x) { return x.trim(); })
      .filter(function (x) { return x.length > 0; });
  }

  /* ------------------------------ 单条 rule 评估 ------------------------- */
  // 返回 {status, matchedPattern, matchedQueryKw, matchedEntryKw, score} 或 null。
  // status: MATCHED | IPC_ONLY_WARN | KW_OPEN_ENDED | IPC_KW_MISS
  function evalRule(qNorm, qKws, rule) {
    var matchedPattern = ipcQualify(qNorm, rule.ipc_patterns || [], rule.ipc_exclusions);
    if (matchedPattern === null) return null;            // IPC 不在范围或被 IPC 排除

    // 关键词排除门（即便无正向关键词也生效，如「排除燃料汽车」类条目）
    if (qKws.length && kwExcludeHit(qKws, rule.keyword_exclusions)) return null;

    var kws = rule.keywords || [];
    if (rule.ipc_only || kws.length === 0) {
      return { status: 'IPC_ONLY_WARN', matchedPattern: matchedPattern };
    }

    // 正向关键词匹配：扫全部组合，取强度最高者（弱/泛词命中不足以判 MATCHED）
    var best = 0, bestQ = null, bestK = null;
    for (var i = 0; i < qKws.length; i++) {
      for (var j = 0; j < kws.length; j++) {
        var sc = kwScore(qKws[i], kws[j]);
        if (sc >= KW_STRONG && sc > best) { best = sc; bestQ = qKws[i]; bestK = kws[j]; }
      }
    }
    if (best >= KW_STRONG) {
      return { status: 'MATCHED', matchedPattern: matchedPattern,
               matchedQueryKw: bestQ, matchedEntryKw: bestK, score: best };
    }
    if (rule.open_ended) return { status: 'KW_OPEN_ENDED', matchedPattern: matchedPattern };
    return { status: 'IPC_KW_MISS', matchedPattern: matchedPattern };
  }

  /* ------------------------------ 顶层查询 ------------------------------ */

  var STATUS_ORDER = { MATCHED: 0, IPC_ONLY_WARN: 1, KW_OPEN_ENDED: 2, IPC_KW_MISS: 3 };

  function lookup(ipcStr, kwStr) {
    var qNorm = normalizeIpc(ipcStr);
    var qKws = splitKeywords(kwStr);
    var out = { qNorm: qNorm, qKws: qKws, ipcValid: qNorm.valid, results: [] };
    if (!qNorm.valid) return out;

    var db = global.DB || { entries: [] };
    for (var e = 0; e < db.entries.length; e++) {
      var entry = db.entries[e];
      var rules = entry.rules || [];
      for (var r = 0; r < rules.length; r++) {
        var res = evalRule(qNorm, qKws, rules[r]);
        if (res) {
          out.results.push({
            entry: entry, ruleIndex: r, rule: rules[r],
            status: res.status, matchedPattern: res.matchedPattern,
            matchedQueryKw: res.matchedQueryKw, matchedEntryKw: res.matchedEntryKw,
            score: res.score || 0
          });
        }
      }
    }
    out.results.sort(function (a, b) {
      var s = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      if (s) return s;
      if (a.status === 'MATCHED') {            // 同为命中：强度高者靠前，弱命中沉底
        var sc = (b.score || 0) - (a.score || 0);
        if (sc) return sc;
      }
      var ca = (a.entry.catalog_id || ''), cb = (b.entry.catalog_id || '');
      if (ca !== cb) return ca < cb ? -1 : 1;
      return cmpBranch(a.entry.branch_no, b.entry.branch_no);
    });
    return out;
  }

  // 按分支号自然排序（1.2.10 在 1.2.2 之后）
  function cmpBranch(a, b) {
    var pa = String(a || '').split('.').map(Number), pb = String(b || '').split('.').map(Number);
    for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
      var x = pa[i] || 0, y = pb[i] || 0;
      if (x !== y) return x - y;
    }
    return 0;
  }

  /* ------------------------------ 内置自测 ------------------------------ */
  function selfTest() {
    var cases = [
      // [query, pattern, expected]
      ['B60L8/00',  'B60L8*',     true],
      ['B60L8/16',  'B60L8*',     true],
      ['B60L80/00', 'B60L8*',     false], // 大组 80 ≠ 8，不能前缀误配
      ['B60L50/30', 'B60L8*',     false],
      ['B60L50/30', 'B60L*',      true],  // 小类通配
      ['B60K6/08',  'B60K6*',     true],
      ['B60K6/10',  'B60K6*',     true],
      ['B60K60/00', 'B60K6*',     false],
      ['H01M10/625','H01M10*',    true],
      ['B60L50/302','B60L50/30',  false], // 精确子组不等
      ['B60L50/30', 'B60L50/30',  true],
      ['G06K9/62',  'G06K9*',     true],
      ['G06K90/00', 'G06K9*',     false]
    ];
    var pass = 0, fails = [];
    for (var i = 0; i < cases.length; i++) {
      var got = ipcMatches(normalizeIpc(cases[i][0]), normalizeIpc(cases[i][1]));
      if (got === cases[i][2]) pass++;
      else fails.push(cases[i][0] + ' vs ' + cases[i][1] + ' 期望 ' + cases[i][2] + ' 实得 ' + got);
    }
    // 部级边界：Y 部属 CPC，本工具数据仅 A-H，Y 码应判无效（H 作对照仍有效）
    if (!normalizeIpc('Y02E10/00').valid && normalizeIpc('H01M10/00').valid) pass++;
    else fails.push('部级有效性：Y 应无效且 H 应有效，未达预期');
    var ipcTotal = cases.length + 1;
    if (fails.length) console.error('[match.js] IPC 自测失败:\n' + fails.join('\n'));
    console.log('[match.js] IPC 自测：' + pass + '/' + ipcTotal + ' 通过');

    // 关键词匹配回归：[查询词, 条目词, 期望 kwMatch]
    var kw = [
      ['电池',     '锂离子电池单体、模块及系统', true ],  // 实词子串命中
      ['集成电路', '集成电路制造',               true ],  // 查询⊂条目
      ['量子计算机','量子计算',                   true ],  // 条目⊂查询
      ['集成电路', '集成电路',                     true ],  // 精确相等
      ['系统',     '工业控制计算机及系统制造',     false],  // 仅泛词 → 弱，不算命中
      ['控制',     '运动控制装置',                 false],  // 泛词
      ['光',       '准分子激光退火设备',           false],  // 单字守卫
      ['车',       '新能源汽车整车制造',           false],  // 单字守卫
      ['锂电池',   '镍氢电池',                     false]   // 无公共子串
    ];
    var kwPass = 0;
    for (var k = 0; k < kw.length; k++) {
      var g = kwMatch(kw[k][0], kw[k][1]);
      if (g === kw[k][2]) kwPass++;
      else fails.push('kw「' + kw[k][0] + '」vs「' + kw[k][1] + '」期望 ' + kw[k][2] + ' 实得 ' + g);
    }
    // 排除词单字守卫：不应误杀
    if (kwExcludeHit(['汽车导航'], ['车']) === null) kwPass++;
    else fails.push('kwExcludeHit 单字排除词「车」误杀了「汽车导航」');
    var kwTotal = kw.length + 1;
    if (kwPass !== kwTotal) console.error('[match.js] 关键词自测失败:\n' + fails.join('\n'));
    console.log('[match.js] 关键词自测：' + kwPass + '/' + kwTotal + ' 通过');

    return { pass: pass + kwPass, total: ipcTotal + kwTotal, fails: fails };
  }

  /* ------------------------------- 导出 -------------------------------- */
  global.Match = {
    normalizeIpc: normalizeIpc,
    ipcMatches: ipcMatches,
    normKw: normKw,
    kwMatch: kwMatch,
    kwScore: kwScore,
    splitKeywords: splitKeywords,
    evalRule: evalRule,
    lookup: lookup,
    selfTest: selfTest
  };

})(typeof window !== 'undefined' ? window : this);
