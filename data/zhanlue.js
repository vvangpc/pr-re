/* ============================================================================
 * 战略性新兴产业分类与国际专利分类参照关系表（2021）（试行）  PDF p148–p179
 * 结构：每个产业分支含多个 (IPC块 → 关键词概述) 子行；IPC 大量 (不含…) 排除、* 通配。
 * 关键词概述为长描述短语，整段作为单个关键词存储（双向子串匹配即可命中其中术语）。
 * 各页段数据见 zhanlue_1.js … zhanlue_4.js，经 DB.zhanlueZ 注入。
 *   z(编号,名称,页, [ {p:[IPC*],x:[排除],k:['关键词短语']}, … ])
 * ==========================================================================*/
DB.addCatalog({ id: 'zhanlue', title: '战略性新兴产业分类与国际专利分类参照关系表（2021）', page_start: 146, page_end: 179 });

DB.zhanlueZ = function (no, name, page, subrows) {
  return {
    catalog_id: 'zhanlue', branch_no: no, branch_name: name, source: { page: page },
    rules: (subrows || []).map(function (r) {
      var kw = r.k || [];
      return {
        ipc_patterns: r.p || [], ipc_exclusions: r.x || [],
        keywords: kw, open_ended: true, ipc_only: kw.length === 0
      };
    })
  };
};
