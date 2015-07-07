#!/usr/bin/env node

'use strict';

var execQuery   = require('wolfram-query'),
    printResult = require('./printer.js'),
    argv        = require('minimist')(process.argv.slice(2));

var input = argv._.join(' '),
    opts  = {};

if (argv.json)
    opts.outputType = 'json';
else if (argv.xml)
    opts.outputType = 'xml';

if (process.env.WOLFRAM_APP_ID)
    opts.appId = process.env.WOLFRAM_APP_ID;

execQuery(input, opts, function(err, data){
    if (opts.outputType) {
        console.log(data)
        return;
    }
    
    printResult(data);
});