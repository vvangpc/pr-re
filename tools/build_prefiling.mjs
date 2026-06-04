/* tools/build_prefiling.mjs —— 由 data/prefiling_src/ 生成 data/prefiling.js
 *
 * 数据来源（均为官方预审分类号表）：
 *   成都 / 四川：data/prefiling_src/{chengdu,sichuan}.md（清洗自官方 PDF，已与 PDF 逐码交叉校验）
 *   重庆        ：data/prefiling_src/chongqing_pdf_extract.txt 的人工核定结果（见下方 CQ_* 常量）
 * 运行： node tools/build_prefiling.mjs
 * 校验：成都 55 / 四川 163 / 重庆 111 个 IPC 小类；洛迦诺 15 / 53 / 23。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'data', 'prefiling_src');
const OUT = join(ROOT, 'data', 'prefiling.js');

const SUB = /^[A-HY]\d{2}[A-Z]$/;     // IPC 小类
const LOC = /^\d{2}-\d{2}$/;          // 洛迦诺小类

const cleanField = (h) => h.replace(/IPC.*$/, '').replace(/[（(].*$/, '')
  .replace(/领域\s*$/, '').replace(/\s+/g, '').trim();

// 解析技能参考 md（成都 / 四川）：返回 {ipc:[{sub,name,field}], loc:[{code,name,field}]}
function parseMd(file) {
  const lines = readFileSync(join(SRC, file), 'utf8').split(/\r?\n/);
  const ipc = [], loc = [];
  let mode = 'ipc', field = null;
  for (const raw of lines) {
    const line = raw.trim();
    let m;
    if ((m = line.match(/^##\s+[一二三四五六七八九十]+、\s*(.+)$/))) {
      if (/洛迦诺/.test(m[1])) { mode = 'loc'; field = null; }
      else { mode = 'ipc'; field = cleanField(m[1]); }
      continue;
    }
    if ((m = line.match(/^###\s+(.+)$/))) { if (mode === 'loc') field = cleanField(m[1]); continue; }
    if (line.indexOf('|') < 0) continue;
    const cells = line.split('|').map(s => s.trim()).filter(s => s.length);
    if (!cells.length || cells.every(c => /^:?-{2,}:?$/.test(c))) continue;
    if (mode === 'ipc') {
      const i = cells.findIndex(c => SUB.test(c));
      if (i >= 0) ipc.push({ sub: cells[i], name: cells[i + 1] || '', field });
    } else {
      const i = cells.findIndex(c => LOC.test(c));
      if (i >= 0) loc.push({ code: cells[i], name: cells[i + 1] || '', field });
    }
  }
  return { ipc, loc };
}

const chengdu = parseMd('chengdu.md');
const sichuan = parseMd('sichuan.md');

/* ---- 重庆：人工核定自官方 PDF（chongqing_pdf_extract.txt），按段落计数校验 ---- */
const CQ_INFO = ['B60W','C09K','F21K','F21S','G01B','G01C','G01D','G01H','G01J','G01L','G01M','G01R','G01S','G02B','G02F','G03F','G05B','G05D','G05F','G06F','G06K','G06N','G06Q','G06T','G06V','G07C','G07F','G08B','G08C','G08G','G09B','G09F','G09G','G10L','G11B','G11C','G16C','G16H','G16Y','H01B','H01F','H01G','H01H','H01J','H01L','H01M','H01P','H01Q','H01R','H01S','H02H','H02J','H02M','H02S','H03F','H03H','H03K','H03L','H03M','H04B','H04J','H04L','H04M','H04N','H04Q','H04R','H04W','H05B','H05K'];
const CQ_BIO = ['A01B','A01C','A01D','A01G','A01H','A01K','A01M','A01N','A23F','A23K','A23L','A23N','A61B','A61C','A61D','A61F','A61G','A61H','A61J','A61K','A61L','A61M','A61N','A61P','B01D','B01F','B01J','B02C','B07B','B08B','C01B','C02F','C07C','C07D','C07K','C08F','C08K','C12M','C12N','C12P','C12Q','G01N'];
const CQ_LOC_INFO = ['13-01','14-01','15-01','13-02','14-02','25-02','13-03','14-03','14-04','14-05','26-05','10-04','10-05','10-06','10-07','14-99'];
const CQ_LOC_BIO = ['24-01','24-02','15-03','28-03','24-04','28-05','09-01'];

