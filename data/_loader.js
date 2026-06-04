/* ============================================================================
 * data/_loader.js —— 数据库容器（必须最先加载）
 *
 * 各目录数据文件（xinsanyang.js / shuzi.js / lvse.js / zhanlue.js）通过
 *   DB.addCatalog({...});  DB.addEntries([...]);
 * 向这里注入。用 <script> 标签引入而非 fetch，以便 file:// 双击直接打开。
 * ==========================================================================*/
(function (global) {
  'use strict';
  var DB = global.DB || { catalogs: [], entries: [] };

  DB.addCatalog = function (c) {
    this.catalogs.push(c);
    return this;
  };

  // 注入一批 entry。自动补全 catalog_title（依据已登记的 catalog）与稳定 id。
  DB.addEntries = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      var e = arr[i];
      if (!e.catalog_title && e.catalog_id) {
        for (var c = 0; c < this.catalogs.length; c++) {
          if (this.catalogs[c].id === e.catalog_id) { e.catalog_title = this.catalogs[c].title; break; }
        }
      }
      if (!e.id) e.id = (e.catalog_id || '?') + '/' + (e.branch_no || '') + '/' + i;
      if (!e.rules) e.rules = [];
      this.entries.push(e);
    }
    return this;
  };

  // 统计：各目录 entry 数与 rule 数（供 QA / UI 展示）
  DB.stats = function () {
    var byCat = {}, totalRules = 0;
    for (var i = 0; i < this.entries.length; i++) {
      var e = this.entries[i], k = e.catalog_id || '?';
      byCat[k] = byCat[k] || { entries: 0, rules: 0 };
      byCat[k].entries++;
      byCat[k].rules += (e.rules ? e.rules.length : 0);
      totalRules += (e.rules ? e.rules.length : 0);
    }
    return { catalogs: this.catalogs.length, entries: this.entries.length,
             rules: totalRules, byCatalog: byCat };
  };

  global.DB = DB;
})(typeof window !== 'undefined' ? window : this);
