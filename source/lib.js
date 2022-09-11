#!/usr/bin/env node
/**
# [extract-documentation-comments.js](source/lib.js)
> Simply extract documentation comments from a source file.

Author: Anadian

Code license: MIT
```
	Copyright 2020 Anadian
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
Documentation License: [![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)
> The source-code comments and documentation are written in [GitHub Flavored Markdown](https://github.github.com/gfm/).

> The type notation used in this documentation is based off of the [Google Closure type system](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System).

> The status and feature lifecycle keywords used in this documentation are based off of my own standard [defined here](https://github.com/Anadian/FeatureLifeCycleStateStandard).
*/

//#Dependencies
	//##Internal
	//##Standard
	import FileSystem from 'node:fs';
	//import Assert from 'assert';
	import OperatingSystem from 'node:os';
	//##External
	import * as ApplicationLogWinstonInterface from 'application-log-winston-interface';

//#Constants
const FILENAME = 'extract-documentation-comments.js';
const MODULE_NAME = 'ExtractDocumentationComments';
const PROCESS_NAME = 'extract-documentation-comments';
//##Errors

//#Global Variables
var Logger = ApplicationLogWinstonInterface.nullLogger;
/**
## Functions
*/
/**
### setLogger
> Allows this module's functions to log the given logger object.

Parametres:
| name | type | description |
| --- | --- | --- |
| logger | {?object} | The logger to be used for logging or `null` to disable logging. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if `logger` is neither an object nor `null` |

Status:
| version | change |
| --- | --- |
| 0.0.0 | Introduced |
*/
function setLogger( logger )/* c8 ignore start */{
	var return_error = null;
	//const FUNCTION_NAME = 'setLogger';
	//Variables
	//Parametre checks
	/* c8 ignore start */
	if( typeof(logger) === 'object' ){
		if( logger === null ){
			logger = { 
				log: () => {
					return null;
				}
			};
		}
	} else{
		return_error = new TypeError('Param "logger" is not an object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}/* c8 ignore stop */

	//Function
	Logger = logger;
	//Return
}/* c8 ignore stop */

/**
### getDocumentationStringFromSourceString
> Returns a string containing only the contents of `\/** ... *\/` style documentation strings from the given source-file string.

Parametres:
| name | type | description |
| --- | --- | --- |
| source_string | {string} | The source file, as a string, to parse for `\/** ... *\/` style documentation strings. |
| options | {?object} | \[Reserved\] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | A string containing all of the documentation style comments, with the comment markers themselves remove, concatenated together. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if `source_string` isn't a string. |

Status:
| version | change |
| --- | --- |
| 0.2.9 | Added Latin-1 Supplemental character support. |
| 0.1.6 | Revamped the parsing logic. |
| 0.0.1 | Introduced |
*/
function getDocumentationStringFromSourceString( source_string, options = {} ){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	var regex = null;
	var matches_iterator = null;
	var matches_array = [];
	var documentation = '';
	const FUNCTION_NAME = 'getDocumentationStringFromSourceString';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	//Parametre checks
	if( typeof(source_string) !== 'string' ){
		return_error = new TypeError('Param "source_string" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	//Function
	regex = new RegExp('/\\*\\*([\\t\\n\\r -~\u00A1-\u00AC\u00AE-\u00FF]*?)\\*/', 'gsu');
	matches_iterator = source_string.matchAll(regex);
	matches_array = Array.from(matches_iterator);
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `matches: ${matches_array}`});
	for( var index = 0; index < matches_array.length; index++ ){
		documentation += (matches_array[index][1])+OperatingSystem.EOL; //Crude and will be polished up soon.
	}
	_return = documentation;

	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
/**
### getDocumentationStringFromSourceBuffer
> Returns a string containing only the contents of `\/** ... *\/` style documentation strings from the given source-file buffer.

Parametres:
| name | type | description |
| --- | --- | --- |
| source_buffer | {Buffer} | The source file, as a Node Buffer, to parse for `\/** ... *\/` style documentation strings. |
| options | {?object} | \[Reserved\] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | A string containing all of the documentation style comments, with the comment markers themselves remove, concatenated together. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if `source_buffer` isn't a Buffer. |
| 'ERR_INVALID_RETURN_VALUE' | {Error} | Thrown if `source_buffer.toString()` returns an empty string or a non-string. |

Status:
| version | change |
| --- | --- |
| 0.1.7 | Cleaned up. |
| 0.0.1 | Introduced |
*/
function getDocumentationStringFromSourceBuffer( source_buffer , options = {} ){
	var _return = '';
	var return_error;
	var buffer_string = '';
	const FUNCTION_NAME = 'getDocumentationStringFromSourceBuffer';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments}`});
	//Variables
	//Parametre checks
	if( Buffer.isBuffer(source_buffer) === false ){
		return_error = new TypeError('Param "source_buffer" is not Buffer.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Throwing error: ${return_error}`});
		throw return_error;
	}
	//Function
	buffer_string = source_buffer.toString( 'utf8' );
	if( buffer_string !== '' ){
		try{
			_return = getDocumentationStringFromSourceString( buffer_string, options );
		} catch(error)/* c8 ignore start */{
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Received and throwing error: ${error}`});
			throw error;
		}/* c8 ignore stop */
	} else{
		return_error = new Error(`'source_buffer.toString()' returned an empty string or a non-string: ${buffer_string}`);
		return_error.code = 'ERR_INVALID_RETURN_VALUE';
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Throwing error: ${return_error}`});
		throw return_error;
	}
	

	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}
