# mermaid2html

> Simple CLI converter from markdown containing mermaid to HTML.

Under the hood it uses [markdown-it](https://github.com/markdown-it/markdown-it) to convert from markdown to HTML with the [mardown-it-mermaid-pro](https://www.npmjs.com/package/markdown-it-mermaid-pro) plugin to convert mermaid to `<svg>` graphs.

## Install

**node.js** & **bower**:

```bash
npm install -g mermaid2html
```

## Usage
```
usage: mermaid2html [-h] [-v] [-o OUTPUT] [-i INPUT]

Optional arguments:  
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.  
  -o OUTPUT, --output OUTPUT
                        Folder to write the html ouput to. (Note: the folder
                        will be ) By default a new "html" folder will be
                        created in the current folder
  -i INPUT, --input INPUT
                        Source folder path or glob pattern eg: './docs' or '.
                        /docs/*-some-suffix.md'
```

## Authors

- Razvan Pocaznoi [github/rpocaznoi](https://github.com/rpocaznoi)

## License

[MIT](https://github.com/rpocaznoi/mermaid2html/blob/master/LICENSE)
