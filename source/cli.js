#!/usr/bin/env node
//# Dependencies
	//## Internal
	import * as ExtractDocumentationComments from './lib.js';
	//## Standard
	import FileSystem from 'node:fs';
	import Path from 'node:path';
	import Utility from 'node:util';
	//import Assert from 'assert';
	//## External
	import getPackageMeta from 'simple-package-meta';
	import GetStream from 'get-stream';
	import MakeDir from 'make-dir';
	import * as ApplicationLogWinstonInterface from 'application-log-winston-interface';
	import CommandLineArgs from 'command-line-args';
	import CommandLineUsage from 'command-line-usage';

//#Constants
const FILENAME = 'extract-documentation-comments.js';
const MODULE_NAME = 'ExtractDocumentationComments';
const PROCESS_NAME = 'extract-documentation-comments';
const PackageMeta = await getPackageMeta( import.meta );
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
function setLogger( logger ){
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
}
/**
### getDocumentationStringFromSourceString_Test (private)
> Tests [getDocumentationStringFromSourceString](./lib.md/#getDocumentationStringFromSourceString); this function is not exported and should only be used internally by this module. 
 
Returns:
| type | description |
| --- | --- |
| {boolean} | Returns `true` if all tests pass successfully. |

Throws:
| code | type | condition |
| --- | --- | --- |
| any | {Error} | Thrown if a test fails. |

Status:
| version | change |
| --- | --- |
| 0.1.7 | Cleaned up. |
| 0.0.1 | Introduced |
*/
function getDocumentationStringFromSourceString_Test(){
	const FUNCTION_NAME = 'getDocumentationStringFromSourceString_Test';
	//Variables
	var _return = false;
	var return_error = null;
	var arg_test = false;
	var success_test = false;
	var sample_input_path = '';
	var sample_input_string = '';//FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testInput.js')).toString()
	var expected_output_path = '';
	var expected_output_string = '';//FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testOutput.txt')).toString()
	var actual_output_string = '';
	//Tests
	///Invalid arg test
	try{
		ExtractDocumentationComments.getDocumentationStringFromSourceString( {} );
		arg_test = new Error(`Failure: invalid arg test: didn't throw an error when it received an invalid argument.`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: arg_test.message});
	} catch(error){
		if( error.code === 'ERR_INVALID_ARG_TYPE' ){
			arg_test = true;
		} else/* c8 ignore start */{
			arg_test = error;
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Failure: invalid arg test: received an unexpected error: ${error}\n`});
		}/* c8 ignore stop */
	}
	///success test
	try {
		try{
			sample_input_path = Path.resolve( PackageMeta.paths.packageDirectory, 'test/example-source-file.js' );
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `sample_input_path: ${sample_input_path}`});
		} catch(error)/* c8 ignore start */{
			return_error = new Error(`Path.resolve threw an error: ${error}`);
			throw return_error;
		}/* c8 ignore stop */
		try{
			sample_input_string = FileSystem.readFileSync( sample_input_path, { encoding: 'utf8', flag: 'r' } );
			//sample_input_string = readFileSyncBinaryMode( sample_input_path, 'utf8' );
		} catch(error)/* c8 ignore start */{
			return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
			throw return_error;
		}/* c8 ignore stop */
		try{
			expected_output_path = Path.resolve( PackageMeta.paths.packageDirectory, 'test/example-source-file-output.txt' );
		} catch(error)/* c8 ignore start */{
			return_error = new Error(`Path.resolve threw an error: ${error}`);
			throw return_error;
		}/* c8 ignore stop */
		try{
			expected_output_string = FileSystem.readFileSync( expected_output_path, { encoding: 'utf8', flag: 'r' } );
			//expected_output_string = readFileSyncBinaryMode( expected_output_path, 'utf8' );
		} catch(error)/* c8 ignore start */{
			return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
			throw return_error;
		}/* c8 ignore stop */
		actual_output_string = ExtractDocumentationComments.getDocumentationStringFromSourceString( sample_input_string );
		if( actual_output_string === expected_output_string ){
			success_test = true;
		} else/* c8 ignore start */{
			success_test = new Error(`success test failed: actual output: '${actual_output_string}' didn't match expected output '${expected_output_string}'`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: success_test.message});
			//Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Leven difference ${Leven(actual_output_string, expected_output_string)}`});
			//Assert.equal(actual_output_string, expected_output_string);
		}
	} catch(error){
		success_test = error;
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: `Failure: success test caught an unexpected error: ${error}\n`});
	}/* c8 ignore stop */
	if( (arg_test === true) && (success_test === true) ){
		_return = true;
	} else/* c8 ignore start */{
		_return = false;
		return_error = new Error(`Test failed: invalid arg test: '${arg_test}' success test: '${success_test}'\n`);
		throw return_error;
	}/* c8 ignore stop */
	//Return
	return _return;
}
/**
### getDocumentationStringFromSourceBuffer_Test (private)
> Tests [getDocumentationStringFromSourceBuffer](#getDocumentationStringFromSourceBuffer); this function is not exported and should only be used internally by this module. 
 
Returns:
| type | description |
| --- | --- |
| {boolean} | Returns `true` if all tests pass successfully. |

Throws:
| code | type | condition |
| --- | --- | --- |
| any | {Error} | Thrown if a test fails. |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
function getDocumentationStringFromSourceBuffer_Test(){
	const FUNCTION_NAME = 'getDocumentationStringFromSourceBuffer_Test';
	//Variables
	var _return = false;
	var return_error = null;
	var test_name = '';
	var arg_test = false;
	var null_buffer_test = false;
	var success_test = false;
	var input_buffer = null;
	var sample_input_path = '';
	var sample_input_buffer = null;
	var expected_output_path = '';
	var expected_output_string = '';//FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testOutput.txt'), 'utf8');
	var actual_output_string = '';
	//Tests
	test_name = 'invalid arg test';
	try{
		ExtractDocumentationComments.getDocumentationStringFromSourceBuffer( 'something' );
		arg_test = new Error(`Failure: ${test_name}: failed to return an error even when arguments were invalid.`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: arg_test.message});
	} catch(error){
		if( error.code === 'ERR_INVALID_ARG_TYPE' ){
			arg_test = true;
			//console.log('arg_test passed.');
		} else/* c8 ignore start */{
			arg_test = new Error(`Failure: ${test_name}: received an unexpected error: '${error}'`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: arg_test.message});
		}/* c8 ignore stop */
	}
	test_name = 'null buffer test';
	try{
		input_buffer = Buffer.from('', 'utf8');
		ExtractDocumentationComments.getDocumentationStringFromSourceBuffer( input_buffer );
		null_buffer_test = new Error(`Failure: ${test_name}: failed to return an error when sent an empty buffer.`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: null_buffer_test.message});
	} catch(error){
		if( error.code === 'ERR_INVALID_RETURN_VALUE' ){
			null_buffer_test = true;
			//console.log('null_buffer_test passed.');
		} else/* c8 ignore start */{
			null_buffer_test = new Error(`Failure: ${test_name}: received an unexpected error: ${error}`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: null_buffer_test.message});
		}/* c8 ignore stop */
	}
	test_name = 'success test';
	try {
		try{
			sample_input_path = Path.resolve( PackageMeta.paths.packageDirectory, 'test/example-source-file.js' );
		} catch(error)/* c8 ignore start */{
			return_error = new Error(`Path.resolve threw an error: ${error}`);
			throw return_error;
		}/* c8 ignore stop */
		try{
			sample_input_buffer = FileSystem.readFileSync( sample_input_path );
		} catch(error)/* c8 ignore start */{
			return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
			throw return_error;
		}/* c8 ignore stop */
		try{
			expected_output_path = Path.resolve( PackageMeta.paths.packageDirectory, 'test/example-source-file-output.txt' );
		} catch(error)/* c8 ignore start */{
			return_error = new Error(`Path.resolve threw an error: ${error}`);
			throw return_error;
		}/* c8 ignore stop */
		try{
			expected_output_string = FileSystem.readFileSync( expected_output_path, 'utf8' );
		} catch(error)/* c8 ignore start */{
			return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
			throw return_error;
		}/* c8 ignore stop */
		//input = new Buffer.from(FileSystem.readFileSync(path.resolve(__dirname, '../testFiles/testInput.js')), 'utf8')
		actual_output_string = ExtractDocumentationComments.getDocumentationStringFromSourceBuffer( sample_input_buffer );
		if( actual_output_string === expected_output_string ){
			success_test = true;
			//console.log('success_test passed');
		} else/* c8 ignore start */{
			success_test = new Error(`Failure: ${test_name}: actual output '${actual_output_string}' didn't match expected output '${expected_output_string}'`);
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: success_test.message});
		}
	} catch(error){
		success_test = new Error(`Failure: ${test_name}: caught unexpected exception: ${error}`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: success_test.message});
	}/* c8 ignore stop */
	//Return
	if( (arg_test === true) && (null_buffer_test === true) && (success_test === true) ){
		_return = true;
	} else/* c8 ignore start */{
		return_error = new Error(`Test failed: invalid arg test: '${arg_test}' null buffer test: '${null_buffer_test}' success test: '${success_test}'`);
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
		throw return_error;
	}/* c8 ignore stop */
	return _return;
}
/**
### main_Async (private)
> The main function when the script is run as an executable without the `--test` command-line option. Not exported and should never be manually called.

Parametres:
| name | type | description |
| --- | --- | --- |
| options | {?options} | An object representing the command-line options. \[default: {}\] |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
async function main_Async( options = {} ){
	var arguments_array = Array.from(arguments);
	var return_error = null;
	const FUNCTION_NAME = 'main_Async';
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `received: ${Utility.inspect( arguments_array, true, null, true )}`});
	//Variables
	var input_string = '';
	var output_string = '';
	//var glob_report = {};
	var output_path = '';
	var output_directory = '';
	var report = {
		files: []
	};
	var report_file_object = {};
	var multi_file_mode = false;
	//Parametre checks
	//Function
	//Multi-file mode
	if( options.input != null && typeof(options.input) === 'object' && Array.isArray(options.input) === true ){
		if( options.input.length > 1 ){
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `options.input: ${options.input.toString('utf8')}`});
			Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: 'Multi-file mode activated.'});
			multi_file_mode = true;
			if( options.output != null && typeof(options.output) === 'string' ){
				for( var i = 0; i < options.input.length; i++ ){
					report_file_object = {
						path: options.input[i],
						success: false,
						error: null
					};
					try{
						output_string = ExtractDocumentationComments.getDocumentationStringFromFilePathSync( options.input[i], options );
						try{
							output_path = Path.join( options.output, options.input[i] );
							try{
								output_directory = Path.dirname( output_path );
								try{
									MakeDir.sync( output_directory );
									try{
										FileSystem.writeFileSync( output_path, output_string, 'utf8' );
										report_file_object.success = true;
										report.files.push( report_file_object );
									} catch(error)/* c8 ignore start */{
										report_file_object.error = new Error(`FileSystem.writeFileSync threw an error: ${error}`);
										report.files.push( report_file_object );
									}
								} catch(error){
									report_file_object.error = new Error(`MakeDir.sync threw an error: ${error}`);
									report.files.push( report_file_object );
								}
							} catch(error){
								report_file_object.error = new Error(`Path.dirname threw an error: ${error}`);
								report.files.push( report_file_object );
							}
						} catch(error){
							report_file_object.error = new Error(`Path.join threw an error: ${error}`);
							report.files.push( report_file_object );
						}
					} catch(error){
						report_file_object.error = new Error(`getDocumentationStringFromFilePathSync threw an error: ${error}`);
						report.files.push( report_file_object );
					}
				}
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `Multi-file report: ${Utility.inspect( report, false, null, true )}`});
			} else{
				return_error = new Error('"options.output" (`--output`) must be specified when using multi-file mode.');
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}/* c8 ignore stop */
		} 
	} 
	//Single-file mode
	if( multi_file_mode === false ){
		///Input
		if( return_error === null ){
			if( options.stdin === true ){
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'info', message: 'Reading input from STDIN.'});
				try{
					input_string = await GetStream( process.stdin, 'utf8' );
				} catch(error)/* c8 ignore start */{
					return_error = new Error(`GetStream threw an error: ${error}`);
					Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
				}/* c8 ignore stop */
			} else if( options.input != null ){
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'info', message: 'Reading input from a file.'});
				if( typeof(options.input[0]) === 'string' ){
					Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: `options.input: '${options.input[0]}'`});
					try{
						input_string = FileSystem.readFileSync( options.input[0], 'utf8' );
					} catch(error)/* c8 ignore start */{
						return_error = new Error(`FileSystem.readFileSync threw an error: ${error}`);
						Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
					}
				} else{
					return_error = new Error('"options.input" is not a string.');
					Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
				}
			} else{
				return_error = new Error('No input options specified.');
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}/* c8 ignore stop */
		}
		///Transform
		if( return_error === null ){
			if( input_string !== '' && typeof(input_string) === 'string' ){
				try{
					output_string = ExtractDocumentationComments.getDocumentationStringFromSourceString( input_string, options );
				} catch(error)/* c8 ignore start */{
					return_error = new Error(`getDocumentationStringFromSourceString threw an error: ${error}`);
					Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
				}
			} else{
				return_error = new Error('input_string is either null or not a string.');
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}/* c8 ignore stop */
		}
		///Output
		if( return_error === null ){
			if( output_string !== '' && typeof(output_string) === 'string' ){
				if( options.output != null && typeof(output_string) === 'string' ){
					try{
						FileSystem.writeFileSync( options.output, output_string, 'utf8' );
					} catch(error)/* c8 ignore start */{
						return_error = new Error(`FileSystem.writeFileSync threw an error: ${error}`);
						Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
					}/* c8 ignore stop */
				} else{
					if( options.stdout !== true ){
						Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'warn', message: 'No output options specified; defaulting to STDOUT.'});
					}
					console.log(output_string);
				}
			} else/* c8 ignore start */{
				return_error = new Error('"output_string" is either null or not a string.');
				Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: return_error.message});
			}/* c8 ignore stop */
		}
	}

	//Return
	if( return_error !== null )/* c8 ignore start */{
		process.exitCode = 1;
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'crit', message: return_error.message});
	}/* c8 ignore stop */
}
/**
### main_Async_Test (private)
> The main function when the script is run as an executable **with** the `--test` command-line option. Runs all of the other `*_Test()`-type unit-test functions in this module. Not exported and should never be manually called.

Parametres:
| name | type | description |
| --- | --- | --- |
| options | {?options} | An object representing the command-line options. \[default: {}\] |

Status:
| version | change |
| --- | --- |
| 0.0.1 | Introduced |
*/
async function main_Async_Test(){
	const FUNCTION_NAME = 'main_Async_Test';
	//Variables
	var _return = false;
	var return_error = null;
	//Tests
	try {
		console.log('string');
		getDocumentationStringFromSourceString_Test();
		console.log('buffer');
		getDocumentationStringFromSourceBuffer_Test();
	} catch(error)/* c8 ignore start */{
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'crit', message: `Test failed with error: '${error}'`});
		process.exitCode = 4;
	}/* c8 ignore stop */
	//Return
	return _return;
}
//## MainExecutionFunction
const FUNCTION_NAME = 'MainExecutionFunction';
//##Dependencies
	//###Internal
	//###Standard
	//###External