// 重庆专有小类（成都/四川未覆盖）的类名（取自官方 PDF，清洗交叉引用）
const CQ_DESC = {
  'F21K': '应用荧光、场致化学发光或可燃材料的非电光源；采用半导体器件作为发光元件的光源',
  'F21S': '非便携式照明装置或其系统；专门适用于车辆外部的车辆照明设备',
  'G16C': '计算化学；化学信息学；计算材料科学',
  'G16Y': '专门用于物联网的信息和通信技术',
  'A01B': '农业或林业的整地；一般农业机械或农具的部件、零件或附件',
  'A01C': '种植；播种；施肥',
  'A01D': '收获；割草',
  'A01M': '捕捉、消灭或驱赶动物的装置；杀生剂、害虫驱避剂或引诱剂、植物生长调节剂的应用',
  'A23F': '咖啡；茶；其代用品；它们的制造、配制或泡制',
  'A23N': '处理大量收获的水果、蔬菜或花球茎的机械或装置；制备牲畜饲料的装置',
  'A61G': '专门适用于病人或残疾人的运输工具或起居设施；手术台、手术椅、牙科椅；丧葬用具',
  'A61J': '专用于医学或医药目的的容器；制备药品特殊物理或服用形式的装置；喂药或喂食器具',
  'A61P': '化合物或药物制剂的特定治疗活性',
  'B08B': '一般清洁；一般污垢的防除',
  'B02C': '一般破碎、研磨或粉碎；碾磨谷物',
  'G01H': '机械振动或超声波、声波或次声波的测量',
  'G06V': '图像或视频识别或理解',
  'H02S': '由红外线辐射、可见光或紫外光转换产生电能，例如使用光伏(PV)模块'
};
const CQ_LOC_DESC = {
  '13-01': '发电机和电动机', '14-01': '声音或图像的记录或再现设备', '15-01': '发动机',
  '13-02': '电力变压器、整流器、电池和蓄电池', '14-02': '数据处理设备及其外围设备和装置',
  '25-02': '预制或预装建筑构件', '13-03': '配电和电力控制设备',
  '14-03': '电信设备、无线遥控设备和无线电放大器', '14-04': '显示界面和图标',
  '14-05': '记录数据和存储数据的介质',
  '26-05': '灯、落地灯、枝形吊灯、墙壁和天花板装置、灯罩、反光罩、摄影和电影投光灯',
  '10-04': '其他测量仪器、设备和装置', '10-05': '检测、安全和测试用仪器、设备和装置',
  '10-06': '信号设备和装置', '10-07': '测量仪器、检测仪器和信号仪器的外壳、盘面、指针及其他零部件和附件',
  '14-99': '其他杂项', '24-01': '医生、医院和实验室用的仪器和设备',
  '24-02': '医疗器械、实验室用器械和实验室用工具', '15-03': '农业和林业机械',
  '28-03': '梳妆用品和美容院设备', '24-04': '用于包扎伤口、护理和医疗处理的用品',
  '28-05': '空气清新剂', '09-01': '瓶、长颈瓶、鼓形瓶、盛装腐蚀性液体的大玻璃瓶、细颈瓶和压力容器'
};

/* ----------------------------- 汇总 ----------------------------- */
const keepLongest = (m, k, v) => { if (v && (m[k] === undefined || v.length > m[k].length)) m[k] = v; };

const desc = {}, locDesc = {};
for (const r of [...chengdu.ipc, ...sichuan.ipc]) keepLongest(desc, r.sub, r.name);
for (const r of [...chengdu.loc, ...sichuan.loc]) keepLongest(locDesc, r.code, r.name);
for (const k in CQ_DESC) keepLongest(desc, k, CQ_DESC[k]);
for (const k in CQ_LOC_DESC) keepLongest(locDesc, k, CQ_LOC_DESC[k]);

const scope = { chengdu: {}, sichuan: {}, chongqing: {} };
for (const r of chengdu.ipc) scope.chengdu[r.sub] = r.field;
for (const r of sichuan.ipc) scope.sichuan[r.sub] = r.field;
for (const s of CQ_INFO) scope.chongqing[s] = '新一代信息技术';
for (const s of CQ_BIO) scope.chongqing[s] = '生物';

