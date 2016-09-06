#!/usr/bin/env node

'use strict';

const query = require('wolfram-query');
const chalk = require('chalk');
const ora = require('ora');
const print = require('./printer/print.js');
const argv = require('minimist')(process.argv.slice(2));

let input = argv._.join(' ');
let options = {};
if (argv.xml) options.outputType = 'xml';

let spinner = ora(`Querying ${ chalk.bold('wolframalpha.com') }...`);
spinner.start();

query(input, options)
  .then(data => {
    spinner.stop();
    output(data);
  })
  .catch(err => {
    spinner.stop();
    throw err;
  });

function output(data) {
  if (argv.json) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (argv.xml) {
    console.log(data.write());
    return;
  }

  print(data);
}
