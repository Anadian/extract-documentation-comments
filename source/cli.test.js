#!/usr/bin/env node
import ChildProcess from 'node:child_process';
import AVA from 'ava';
//import Pify from 'pify';
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
	var process_object = ChildProcess.fork( './source/cli.js', ['-v', '-I', 'test/example-source-file.js', 'test/another-test-file.js', '-O', 'temp_docs'], { silent: true } );
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
