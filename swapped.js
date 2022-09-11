#!/usr/bin/env node

import AVA from 'ava';
import * as ALWI from './main.js'; 

AVA( 'FirstTest', function( t ){
	t.log( t.title );
	const PROCESS_NAME = 'application-log-winston-interface';
	const MODULE_NAME = 'test';
	const FILENAME = 'source/main.test.js';
	const FUNCTION_NAME = t.title;
	var return_error = null;
	var Logger = null;
	t.log(`WinstonLogger_Transports: ${ALWI.transports}`);
	try{
		Logger = ALWI.initWinstonLogger( 'debug.log', './test_log_dir' );
	} catch(error){
		return_error = new Error(`initWinstonLogger threw an error: ${error}`);
		//throw return_error;
	}
	if( return_error === null ){
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'crit', message: 'Test.'});
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'error', message: 'Test.'});
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'warn', message: 'Test.'});
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'note', message: 'Test.'});
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'info', message: 'Test.'});
		Logger.setConsoleLogLevel( 'debug' );
		Logger.log({process: PROCESS_NAME, module: MODULE_NAME, file: FILENAME, function: FUNCTION_NAME, level: 'debug', message: 'Test.'});
		t.pass();
	} else{
		t.fail( return_error );
	}
} );
