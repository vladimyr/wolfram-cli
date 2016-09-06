'use strict';

class StringBuffer {
  constructor(str) {
    this._buffer = str || '';
  }

  putText(str) {
    if (str && str.length) this._buffer += `${ str }\n`;
  }

  getText() {
    return this._buffer.substr(0, this._buffer.length - 1);
  }
}

module.exports = StringBuffer;
