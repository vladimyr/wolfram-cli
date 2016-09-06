'use strict';

const printHead = require('./printHead.js');
const printPod = require('./printPod.js');

const INDENT_SIZE = 2;
const COLUMN_DELIMITER = ' | ';

function printResult(result, options) {
  // Setup defaults.
  options = options || {};
  options.indent = options.indent || INDENT_SIZE;
  options.columnDelimiter = options.columnDelimiter || COLUMN_DELIMITER;

  // Print header
  printHead(result, options);

  // Print pods.
  let pods = result.pods || [];
  pods.forEach(pod => printPod(pod, options));
}

module.exports = printResult;
