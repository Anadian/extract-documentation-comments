#!/usr/bin/env node
import ChildProcess from 'node:child_process';
import FS from 'node:fs/promises';
import AVA from 'ava';
import Pify from 'pify';
import * as Pevent from 'p-event';

AVA('CLI:HelpData', async function(t){
	t.log( t.title );
	var process_object = ChildProcess.fork( 'source/cli.js', ['-vVhc'], { silent: true } );
	var actual_stdout = '';
	var actual_stderr = '';
	t.plan(1);
	process_object.stdio[1].on('data', function( chunk ){
		console.log(`Test: ${t.title} received stdout chunk: ${chunk.toString('utf8')}`);
		actual_stdout += chunk.toString('utf8');
	});
	process_object.stdio[2].on('data', function( chunk ){
		console.log(` Test: ${t.title} received stderr chunk: ${chunk.toString('utf8')}`);
		actual_stderr += chunk.toString('utf8');
	});
	const [ code, signal ] = await Pevent.pEvent(process_object, 'exit', {multiArgs: true});
	console.log(`Test: ${t.title}: process exited with code: ${code} signal: ${signal} stdout: ${actual_stdout} stderr: ${actual_stderr}`);
	if( code === 0 ){
		t.pass();
	} else{
		t.fail();
	}
});
AVA('CLI:ClassicUnitTests', async function(t){
	t.log( t.title );
	var process_object = ChildProcess.fork( 'source/cli.js', ['-vx', '--test'], { silent: true } );
	var actual_stdout = '';
	var actual_stderr = '';
	t.plan(1);
	process_object.stdio[1].on('data', function( chunk ){
		console.log(`Test: ${t.title} received stdout chunk: ${chunk.toString('utf8')}`);
		actual_stdout += chunk.toString('utf8');
	});
	process_object.stdio[2].on('data', function( chunk ){
		console.log(` Test: ${t.title} received stderr chunk: ${chunk.toString('utf8')}`);
		actual_stderr += chunk.toString('utf8');
	});
	const [ code, signal ] = await Pevent.pEvent(process_object, 'exit', {multiArgs: true});
	console.log(`Test: ${t.title}: process exited with code: ${code} signal: ${signal} stdout: ${actual_stdout} stderr: ${actual_stderr}`);
	if( code === 0 ){
		t.pass();
	} else{
		t.fail();
	}
});
AVA('CLI:MultiFileShellGlob', async function(t){
	t.log( t.title );
	var process_object = ChildProcess.fork( 'source/cli.js', ['-v', '-I', 'test/example-source-file.js', 'test/another-test-file.js', '-O', 'temp_docs'], { silent: true } );
	var actual_stdout = '';
	var actual_stderr = '';
	process_object.stdio[1].on('data', function( chunk ){
		console.log(`Test: ${t.title} received stdout chunk: ${chunk.toString('utf8')}`);
		actual_stdout += chunk.toString('utf8');
	});
	process_object.stdio[2].on('data', function( chunk ){
		console.log(` Test: ${t.title} received stderr chunk: ${chunk.toString('utf8')}`);
		actual_stderr += chunk.toString('utf8');
	});
	const [ code, signal ] = await Pevent.pEvent(process_object, 'exit', {multiArgs: true});
	console.log(`Test: ${t.title}: process exited with code: ${code} signal: ${signal} stdout: ${actual_stdout} stderr: ${actual_stderr}`);
	if( code === 0 ){
		t.pass();
	} else{
		t.fail();
	}
});
AVA( 'CLI:STDINtoSTDOUT', async function( t ){
	t.log( t.title );
	const stdin_promise = FS.readFile( 'test/example-source-file.js', 'utf8' ).then( file_string => {
		return file_string.replace( /\r\n/g, '\n' );
	} );
	const expected_stdout_promise = FS.readFile( 'test/example-source-file-output.txt', 'utf8' ).then( file_string => {
		return file_string.replace( /\r\n/g, '\n' );
	} );
	var process_object = ChildProcess.fork( 'source/cli.js', [ '-vio' ], {
		silent: true
		//stdio: [ 0, 'pipe', 'pipe', 'ipc' ]
	} );
	var bound_write_function = process_object.stdio[0].write.bind( process_object.stdio[0], await stdin_promise, 'utf8' );
	var write_stdin_function = Pify( bound_write_function, {multiArgs: true});
	var [ error ] = await write_stdin_function();
	if( error == null ){
		process_object.stdio[0].end();
		var actual_stdout = '';
		var actual_stderr = '';
		process_object.stdio[1].on('data', function( chunk ){
			t.log(`Test: ${t.title} received stdout chunk: ${chunk.toString('utf8')}`);
			actual_stdout += chunk.toString('utf8');
		});
		process_object.stdio[2].on('data', function( chunk ){
			t.log(` Test: ${t.title} received stderr chunk: ${chunk.toString('utf8')}`);
			actual_stderr += chunk.toString('utf8');
		});
		const [ code, signal ] = await Pevent.pEvent(process_object, 'exit', {multiArgs: true});
		t.log(`Test: ${t.title}: process exited with code: ${code} signal: ${signal} stdout: ${actual_stdout} stderr: ${actual_stderr}`);
		var stdout_string = actual_stdout.replace( /\r\n/g, '\n' );
		if( code === 0 ){
			t.is( stdout_string, (await expected_stdout_promise)+'\n' );
		} else{
			t.fail( `Unexpected process exit code: ${code}` );
		}
	} else{
		t.fail( `Writing to STDIN returned an error: ${error}` );
	}
} );