const locarno = { chengdu: {}, sichuan: {}, chongqing: {} };
for (const r of chengdu.loc) locarno.chengdu[r.code] = r.field;
for (const r of sichuan.loc) locarno.sichuan[r.code] = r.field;
for (const c of CQ_LOC_INFO) locarno.chongqing[c] = '新一代信息技术';
for (const c of CQ_LOC_BIO) locarno.chongqing[c] = '生物';

/* ----------------------------- 校验 ----------------------------- */
const want = { chengdu: 55, sichuan: 163, chongqing: 111 };
// 洛迦诺官方按「行」计（同一码可在两个领域各出现一次），故校验源行数而非去重后的键数
const wantLocRows = { chengdu: 15, sichuan: 53, chongqing: 23 };
const locRows = {
  chengdu: chengdu.loc.length, sichuan: sichuan.loc.length,
  chongqing: CQ_LOC_INFO.length + CQ_LOC_BIO.length
};
let ok = true;
for (const id of ['chengdu', 'sichuan', 'chongqing']) {
  const n = Object.keys(scope[id]).length;
  const tag = (n === want[id] && locRows[id] === wantLocRows[id]) ? 'OK' : 'WARN';
  if (tag === 'WARN') ok = false;
  console.log(`[${tag}] ${id}: IPC ${n}/${want[id]} · 洛迦诺行 ${locRows[id]}/${wantLocRows[id]}（去重 ${Object.keys(locarno[id]).length}）`);
}
const missDesc = [], missLoc = [];
for (const id of ['chengdu', 'sichuan', 'chongqing']) {
  for (const s in scope[id]) if (!desc[s]) missDesc.push(s);
  for (const c in locarno[id]) if (!locDesc[c]) missLoc.push(c);
}
if (missDesc.length) { ok = false; console.warn('缺类名 desc:', [...new Set(missDesc)].sort().join(' ')); }
if (missLoc.length) { ok = false; console.warn('缺洛迦诺类名 locDesc:', [...new Set(missLoc)].sort().join(' ')); }

/* ----------------------------- 序列化 ----------------------------- */
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const sortedObj = (o) => Object.keys(o).sort().map(k => `    ${q(k)}: ${q(o[k])}`).join(',\n');
const centers = [
  { id: 'chengdu', 简称: '成都', 全称: '成都知识产权保护中心', fields: ['生物', '新材料'] },
  { id: 'sichuan', 简称: '四川', 全称: '中国(四川)知识产权保护中心', fields: ['新一代信息技术', '装备制造'] },
  { id: 'chongqing', 简称: '重庆', 全称: '重庆市知识产权保护中心', fields: ['新一代信息技术', '生物'] }
];
const scopeBlock = (id) => `  ${id}: {\n${sortedObj(scope[id])}\n  }`;
const locBlock = (id) => `  ${id}: {\n${sortedObj(locarno[id])}\n  }`;

const out = `/* data/prefiling.js —— 知识产权保护中心「快速预审」受理范围（IPC 小类 → 中心 / 产业领域）
 * 由 tools/build_prefiling.mjs 依官方预审分类号表生成，请勿手改。
 * 成都 55 · 四川 163 · 重庆 111 个 IPC 小类；仅判定是否在预审受理范围，不判定可专利性。
 * <script> 注入，file:// 兼容。 */
(function (global) {
  'use strict';
  var P = {
    centers: [
${centers.map(c => `      { id: ${q(c.id)}, 简称: ${q(c.简称)}, 全称: ${q(c.全称)}, fields: [${c.fields.map(q).join(', ')}] }`).join(',\n')}
    ],
    desc: {
${sortedObj(desc)}
    },
    scope: {
${['chengdu', 'sichuan', 'chongqing'].map(scopeBlock).join(',\n')}
    },
    locarno: {
${['chengdu', 'sichuan', 'chongqing'].map(locBlock).join(',\n')}
    },
    locDesc: {
${sortedObj(locDesc)}
    }
  };
  global.PREFILING = P;
})(typeof window !== 'undefined' ? window : this);
`;

writeFileSync(OUT, out, 'utf8');
console.log(`\n写出 ${OUT}`);
console.log(`distinct IPC 小类: ${Object.keys(desc).length} · 洛迦诺: ${Object.keys(locDesc).length}`);
console.log(ok ? '✅ 全部校验通过' : '❌ 存在 WARN，请核对');
