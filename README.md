# extract-documentation-comments
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-brightgreen?style=flat-square)](https://semver.org/spec/v2.0.0.html)
[![License](https://img.shields.io/github/license/Anadian/extract-documentation-comments)](https://github.com/Anadian/extract-documentation-comments/LICENSE)
![npm](https://img.shields.io/npm/v/extract-documentation-comments)

> Simply extract documentation comments from a source file.
# Table of Contents
- [Background](#Background)
- [Install](#Install)
- [Usage](#Usage)
- [CLI](#CLI)
- [API](#API)
- [Contributing](#Contributing)
- [License](#License)
# Background
# Install
`npm install extract-documentation-comments`
to install it to a local package or
`npm install --global extract-documentation-comments`
to install it globally.
# Usage
To use the command-line interface `npx extract-documentation-comments` or just `extract-documentation-comments` if installed globally.
## CLI
```
extract-documentation-comments

  Simply extract documentation comments from a source file. 

Options

  -h, --help                 Writes this help text to stdout.                                              
  -n, --noop                 Show what would be done without actually doing it.                            
  -v, --verbose              Verbose output to stderr.                                                     
  -V, --version              Writes version information to stdout.                                         
  -x, --no-quick-exit        Don't immediately exit after printing help, version, and/or config            
                             information.                                                                  
  -i, --stdin                Read input from stdin.                                                        
  -I, --input string         The path to the file to read input from.                                      
  -t, --test                 Run unit tests and exit.                                                      
  -o, --stdout               Write output to stdout.                                                       
  -O, --output string        The name of the file to write output to.                                      
  -p, --pasteboard           Copy output to pasteboard (clipboard).                                        
  -c, --config               Print configuration values and information to stdout.                         
  -C, --config-file string   Use the given config file instead of the default.                             
```
# API
```js
const ExtractDocumentationComments = require('extract-documentation-comments');
```
See [docs](docs/index.html) for full API.
# Contributing
Changes are tracked in [CHANGES.md](CHANGES.md).
# License
MIT ©2020 Anadian
SEE LICENSE IN [LICENSE](LICENSE)