//Constants
const OptionDefinitions = [
	//UI
	{ name: 'help', alias: 'h', type: Boolean, description: 'Writes this help text to STDOUT.' },
	{ name: 'noop', alias: 'n', type: Boolean, description: '[Reserved] Show what would be done without actually doing it.' },
	{ name: 'verbose', alias: 'v', type: Boolean, description: 'Verbose output to STDERR.' },
	{ name: 'version', alias: 'V', type: Boolean, description: 'Writes version information to STDOUT.' },
	{ name: 'no-quick-exit', alias: 'x', type: Boolean, description: 'Don\'t immediately exit after printing help, version, and/or config information.' },
	//Input
	{ name: 'stdin', alias: 'i', type: Boolean, description: 'Read input from STDIN.' },
	{ name: 'input', alias: 'I', type: String, multiple: true, defaultOption: true, description: 'The path to the file to read input from. Multiple paths can be specified with this option, doing so will activate multi-file mode: in this mode, `--output` must also be used and given the name of the directory to place the extracted documentation for each input file.' },
	//{ name: 'input-glob', alias: 'G', type: String, description: '[wip] A glob literal as a string: will generate a documentation file for all source files matching this glob; the files will be place in the output directory named in `--output`. Remember to properly escape the string for your shell.' }, 
	{ name: 'test', alias: 't', type: Boolean, description: 'Run unit tests and exit.' },
	//Output
	{ name: 'stdout', alias: 'o', type: Boolean, description: 'Write output to STDOUT.' },
	{ name: 'output', alias: 'O', type: String, description: 'The name of the file to write output to or, in the case of passing multiple paths to `--input`, (multi-file mode) the name of the directory to place the generated documentation files.' },
	{ name: 'pasteboard', alias: 'p', type: Boolean, description: '[Reserved] Copy output to pasteboard (clipboard).' },
	//Config
	{ name: 'config', alias: 'c', type: Boolean, description: 'Print search paths and configuration values to STDOUT.' },
	{ name: 'config-file', alias: 'C', type: String, description: '[Reserved] Use the given config file instead of the default.' },
];
//Variables
var quick_exit = false;
/*var source_dirname = '';
var parent_dirname = '';
var package_path = '';*/
var logger = null;
//Logger
try{ 
	MakeDir.sync( PackageMeta.paths.log );
} catch(error)/* c8 ignore start */{
	console.error('MakeDir.sync threw: %s', error);
}/* c8 ignore stop */
try{
	//console.log( PackageMeta.paths.log );
	logger = ApplicationLogWinstonInterface.initWinstonLogger('debug.log', PackageMeta.paths.log);
	//console.log( '%o', logger );
	try{
		setLogger( logger );
	} catch(error)/* c8 ignore start */{
		return_error = new Error(`setLogger threw an error: ${error}`);
		console.error(return_error);
	}
} catch(error){
	return_error = new Error(`ApplicationLogWinstonInterface.initWinstonLogger threw an error: ${error}`);
	console.error(return_error);
	//throw return_error;
}/* c8 ignore stop */
Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'Start of execution block.'});
//Options
var Options = CommandLineArgs( OptionDefinitions );
//Config
/* c8 ignore start */
if( Options.verbose === true ){
	//Logger.real_transports.console_stderr.level = 'debug';
	Logger.setConsoleLogLevel( 'debug' );
	Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: `Logger: console_stderr transport log level set to: ${Logger.real_transports.console_stderr.level}`});
}
//Main
if( Options.version === true ){
	console.log(PackageMeta.packageJSON.version);
	quick_exit = true;
}
if( Options.help === true ){
	const help_sections_array = [
		{
			header: 'extract-documentation-comments',
			content: 'Simply extract documentation comments from a source file.',
		},
		{
			header: 'Options',
			optionList: OptionDefinitions
		}
	]
	const help_message = CommandLineUsage(help_sections_array);
	console.log(help_message);
	quick_exit = true;
}
if( Options.config === true ){
	console.log(PackageMeta);
	quick_exit = true;
}/* c8 ignore stop */
if( quick_exit === false || Options['no-quick-exit'] === true ){
	if( Options.test === true ){
		main_Async_Test();
	} else/* c8 ignore start */{
		main_Async( Options );
	}/* c8 ignore stop */
}
Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'End of execution block.'});
