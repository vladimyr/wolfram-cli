'use strict';

const table_ = require('table');
const table = table_.default;
const norc = table_.getBorderCharacters('norc');

function maxColumnWidth(count, columns) {
  columns = columns || process.stdout.columns;
  return Math.floor((columns - (count * 3) - 1) / count);
}

function getColumnsConfig(table, options) {
  options = options || {};

  let columns = {};

  let row = table[0];
  row.forEach((_, col) => {
    let contentWidth = 0;
    table.forEach((_, row) => {
      let width = table[row][col].length;
      if (width > contentWidth) contentWidth = width;
    });

    columns[col] = {
      width: Math.min(contentWidth, maxColumnWidth(row.length, options.maxWidth)),
      wrapWord: options.wordwrap || true
    };
  });
  return columns;
}

function makeTable(data, options) {
  let config = {
    border: options.border || norc,
    columns: getColumnsConfig(data, options)
  };

  return table(data, config).replace(/\n*$/g, '');
}

module.exports = makeTable;
