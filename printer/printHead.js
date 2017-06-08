'use strict';

const chalk = require('chalk');
const styles = require('./styles.js');
const writeLine = require('./writeLine.js');

function printHead(result, options={}) {
  writeLine();

  if (!result.info.success) {
    writeLine(chalk.bgRed.white(' No results found! '));
    writeLine();
  }

  writeLine(styles.title('Web result'));
  writeLine(styles.link(result.url), options.indent);
  writeLine();
}

module.exports = printHead;
