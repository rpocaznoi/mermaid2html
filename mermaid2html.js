#!/usr/bin/env node
/*eslint no-console:0*/

'use strict';
var fs = require('fs');
var path = require('path');
var markdownItMermaidPro = require("markdown-it-mermaid-pro");
var glob = require("glob");
var rimraf = require("rimraf");
var argparse = require('argparse');
var mkdirp = require('mkdirp');
var mermaid2html = markdownItMermaidPro.mermaid2html;

var globOptions = {
  ignore: "node_modules/**",
  nodir: true
}

var cli = new argparse.ArgumentParser({
  prog: 'mermaid2html',
  version: require('./package.json').version,
  addHelp: true
});

cli.addArgument(['-o', '--output'], {
  help: `Folder to write the html ouput to.\n(Note: the folder will be )\nBy default a new "html" folder will be created in the current folder`,
  defaultValue: '-'
});

cli.addArgument(['-i', '--input'], {
  help: `Source folder path\neg: './docs'`,
  defaultValue: '-'
});

var options = cli.parseArgs();
var input = path.resolve();

if (options.input !== "-") {
  input = options.input;
}

var targetFolder = options.output === "-" ? path.resolve(input, 'html') : path.resolve(path.normalize(options.output));

if (targetFolder !== path.normalize(process.cwd()) && fs.existsSync(targetFolder)) {
  rimraf.sync(targetFolder);
}
// mkdirp.sync(targetFolder);

var convertAndSave = (srcdest) => {
  var { src, dest } = srcdest;
  var md = fs.readFileSync(src, 'utf-8');
  mkdirp.sync(path.dirname(dest));
  mermaid2html(md, {}).then(html => {
    fs.writeFileSync(dest, html)
    console.log(`${src} converted! => ${dest}`);
  })
};

console.log(`INPUT: '${input}'\nOUTPUT: '${targetFolder}'`);

var srcdestMap = [];
var forbidden = [".git", "node_modules"]
var mapToDest = (dir) => {
  var files = fs.readdirSync(dir);
  var { subdirs, mds } = files.reduce((acc, f) => {
    var stat = fs.statSync(path.resolve(dir, f))
    if (stat.isDirectory() && -1 === forbidden.indexOf(path.basename(f))) {
      acc.subdirs.push(path.resolve(dir, f))
    } else if (stat.isFile() && /.md$/.test(f)) {
      acc.mds.push(path.resolve(dir, f))
    }
    return acc
  }, { subdirs: [], mds: [] });

  mds.forEach(src => srcdestMap.push({
    src,
    dest: path.resolve(targetFolder, path.relative(input, dir), path.basename(src, '.md') + '.html')
  }));
  if (subdirs.length) {
    subdirs.forEach(mapToDest);
  }
}

mapToDest(input)
if (!srcdestMap.length) {
  console.log(`no md files found`);
  process.exit(0);
}

Promise.all(srcdestMap.map(convertAndSave))
