'use strict';

module.exports = function(data, indentSize){
  data = data || '';

  indentSize = Math.abs(indentSize) || 0;
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
