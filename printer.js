'use strict';

var chalk = require('chalk'),
    Table = require('cli-table');

function writeln(data, indentSize){
    data = data || '';

    indentSize = Math.abs(indentSize) || 0;
    if (!indentSize) {
        console.log(data);
        return;
    }

    var indent = '';
    while (indentSize) {
        indent += ' ';
        indentSize--;
    }

    var output = data.split('\n').map(function(line){
        return indent + line;
    }).join('\n');

    console.log(output);
}


var INDENT_SIZE = 2,
    COL_DELIM   = ' | ';

var styles = {
    title: chalk.cyan.bold,
    subtitle: chalk.cyan,
    minput: chalk.bgWhite.magenta.bold,
    link:  chalk.underline.blue
};

var printMinputEnabled = false;

function printHead(result){
    writeln();

    if (!result.info.success) {
        writeln(chalk.bgRed.white(' No results found! '));
        writeln();
    }

    writeln(styles.title('Web result'));
    writeln(styles.link(result.url), INDENT_SIZE);
    writeln();
}

function printMinput(minput){
    if (printMinputEnabled)
        return styles.minput(' wlang> ' + minput + ' ');
}

function printSubpod(subpod){
    var plaintext = subpod.plaintext || [],
        minput    = subpod.minput;

    var output = {
        _buffer: '',
        putText: function(str){
            if (str && str.length)
                this._buffer += str + '\n';
        },
        getText: function(str){
            return this._buffer.substr(0, this._buffer.length - 1);
        }
    };

    if (subpod.title)
        output.putText(styles.subtitle(subpod.title));

    if (plaintext.length === 1) {
        output.putText(plaintext[0].join(COL_DELIM));
        
        if (minput)
            output.putText(printMinput(minput));
        
        writeln(output.getText(), INDENT_SIZE);
        writeln();
        return;
    }

    var tbl   = new Table(),
        lines = plaintext,
        len   = lines.length;

    lines.forEach(function(line, i){
        if (i + 1 < len) {
            tbl.push(line);
            return;
        }

        if (line.length === 1) {
            output.putText(tbl.toString());
            output.putText(line[0]);
        } else {
            tbl.push(line);
            output.putText(tbl.toString());
        }
    });

    if (minput)
        output.putText(printMinput(minput));

    writeln(output.getText(), INDENT_SIZE);
    writeln();
}

function printLink(link){
    writeln(link.text + ': ' + styles.link(link.url), INDENT_SIZE);
    writeln();
}

function printPod(pod){
    var subpods = pod.subpods || [],
        links   = pod.links || [];

    // empty pod
    if (subpods.length === 0 && links.length === 0)
        return;

    writeln(styles.title(pod.title));
    subpods.forEach(printSubpod);
    links.forEach(printLink);
}

function printResult(result, options){
    options = options || {};
    if (options.printMinput)
        printMinputEnabled = true;

    printHead(result);
    
    var pods = result.pods;
    pods.forEach(printPod);
}

module.exports = printResult;