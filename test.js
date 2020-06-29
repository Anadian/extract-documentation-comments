#!/usr/local/bin/node
const ChildProcess = require('child_process');

async function Test(){
	var process_object = ChildProcess.exec('bash -c \'node --version\'', { detached: true });
	process_object.stdio[1].on('data', function( chunk ){
		console.log(`stdout chunk: ${chunk.toString('utf8')}`);
	});
	process_object.stdio[2].on('data', function( chunk ){
		console.log(`stderr chunk: ${chunk.toString('utf8')}`);
	});
	process_object.on('exit', function( code, signal ){
		console.log(`code: ${code} signal: ${signal}`);
	});
	/*function(error, stdout, stderr){
		console.log(`error: ${error} stdout: ${stdout} stderr: ${stderr}`);
	}*/
}
Test();
