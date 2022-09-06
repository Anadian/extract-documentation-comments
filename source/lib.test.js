#!/usr/bin/env node

import * as ExtractDocumentationComments from './lib.js';
import AVA from 'ava';

AVA('getDocumentationStringFromFilePathSync:invalid_file_path', function(t){
	t.log( t.title );
	t.throws( ExtractDocumentationComments.getDocumentationStringFromFilePathSync.bind( null, {}, {} ), { instanceOf: TypeError, code: 'ERR_INVALID_ARG_TYPE' } );
});
AVA('getDocumentationStringFromFilePathSync:invalid_options', function(t){
	t.log( t.title );
	t.throws( ExtractDocumentationComments.getDocumentationStringFromFilePathSync.bind( null, 'string', 'something' ), { instanceOf: TypeError, code: 'ERR_INVALID_ARG_TYPE' } );
});
