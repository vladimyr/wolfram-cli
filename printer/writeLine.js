'use strict';

module.exports = function(data='', indentSize=0){
  indentSize = Math.abs(indentSize);
  if (!indentSize) {
    console.log(data);
    return;
  }

  let indent = '';
  while (indentSize) {
    indent += ' ';
    indentSize--;
  }

  let output = data.split('\n').map(line => `${ indent }${ line }`).join('\n');
  console.log(output);
};
