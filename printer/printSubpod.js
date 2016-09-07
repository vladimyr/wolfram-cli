'use strict';

const styles = require('./styles.js');
const writeLine = require('./writeLine.js');
const makeTable = require('./table.js');
const StringBuffer = require('./StringBuffer.js');

function printMinput(output, minput) {
  output.putText(styles.minput(` wlang> ${ minput } `));
}

function printPlaintext(output, plaintext, options) {
  // Skip empty plaintext sections.
  if (plaintext.length <= 0) return;

  // Print single line of plaintext.
  if (plaintext.length === 1) {
    output.putText(plaintext[0].join(options.columnDelimiter));
    return;
  }

  // Print multiple lines of plaintext
  if (plaintext[0].length !== plaintext[1].length) {
    output.putText(plaintext.filter(line => line.join(''))
                            .map(line => line.filter(line => line).join(' '))
                            .join('\n')
                  );
    return;
  }

  // Prepare plaintext table data.
  let data = plaintext.slice(0, plaintext.length - 1);

  let lastLine = plaintext[plaintext.length - 1];
  if (lastLine.length > 1) data.push(lastLine);

  // Print table.
  let maxWidth = process.stdout.columns - options.indent;
  output.putText(makeTable(data, { maxWidth }));
  if (lastLine.length === 1) {
    // Print text under table.
    output.putText(lastLine[0].replace(/…/g, '...'));
  }
}

function printSubpod(subpod, options) {
  let plaintext = subpod.plaintext || [];
  let minput = subpod.minput;

  let output = new StringBuffer();

  // Print title.
  if (subpod.title) {
    output.putText(styles.subtitle(subpod.title));
  }

  // Print plaintext section.
  printPlaintext(output, plaintext, options);

  // Print minput.
  if (minput && options.printMinput) {
    printMinput(output, minput, options);
  }

  writeLine(output.getText(), options.indent);
  writeLine();
}

module.exports = printSubpod;
