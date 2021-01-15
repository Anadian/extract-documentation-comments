# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.6](https://github.com/Anadian/extract-documentation-comments/compare/v0.2.5...v0.2.6) (2021-01-15)


### Features

* **ci:** Added proper Windows CI via GitHubActions ([c156a65](https://github.com/Anadian/extract-documentation-comments/commit/c156a659c283058e770b146a716a9685889352aa))


### Refactoring

* **test:** Debugging Windows testing. ([da7ea1b](https://github.com/Anadian/extract-documentation-comments/commit/da7ea1b12b86c1fdfb076f82aa79ffb5efe3d0d9))


### Chores

* Fully updated standard-version config to be compatible with conventione commit standard. ([68b6e4e](https://github.com/Anadian/extract-documentation-comments/commit/68b6e4e06533cf880300bd574819d3eb3b8936a8))
* More recent test. ([375c4df](https://github.com/Anadian/extract-documentation-comments/commit/375c4df10dd8c8ebb529e2cf5197bcbd5ac65d08))
* **ci:** Actually updated the build targets. ([cdff42a](https://github.com/Anadian/extract-documentation-comments/commit/cdff42aa79d00fdb2973954c73ebd8c93d15e6cb))
* **ci:** Added more build targets for GHA. ([583050a](https://github.com/Anadian/extract-documentation-comments/commit/583050a802e217a586db6294796f79104dd8aad0))
* **ci:** Alright that should fix the issue. ([69b4daf](https://github.com/Anadian/extract-documentation-comments/commit/69b4daf45e3e5a745f1f06a816d4aa66f83f4717))
* **ci:** GHA doesn't seem to be working. ([c0c226b](https://github.com/Anadian/extract-documentation-comments/commit/c0c226b261d548e01b8729aa9e46fb3bd312f0db))
* **ci:** Trying out GitHub Actions for CI. ([0ecc006](https://github.com/Anadian/extract-documentation-comments/commit/0ecc006d650714c1211f0d5ddeb389bf1952c9ab))
* **config:** Added an addition ci type for standard-version commit messages. ([e2866b6](https://github.com/Anadian/extract-documentation-comments/commit/e2866b67768188f1dddf6a86a940efb485cd3017))
* **deps:** Updated dependencies. ([e2fb50a](https://github.com/Anadian/extract-documentation-comments/commit/e2fb50acf6893620cde9130bc0ed0382874297af))
* **deps-dev:** bump standard-version from 8.0.0 to 8.0.1 ([a5f1f58](https://github.com/Anadian/extract-documentation-comments/commit/a5f1f5873e5667666b1aba8aaee5371ab7dcb392))


### Tests

* Attempting to specify binary mode for reading files on Windows. ([96533e4](https://github.com/Anadian/extract-documentation-comments/commit/96533e47c71367f84d7af6b69a20f0ca5741fbb9))
* Now using a wrapper function. ([7d90ec8](https://github.com/Anadian/extract-documentation-comments/commit/7d90ec832ac1f133f1d3ea38c317c028f871b3ad))
* Trying to use OS EOL. ([ad33a2b](https://github.com/Anadian/extract-documentation-comments/commit/ad33a2b1a8da7384d23fbfdacd00bd6e95ef14f6))
* **windows:** Added more debug directives for testing on Windows. ([758ddb4](https://github.com/Anadian/extract-documentation-comments/commit/758ddb42b135f32d0d5f140e3a3d785c6ce5a9e8))

### [0.2.5](https://github.com/Anadian/extract-documentation-comments/compare/v0.2.4...v0.2.5) (2020-06-30)


### Tests

* **getDocumentationStringFromFilePathSync:** Added parametre test for `getDocumentationStringFromFilePathSync`. ([4696eba](https://github.com/Anadian/extract-documentation-comments/commit/4696ebac799e70231b6d864be37f2158c1696a8f))


### Documentation

* **README.md:** Updated README to match the new CLI. ([f4c0e21](https://github.com/Anadian/extract-documentation-comments/commit/f4c0e218afc4bfb94518686fe3a4e0456454ba10))

### [0.2.4](https://github.com/Anadian/extract-documentation-comments/compare/v0.2.3...v0.2.4) (2020-06-30)


### Bug Fixes

* **CLI:** Corrected `main_Async`s logic to fix a bug in the previous version. ([707c5fe](https://github.com/Anadian/extract-documentation-comments/commit/707c5fe1eac5f9a6c06d63185b8df75c088bd90c))


### Chores

* Slightly improved coverage. ([cac6cf3](https://github.com/Anadian/extract-documentation-comments/commit/cac6cf3e886051bec26fb758e7b783940feab720))

### [0.2.3](https://github.com/Anadian/extract-documentation-comments/compare/v0.2.2...v0.2.3) (2020-06-29)


### Features

* **CLI:** Added proper multi-file mode via `command-line-args` multiple property. ([a5c3664](https://github.com/Anadian/extract-documentation-comments/commit/a5c3664840ff99d254649808b45f0082810d2c9d))
* **CLI:** Multi-file mode appears to be working correctly. Will have to add tests. ([bb3cac5](https://github.com/Anadian/extract-documentation-comments/commit/bb3cac5af27e0ac85ac96be5289779f9b1567d08))
* **globbing:** Added `getDocumentationStringFromFilePathSync` and `generateDocumentationDirectoryFromFileGlobSync` in experimental form. Added `globby` as a dependency. ([4c921de](https://github.com/Anadian/extract-documentation-comments/commit/4c921deef208065a7cdb741d115f0acee2c1a212))


### Bug Fixes

* **README.md:** Corrected a small typo. ([c678c29](https://github.com/Anadian/extract-documentation-comments/commit/c678c296ade103875e44309d524455e132ba70ee))


### Tests

* Started new CLI test suite. ([3f61f7e](https://github.com/Anadian/extract-documentation-comments/commit/3f61f7e92c2635e791e57d298207b92bcd25dc19))
* Tests for multi-file mode is "complete" but still quite shallow; last commit before cleaning and releasing. ([4f39c69](https://github.com/Anadian/extract-documentation-comments/commit/4f39c69d5ab23c9353f433dc305bdc182d591d62))


### Chores

* Real final commit before release. ([147f7b0](https://github.com/Anadian/extract-documentation-comments/commit/147f7b08eacfcb0ef9a5e6107c66a7b171423764))

### [0.2.2](https://github.com/Anadian/extract-documentation-comments/compare/v0.2.1...v0.2.2) (2020-06-27)


### Bug Fixes

* **package.json:** Corrected the accidental recursive publish in the `publish` script. ([d8dce84](https://github.com/Anadian/extract-documentation-comments/commit/d8dce8411bde35a637f15334bd31f3cf9746d4b4))

### [0.2.1](https://github.com/Anadian/extract-documentation-comments/compare/v0.1.6...v0.2.1) (2020-06-27)


### Tests

* Greatly reformatted tests. We should probably switch to an actual test suite soon though. ([aa9bd65](https://github.com/Anadian/extract-documentation-comments/commit/aa9bd6565c6d9cef2ff685f4c83299935c27e6f8))


### Documentation

* Regenerated docs; will push to GitHub to see if the formatting still holds. ([4127e6e](https://github.com/Anadian/extract-documentation-comments/commit/4127e6e09281d9821f8f38f7c413e2a82d9096ca))


### Chores

* Added more convenience scripts. ([bd7c622](https://github.com/Anadian/extract-documentation-comments/commit/bd7c6226504a6a6463e9fc40b2003d2abbd9ad6a))
* Cleaned up directory structure. ([79616fd](https://github.com/Anadian/extract-documentation-comments/commit/79616fd9573b62e587104eaf111244375f9f533a))
* Forcing minor version bump because `standard-version` ignores the breaking change in the parsing commit. ([8e15f37](https://github.com/Anadian/extract-documentation-comments/commit/8e15f3714a06ca8cf693d18d3b63fc864200211c))
* Removed now unnecessary files. ([20e10ec](https://github.com/Anadian/extract-documentation-comments/commit/20e10ecee8d09aa61c276da03d15ee6566a06780))
* Renamed test files. ([94b2a8f](https://github.com/Anadian/extract-documentation-comments/commit/94b2a8f6daf6ee942506091fe89688db64af5c89))

### [0.1.6](https://github.com/Anadian/extract-documentation-comments/compare/v0.1.5...v0.1.6) (2020-06-27)


### Chores

* Preparing for first `standard-version` release. ([4ac9c5b](https://github.com/Anadian/extract-documentation-comments/commit/4ac9c5b9cd344437f224815f93cfe3c6e252603d))

### 0.1.5 (2020-06-27)


### Chores

* Added more config to package.json and added standard-verison as a dev-dependencies. ([26c5d50](https://github.com/Anadian/extract-documentation-comments/commit/26c5d50220aa2b3ab694be6f099088b89ddfdb59))

## Old `CHANGES.md`
- 2020-04-12 v0.0.0 First commit.
- 2020-04-18 v0.0.1 Functional as an executable.
- 2020-04-18 v0.0.2 Added NPM-version badge to README.md.
- 2020-04-18 v0.0.3 Added public API.
- 2020-04-19 v0.0.4 Debugging jsdoc-to-markdown.
- 2020-04-19 v0.0.5 Cleaned up working tree, uninstalled jsdoc-to-markdown, added bin field to package.json.
- 2020-04-19 v0.0.6 Updated README.
- 2020-04-26 v0.0.7 Synchronising stuff.
- 2020-04-26 v0.0.8 Greatly improved README.md.
- 2020-04-26 v0.0.9 Fixed markup issues in the README and cleaned up the working tree's root directory.
- 2020-04-26 v0.0.10 Experimentally adding Travis CI and Coveralls.
- 2020-04-26 v0.0.11 Debugging Travis CI; removing `docs` directory; uninstalling jsdoc.
- 2020-04-26 v0.0.12 Correcting package.json.
- 2020-04-26 v0.0.13 Actually removed jsdoc this time and annotated main.js with istanbul ignores.
- 2020-04-26 v0.0.14 Improving test coverage.
- 2020-04-28 v0.1.0 docs(Made corrections in the README; reformatted the documentation comments in source/main.js; and created API.md)
- 2020-04-28 v0.1.1 docs(Fixed formatting errors in the documentation comments of source/main.js)
- 2020-04-28 v0.1.2 docs(README.md): Added more badges. fix(dependencies): Removed unused `ava` package from package.json.
- 2020-04-28 v0.1.3 docs(API.md): Added URL for life-cycle state keywords standard.
- 2020-05-01 v0.1.4 docs(API.md): Formatting fixes.
- 2020-05-02 v0.1.5 fix(source/main.js): Slightly improved coverage.
