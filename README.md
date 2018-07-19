# mermaid2html

> Simple CLI converter from markdown containing mermaid to HTML.

Under the hood it uses [markdown-it](https://github.com/markdown-it/markdown-it) to convert from markdown to HTML with the [mardown-it-mermaid-pro](https://www.npmjs.com/package/markdown-it-mermaid-pro) plugin to convert mermaid to `<svg>` graphs.

## Install

```bash
npm install -g mermaid2html
```

## Usage help
```
usage: mermaid2html [-h] [-v] [-o OUTPUT] [-i INPUT]

Optional arguments:  
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -o OUTPUT, --output OUTPUT
                        Folder to write the html ouput to. Defaults to '.
                        /html' (Note: the output folder will be purged
                        beforehand, so be careful to not accidentally specify
                        a folder where you might have something useful)
  -i INPUT, --input INPUT
                        Source folder path, eg: './docs'. Defaults to './'
```

## Author

- Razvan Pocaznoi [github/rpocaznoi](https://github.com/rpocaznoi)

## License

[MIT](https://github.com/rpocaznoi/mermaid2html/blob/master/LICENSE)
