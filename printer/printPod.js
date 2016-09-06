'use strict';

const styles = require('./styles.js');
const writeLine = require('./writeLine.js');
const printSubpod = require('./printSubpod.js');

function printLink(link, options) {
  writeLine(`${ link.text }: ${ styles.link(link.url) }`, options.indent);
  writeLine();
}

function printPod(pod, options) {
  // Extract links and subpods.
  let subpods = pod.subpods || [];
  let links = pod.links || [];

  // Skip empty pod.
  if (subpods.length === 0 && links.length === 0) return;

  // Print subpods & links.
  writeLine(styles.title(pod.title));
  subpods.forEach(subpod => printSubpod(subpod, options));
  links.forEach(link => printLink(link, options));
}

module.exports = printPod;
