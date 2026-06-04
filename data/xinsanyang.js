/* ============================================================================
 * “新三样”相关技术专利分类体系（2024）  国知办发规字〔2024〕28 号
 * 由大模型依据 PDF p4–p13 表格逐条整理。仅含可匹配的叶分支（含 IPC+关键词的行）；
 * “主要涉及小类/大组有：”范围说明行不作为匹配规则。
 *   * = 该层级及以下全部；（不含X）→ ipc_exclusions；不包括/排除X → keyword_exclusions；
 *   关键词含「等」→ open_ended:true；无关键词列 → ipc_only:true（命中仅提示）。
 * ==========================================================================*/
DB.addCatalog({ id: 'xinsanyang', title: '“新三样”相关技术专利分类体系（2024）', page_start: 1, page_end: 16 });

DB.addEntries([
/* ---------------- 1 电动汽车 ---------------- */
{ catalog_id:'xinsanyang', branch_no:'1.1', branch_name:'电动汽车整车制造', source:{page:5,raw_text:'B60K1*,B60L50/30…B60L8* 机动车，不包括燃料汽车；B60K11*…B60K6*（不含B60K6/08、B60K6/24、B60K6/32）… 电动汽车整车制造，不包括燃料汽车；B62D21*…电动汽车等机动车整车制造，不包括燃料汽车。'}, rules:[
  { ipc_patterns:['B60K1*','B60L50/30','B60L50/40','B60L50/51','B60L50/52','B60L50/53','B60L50/60*','B60L50/90','B60L8*'], keywords:['机动车'], keyword_exclusions:['燃料汽车'] },
  { ipc_patterns:['B60K11*','B60K17*','B60K25*','B60K26*','B60K6*','B60K7*'], ipc_exclusions:['B60K6/08','B60K6/24','B60K6/32'], keywords:['电动汽车整车制造'], keyword_exclusions:['燃料汽车'] },
  { ipc_patterns:['B62D21*','B62D31*','B65G47*','B62D65*'], keywords:['电动汽车','机动车整车制造'], open_ended:true, keyword_exclusions:['燃料汽车'] }
]},
{ catalog_id:'xinsanyang', branch_no:'1.2.1.1', branch_name:'电机、发动机制造', source:{page:6,raw_text:'H02K1*,H02K5*,H02K15* 电动汽车等机动车，不包括燃料汽车；B60L* 电动汽车及汽车电机、汽车马达、汽车电驱动、汽车电池，不包括燃料汽车。'}, rules:[
  { ipc_patterns:['H02K1*','H02K5*','H02K15*'], keywords:['电动汽车','机动车'], open_ended:true, keyword_exclusions:['燃料汽车'] },
  { ipc_patterns:['B60L*'], keywords:['电动汽车','汽车电机','汽车马达','汽车电驱动','汽车电池'], keyword_exclusions:['燃料汽车'] }
]},
{ catalog_id:'xinsanyang', branch_no:'1.2.1.2', branch_name:'电力牵引', source:{page:6,raw_text:'B60L8*,B60L9*,B60L15*,B60L50* 节能、环保、绿色等电力。'}, rules:[
  { ipc_patterns:['B60L8*','B60L9*','B60L15*','B60L50*'], keywords:['节能','环保','绿色','电力'], open_ended:true }
]},
{ catalog_id:'xinsanyang', branch_no:'1.2.1.3', branch_name:'动力或传动装置的安装或布置', source:{page:6,raw_text:'B60K1*（不含B60K1/04），B60K6*（不含B60K6/28，B60K6/30），B60K11*,B60K16*,B60K17* 节能、环保、绿色等动力。'}, rules:[
  { ipc_patterns:['B60K1*','B60K6*','B60K11*','B60K16*','B60K17*'], ipc_exclusions:['B60K1/04','B60K6/28','B60K6/30'], keywords:['节能','环保','绿色','动力'], open_ended:true }
]},
{ catalog_id:'xinsanyang', branch_no:'1.2.1.4', branch_name:'电动汽车控制', source:{page:6,raw_text:'B60W10*…B60W60* 电动汽车；G05D1*,B60L15*,B60G17/0195,G05B19/00 电动汽车，不包括燃料汽车。'}, rules:[
  { ipc_patterns:['B60W10*','B60W20*','B60W30*','B60W40*','B60W50*','B60W60*'], keywords:['电动汽车'] },
  { ipc_patterns:['G05D1*','B60L15*','B60G17/0195','G05B19/00'], keywords:['电动汽车'], keyword_exclusions:['燃料汽车'] }
]},
{ catalog_id:'xinsanyang', branch_no:'1.2.2', branch_name:'电动汽车储能装置制造', source:{page:6,raw_text:'B60L58*,H01M50/249,H01M10/625 排除老年代步、摩托等非机动车和燃料汽车；H01M10*…H01M50* 电动汽车等机动车，不包括燃料汽车。'}, rules:[
  { ipc_patterns:['B60L58*','H01M50/249','H01M10/625'], keywords:[], ipc_only:true, keyword_exclusions:['老年代步','摩托','非机动车','燃料汽车'] },
  { ipc_patterns:['H01M10*','H01M12*','H01M4/04','H01M4/13*','H01M4/14*','H01M4/24*','H01M50*'], keywords:['电动汽车','机动车'], open_ended:true, keyword_exclusions:['燃料汽车'] }
]},
{ catalog_id:'xinsanyang', branch_no:'1.2.3', branch_name:'电动汽车零部件配件制造', source:{page:6,raw_text:'B60L1*…B60W20* 电动汽车等机动车；H02J7* 机动车；B60L50/60* 充电设备；B62D5/04,F16H3*…电动汽车等机动车；B60G*…B60L7* 电动汽车及汽车电机…电池。均不包括燃料汽车。'}, rules:[
  { ipc_patterns:['B60L1*','B60L15*','B60L3*','B60L5*','B60L7*','B60W20*'], keywords:['电动汽车','机动车'], open_ended:true, keyword_exclusions:['燃料汽车'] },
  { ipc_patterns:['H02J7*'], keywords:['机动车'], keyword_exclusions:['燃料汽车'] },
  { ipc_patterns:['B60L50/60*'], keywords:['充电设备'] },
  { ipc_patterns:['B62D5/04','F16H3*','F16H59*','F16H61*','F16H63*'], keywords:['电动汽车','机动车'], open_ended:true, keyword_exclusions:['燃料汽车'] },
  { ipc_patterns:['B60G*','B60K20*','B60Q5*','B60R16*','B60T13*','B60T17*','B60T7*','B60T8*','B60W10*','B60W30*','B60W40*','B60W50*','B60W60*','B60L7*'], keywords:['电动汽车','汽车电机','汽车马达','汽车电驱动','汽车电池'], keyword_exclusions:['燃料汽车'] }
]},
{ catalog_id:'xinsanyang', branch_no:'1.3.1', branch_name:'供能装置制造', source:{page:7,raw_text:'B60L53*,B60L55*；H02J7* 充电设备。'}, rules:[
  { ipc_patterns:['B60L53*','B60L55*','H02J7*'], keywords:['充电设备'] }
]},
{ catalog_id:'xinsanyang', branch_no:'1.3.2', branch_name:'试验装置制造', source:{page:7,raw_text:'G01R31/34,G01R27* / G01L3*,G01M13*,G01M15* 电动汽车等机动车；G01M17* 电动汽车及汽车电机…电池。不包括燃料汽车。'}, rules:[
  { ipc_patterns:['G01R31/34','G01R27*'], keywords:['电动汽车','机动车'], open_ended:true, keyword_exclusions:['燃料汽车'] },
  { ipc_patterns:['G01L3*','G01M13*','G01M15*'], keywords:['电动汽车','机动车'], open_ended:true, keyword_exclusions:['燃料汽车'] },
  { ipc_patterns:['G01M17*'], keywords:['电动汽车','汽车电机','汽车马达','汽车电驱动','汽车电池'], keyword_exclusions:['燃料汽车'] }
]},
{ catalog_id:'xinsanyang', branch_no:'1.3.3', branch_name:'其他相关设施制造', source:{page:7,raw_text:'C08K3/04,F04C18/02,F04C18/356 电动汽车等机动车，不包括燃料汽车。'}, rules:[
  { ipc_patterns:['C08K3/04','F04C18/02','F04C18/356'], keywords:['电动汽车','机动车'], open_ended:true, keyword_exclusions:['燃料汽车'] }
]},
{ catalog_id:'xinsanyang', branch_no:'1.4.1', branch_name:'电动汽车维修服务', source:{page:7,raw_text:'B23K37* 电动汽车等机动车；B60S5* 电动汽车及汽车电机…电池。不包括燃料汽车。'}, rules:[
  { ipc_patterns:['B23K37*'], keywords:['电动汽车','机动车'], open_ended:true, keyword_exclusions:['燃料汽车'] },
  { ipc_patterns:['B60S5*'], keywords:['电动汽车','汽车电机','汽车马达','汽车电驱动','汽车电池'], keyword_exclusions:['燃料汽车'] }
]},
{ catalog_id:'xinsanyang', branch_no:'1.4.2', branch_name:'电动汽车充换电服务', source:{page:8,raw_text:'B60L53/80,B60S5/06,B60L53/10…B60L53/67 电动汽车等机动车，不包括燃料汽车。'}, rules:[
  { ipc_patterns:['B60L53/80','B60S5/06','B60L53/10','B60L53/126','B60L53/16','B60L53/18','B60L53/22','B60L53/24','B60L53/30','B60L53/302','B60L53/31','B60L53/34','B60L53/35','B60L53/38','B60L53/50','B60L53/57','B60L53/60','B60L53/66','B60L53/67'], keywords:['电动汽车','机动车'], open_ended:true, keyword_exclusions:['燃料汽车'] }
]},

/* ---------------- 2 锂电池 ---------------- */
{ catalog_id:'xinsanyang', branch_no:'2.1.1', branch_name:'磷酸铁锂', source:{page:8,raw_text:'H01M4/58,H01M4/136,H01M4/1397,H01M4/13,H01M4/36,H01M4/139,C01B25/45 锂离子、正极、磷酸铁锂、磷酸亚铁锂、锂铁磷。'}, rules:[
  { ipc_patterns:['H01M4/58','H01M4/136','H01M4/1397','H01M4/13','H01M4/36','H01M4/139','C01B25/45'], keywords:['锂离子','正极','磷酸铁锂','磷酸亚铁锂','锂铁磷'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.1.2', branch_name:'三元材料（镍钴锰酸锂）', source:{page:8,raw_text:'H01M4/505,H01M4/525,H01M4/13,H01M4/139,H01M4/36,H01M4/1391,H01M4/131,C30B29/22,H01M4/485,C01G53/00,C01D15* 锂离子、正极、镍钴锰酸锂、三元材料、锂镍钴锰氧化物。'}, rules:[
  { ipc_patterns:['H01M4/505','H01M4/525','H01M4/13','H01M4/139','H01M4/36','H01M4/1391','H01M4/131','C30B29/22','H01M4/485','C01G53/00','C01D15*'], keywords:['锂离子','正极','镍钴锰酸锂','三元材料','锂镍钴锰氧化物'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.1.3', branch_name:'钴酸锂', source:{page:8,raw_text:'H01M4/525,H01M4/1391,H01M4/131,H01M4/139,H01M4/13,H01M4/36,C01G51/00 锂离子、正极、钴酸锂、锂钴氧化物。'}, rules:[
  { ipc_patterns:['H01M4/525','H01M4/1391','H01M4/131','H01M4/139','H01M4/13','H01M4/36','C01G51/00'], keywords:['锂离子','正极','钴酸锂','锂钴氧化物'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.1.4', branch_name:'锰酸锂', source:{page:8,raw_text:'H01M4/505,H01M4/1391,H01M4/131,H01M4/139,H01M4/13,H01M4/36,C01G45/12 锂离子、正极、锰酸锂、尖晶石型锰酸锂、氧化锰钴。'}, rules:[
  { ipc_patterns:['H01M4/505','H01M4/1391','H01M4/131','H01M4/139','H01M4/13','H01M4/36','C01G45/12'], keywords:['锂离子','正极','锰酸锂','尖晶石型锰酸锂','氧化锰钴'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.2.1', branch_name:'碳基负极', source:{page:9,raw_text:'H01M4* 锂离子、负极、石墨、石墨烯、碳素、碳质；C01B32* 锂离子、负极；H01M4/133…H01M4/587 锂离子、负极。'}, rules:[
  { ipc_patterns:['H01M4*'], keywords:['锂离子','负极','石墨','石墨烯','碳素','碳质'] },
  { ipc_patterns:['C01B32*'], keywords:['锂离子','负极'] },
  { ipc_patterns:['H01M4/133','H01M4/1393','H01M4/583','H01M4/36','H01M4/139','H01M4/13','H01M4/587'], keywords:['锂离子','负极'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.2.2', branch_name:'硅基负极', source:{page:9,raw_text:'H01M4* 锂离子、负极、硅基、氧化硅掺杂、预锂化；C01B33* 锂离子、负极；H01M4/134…H01M4/36 锂离子、负极。'}, rules:[
  { ipc_patterns:['H01M4*'], keywords:['锂离子','负极','硅基','氧化硅掺杂','预锂化'] },
  { ipc_patterns:['C01B33*'], keywords:['锂离子','负极'] },
  { ipc_patterns:['H01M4/134','H01M4/13','H01M4/1395','H01M4/139','H01M4/587','H01M4/38','H01M4/48','H01M4/36'], keywords:['锂离子','负极'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.2.3', branch_name:'碳硅负极', source:{page:9,raw_text:'H01M4* 锂离子、负极、碳硅、硅碳；C01B32*,C01B33* 锂离子、负极；H01M4/133…H01M4/48 锂离子、负极。'}, rules:[
  { ipc_patterns:['H01M4*'], keywords:['锂离子','负极','碳硅','硅碳'] },
  { ipc_patterns:['C01B32*','C01B33*'], keywords:['锂离子','负极'] },
  { ipc_patterns:['H01M4/133','H01M4/1393','H01M4/583','H01M4/587','H01M4/36','H01M4/139','H01M4/13','H01M4/134','H01M4/1395','H01M4/38','H01M4/48'], keywords:['锂离子','负极'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.2.4', branch_name:'金属锂负极', source:{page:9,raw_text:'H01M4/134,H01M4/38,H01M4/1395,H01M4/139,H01M4/13,H01M4/36 锂离子、负极、金属锂、锂化合物；C01D15*,C22C24/00 锂离子、负极。'}, rules:[
  { ipc_patterns:['H01M4/134','H01M4/38','H01M4/1395','H01M4/139','H01M4/13','H01M4/36'], keywords:['锂离子','负极','金属锂','锂化合物'] },
  { ipc_patterns:['C01D15*','C22C24/00'], keywords:['锂离子','负极'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.3.1.1', branch_name:'六氟磷酸锂（LiPF6）', source:{page:9,raw_text:'H01M10/056,H01M10/0563 六氟磷酸锂、LiPF6、六氟磷化锂；C01B25/455,C01D15/00 电池、六氟磷酸锂、LiPF6、六氟磷化锂。'}, rules:[
  { ipc_patterns:['H01M10/056','H01M10/0563'], keywords:['六氟磷酸锂','LiPF6','六氟磷化锂'] },
  { ipc_patterns:['C01B25/455','C01D15/00'], keywords:['电池','六氟磷酸锂','LiPF6','六氟磷化锂'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.3.1.2', branch_name:'双氟磺酰亚胺锂（LiFSI）', source:{page:10,raw_text:'C01D15*,C01B21/086,C01B21/093 电池、双氟磺酰亚胺锂、LiFSI、双氟代磺酰亚胺锂；H01M10/056,H01M10/0563 双氟磺酰亚胺锂、LiFSI、双氟代磺酰亚胺锂。'}, rules:[
  { ipc_patterns:['C01D15*','C01B21/086','C01B21/093'], keywords:['电池','双氟磺酰亚胺锂','LiFSI','双氟代磺酰亚胺锂'] },
  { ipc_patterns:['H01M10/056','H01M10/0563'], keywords:['双氟磺酰亚胺锂','LiFSI','双氟代磺酰亚胺锂'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.3.2.1', branch_name:'硫化物固态电解质', source:{page:10,raw_text:'H01M10/056,H01M10/0561,H01M10/0562 锂离子、硫化物。'}, rules:[
  { ipc_patterns:['H01M10/056','H01M10/0561','H01M10/0562'], keywords:['锂离子','硫化物'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.3.2.2', branch_name:'氧化物固态电解质', source:{page:10,raw_text:'H01M10/056,H01M10/0561,H01M10/0562 锂离子、氧化物。'}, rules:[
  { ipc_patterns:['H01M10/056','H01M10/0561','H01M10/0562'], keywords:['锂离子','氧化物'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.3.2.3', branch_name:'聚合物固态电解质', source:{page:10,raw_text:'H01M10/056,H01M10/0564,H01M10/0565 锂离子、聚化物(聚合物)。'}, rules:[
  { ipc_patterns:['H01M10/056','H01M10/0564','H01M10/0565'], keywords:['锂离子','聚合物','聚化物'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.3.2.4', branch_name:'复合固态电解质', source:{page:10,raw_text:'H01M10/056,H01M10/0561,H01M10/0562,H01M10/0564,H01M10/0565 锂离子、复合电解质。'}, rules:[
  { ipc_patterns:['H01M10/056','H01M10/0561','H01M10/0562','H01M10/0564','H01M10/0565'], keywords:['锂离子','复合电解质'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.4.1', branch_name:'聚丙烯隔膜', source:{page:10,raw_text:'H01M50/40,H01M50/403*…H01M50/489* 锂离子、隔膜、聚烯烃、干法、晶片分离、晶型转换、PP、聚丙烯。'}, rules:[
  { ipc_patterns:['H01M50/40','H01M50/403*','H01M50/409','H01M50/411','H01M50/414','H01M50/417','H01M50/44','H01M50/446','H01M50/449*','H01M50/46','H01M50/463*','H01M50/489*'], keywords:['锂离子','隔膜','聚烯烃','干法','晶片分离','晶型转换','PP','聚丙烯'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.4.2', branch_name:'聚乙烯隔膜', source:{page:10,raw_text:'H01M50/40,H01M50/403*…H01M50/489* 锂离子、薄膜、聚烯烃、湿法、热致相分离、PE、聚乙烯。'}, rules:[
  { ipc_patterns:['H01M50/40','H01M50/403*','H01M50/409','H01M50/411','H01M50/414','H01M50/417','H01M50/44','H01M50/446','H01M50/449*','H01M50/46','H01M50/463*','H01M50/489*'], keywords:['锂离子','薄膜','聚烯烃','湿法','热致相分离','PE','聚乙烯'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.5.1', branch_name:'热管理系统', source:{page:11,raw_text:'H01M10/60* 锂离子、锂合金。'}, rules:[
  { ipc_patterns:['H01M10/60*'], keywords:['锂离子','锂合金'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.5.2', branch_name:'电池管理系统（BMS）', source:{page:11,raw_text:'H01M10/42*,H02J7*,G01R31/36* 锂离子、锂合金。'}, rules:[
  { ipc_patterns:['H01M10/42*','H02J7*','G01R31/36*'], keywords:['锂离子','锂合金'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.5.3', branch_name:'连接件', source:{page:11,raw_text:'H01M50/50*（不含H01M50/572），H01M50/584,H01M50/586,H01M50/588,G01R31/36,G01R31/364,G01R31/367 锂离子、锂合金。'}, rules:[
  { ipc_patterns:['H01M50/50*','H01M50/584','H01M50/586','H01M50/588','G01R31/36','G01R31/364','G01R31/367'], ipc_exclusions:['H01M50/572'], keywords:['锂离子','锂合金'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.5.4', branch_name:'结构件', source:{page:11,raw_text:'H01M50/10*,H01M50/20*,H01M50/30* 锂离子、锂合金。'}, rules:[
  { ipc_patterns:['H01M50/10*','H01M50/20*','H01M50/30*'], keywords:['锂离子','锂合金'] }
]},
{ catalog_id:'xinsanyang', branch_no:'2.5.5', branch_name:'熔断器', source:{page:11,raw_text:'H01M50/574* 锂离子、锂合金。'}, rules:[
  { ipc_patterns:['H01M50/574*'], keywords:['锂离子','锂合金'] }
]},

/* ---------------- 3 光伏 ---------------- */
{ catalog_id:'xinsanyang', branch_no:'3.1.1', branch_name:'改良西门子法', source:{page:11,raw_text:'C01B33/107 多晶硅、制备、精馏、吸附、生产、提纯、转化；C01B33/035 多晶硅、制备、沉积、还原；C01B33/027,C01B33/03 …三氯氢硅、氯硅烷；C30B29/06,C30B28/14 多晶硅、制备、西门子法。'}, rules:[
  { ipc_patterns:['C01B33/107'], keywords:['多晶硅','制备','精馏','吸附','生产','提纯','转化'] },
  { ipc_patterns:['C01B33/035'], keywords:['多晶硅','制备','沉积','还原'] },
  { ipc_patterns:['C01B33/027','C01B33/03'], keywords:['多晶硅','制备','沉积','还原','三氯氢硅','氯硅烷'] },
  { ipc_patterns:['C30B29/06','C30B28/14'], keywords:['多晶硅','制备','西门子法'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.1.2', branch_name:'硅烷流化床法', source:{page:11,raw_text:'C01B33/021 …三氯氢硅、三氯硅烷、流化床、FBR；C01B33/04 甲硅烷…DCS；C01B33/027,C01B33/029,C30B29/06,C30B28/14 多晶硅、流化床、FBR；B01J8/18,B01J8/24* 多晶硅、制备、分解、还原。'}, rules:[
  { ipc_patterns:['C01B33/021'], keywords:['多晶硅','颗粒','制备','三氯氢硅','三氯硅烷','流化床','FBR'] },
  { ipc_patterns:['C01B33/04'], keywords:['甲硅烷','制备','歧化','三氯氢硅','三氯硅烷','DCS'] },
  { ipc_patterns:['C01B33/027','C01B33/029','C30B29/06','C30B28/14'], keywords:['多晶硅','流化床','FBR'] },
  { ipc_patterns:['B01J8/18','B01J8/24*'], keywords:['多晶硅','制备','分解','还原'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.2.1', branch_name:'拉晶', source:{page:12,raw_text:'C30B29/06 单晶、制备、生长、拉晶；C30B15*,C30B27* 硅、制备、生长、拉晶。'}, rules:[
  { ipc_patterns:['C30B29/06'], keywords:['单晶','制备','生长','拉晶'] },
  { ipc_patterns:['C30B15*','C30B27*'], keywords:['硅','制备','生长','拉晶'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.2.2', branch_name:'切片', source:{page:12,raw_text:'B28D5* B28D7* 硅片、切割。'}, rules:[
  { ipc_patterns:['B28D5*','B28D7*'], keywords:['硅片','切割'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.2.3', branch_name:'清洗', source:{page:12,raw_text:'B08B3*,H01L21/02,B08B5* 硅片、清洗。'}, rules:[
  { ipc_patterns:['B08B3*','H01L21/02','B08B5*'], keywords:['硅片','清洗'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.3.1', branch_name:'PERC电池', source:{page:12,raw_text:'H01L31*（不含H01L31/08*,H01L31/12*）PERC、光伏电池、光电转换、氧化铝。'}, rules:[
  { ipc_patterns:['H01L31*'], ipc_exclusions:['H01L31/08*','H01L31/12*'], keywords:['PERC','光伏电池','光电转换','氧化铝'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.3.2', branch_name:'TOPCon电池', source:{page:12,raw_text:'H01L31*（不含H01L31/08*,H01L31/12*）光伏电池、光电转化、隧穿、多晶硅掺杂、钝化。'}, rules:[
  { ipc_patterns:['H01L31*'], ipc_exclusions:['H01L31/08*','H01L31/12*'], keywords:['光伏电池','光电转化','隧穿','多晶硅掺杂','钝化'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.3.3', branch_name:'HIT电池', source:{page:13,raw_text:'H01L31*（不含H01L31/08*,H01L31/12*,H01L31/0747）HIT、本征薄层、非晶/晶体硅、光伏电池、光电转换、异质结电池；H01L31/0747（无关键词）。'}, rules:[
  { ipc_patterns:['H01L31*'], ipc_exclusions:['H01L31/08*','H01L31/12*','H01L31/0747'], keywords:['HIT','本征薄层','非晶/晶体硅','非晶硅/晶体硅','光伏电池','光电转换','异质结电池'] },
  { ipc_patterns:['H01L31/0747'], keywords:[], ipc_only:true }
]},
{ catalog_id:'xinsanyang', branch_no:'3.3.4', branch_name:'IBC电池', source:{page:13,raw_text:'H01L31*（不含H01L31/08*,H01L31/12*）IBC、背接触、光伏电池、光电转换。'}, rules:[
  { ipc_patterns:['H01L31*'], ipc_exclusions:['H01L31/08*','H01L31/12*'], keywords:['IBC','背接触','光伏电池','光电转换'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.3.5', branch_name:'通用晶硅电池', source:{page:13,raw_text:'H01L31/0248*,H01L31/068,H01L31/0687,H01L31/07,H01L31/072,H01L31/076,H01L31/077,H01L31/18 光伏电池、光电转换。'}, rules:[
  { ipc_patterns:['H01L31/0248*','H01L31/068','H01L31/0687','H01L31/07','H01L31/072','H01L31/076','H01L31/077','H01L31/18'], keywords:['光伏电池','光电转换'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.4.1', branch_name:'常规组件', source:{page:13,raw_text:'H01L31/04*（不含H01L31/06*），H02S* 光伏组件、胶膜、玻璃、背板、焊带、汇流带、接线盒、连接盒、边框、边界框等。'}, rules:[
  { ipc_patterns:['H01L31/04*','H02S*'], ipc_exclusions:['H01L31/06*'], keywords:['光伏组件','胶膜','玻璃','背板','焊带','汇流带','接线盒','连接盒','边框','边界框'], open_ended:true }
]},
{ catalog_id:'xinsanyang', branch_no:'3.4.2', branch_name:'多主栅组件', source:{page:13,raw_text:'H01L31/04*（不含H01L31/06*），H02S* 光伏组件、多主栅、MBB、SMBB、栅线密化。'}, rules:[
  { ipc_patterns:['H01L31/04*','H02S*'], ipc_exclusions:['H01L31/06*'], keywords:['光伏组件','多主栅','MBB','SMBB','栅线密化'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.4.3', branch_name:'无主栅组件', source:{page:13,raw_text:'H01L31/04*（不含H01L31/06*），H02S* 无主栅、0BB、电池片、光伏组件、胶膜、焊带、导电条、点胶、粘接、焊接。'}, rules:[
  { ipc_patterns:['H01L31/04*','H02S*'], ipc_exclusions:['H01L31/06*'], keywords:['无主栅','0BB','电池片','光伏组件','胶膜','焊带','导电条','点胶','粘接','焊接'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.4.4', branch_name:'切片组件', source:{page:13,raw_text:'H01L31/04*（不含H01L31/06*），H02S*，H01L21/78 光伏组件、电池片、硅片。'}, rules:[
  { ipc_patterns:['H01L31/04*','H02S*','H01L21/78'], ipc_exclusions:['H01L31/06*'], keywords:['光伏组件','电池片','硅片'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.4.5', branch_name:'叠片组件', source:{page:13,raw_text:'H01L31/04*（不含H01L31/06*），H02S* 光伏组件、叠片、电池片、零间距。'}, rules:[
  { ipc_patterns:['H01L31/04*','H02S*'], ipc_exclusions:['H01L31/06*'], keywords:['光伏组件','叠片','电池片','零间距'] }
]},
{ catalog_id:'xinsanyang', branch_no:'3.4.6', branch_name:'背接触组件', source:{page:13,raw_text:'H01L31/04*（不含H01L31/06*），H02S* 光伏组件、背接触、晶硅电池、IBC。'}, rules:[
  { ipc_patterns:['H01L31/04*','H02S*'], ipc_exclusions:['H01L31/06*'], keywords:['光伏组件','背接触','晶硅电池','IBC'] }
]}
]);