/**
### getDocumentationStringFromFilePathSync
> Generates a documentation String from the source-code comments in the file at the given filepath.

Parametres:
| name | type | description |
| --- | --- | --- |
| file_path | {string} | The file path as a string to read and parse for documentation comments.  |
| options | {?Object} | [Reserved] Additional run-time options. \[default: {}\] |

Returns:
| type | description |
| --- | --- |
| {string} | The documentation string for the given file. |

Throws:
| code | type | condition |
| --- | --- | --- |
| 'ERR_INVALID_ARG_TYPE' | {TypeError} | Thrown if a given argument isn't of the correct type. |

Status:
| version | change |
| --- | --- |
| 0.2.2 | Introduced |
*/
function getDocumentationStringFromFilePathSync( file_path, options = {} ){
	var arguments_array = Array.from(arguments);
	var _return;
	var return_error;
	const FUNCTION_NAME = 'getDocumentationStringFromFilePathSync';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${arguments_array}`});
	//Variables
	var file_buffer = null;
	var documentation_string = '';
	//Parametre checks
	if( typeof(file_path) !== 'string' ){
		return_error = new TypeError('Param "file_path" is not string.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}
	if( typeof(options) !== 'object' ){
		return_error = new TypeError('Param "options" is not ?Object.');
		return_error.code = 'ERR_INVALID_ARG_TYPE';
		throw return_error;
	}

	//Function
	try{
		file_buffer = FileSystem.readFileSync( file_path );
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `file_buffer: ${file_buffer.toString('utf8')}`});
	} catch(error)/* c8 ignore start */{
		return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
		throw return_error;
	}/* c8 ignore stop */
	if( file_buffer != null ){
		try{
			documentation_string = getDocumentationStringFromSourceBuffer( file_buffer, options );
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `documentation_string: ${documentation_string}`});
		} catch(error)/* c8 ignore start */{
			return_error = new Error(`getDocumentationStringFromSourceString threw an error: ${error}`);
			throw return_error;
		}/* c8 ignore stop */
	}
	if( documentation_string != null ){
		_return = documentation_string;
	}
	//Return
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `returned: ${_return}`});
	return _return;
}

export { getDocumentationStringFromSourceString, getDocumentationStringFromSourceBuffer, getDocumentationStringFromFilePathSync, setLogger };
