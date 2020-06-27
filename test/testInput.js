
function DoNothingFunction() {
  //data before
}

/** 
  A test output string for pulling
  Documentation Symbols #$/{()}
	Any simple control character (\n,\r,\t) and _any_ ASCII "printing" character should be fine save for the combination of an asterix immediately followed by a forward slash.
*/

/*
	Shouldn't be extracted.
*/

/***/

/** The previous triple asterix line should be a blank line.*/

/** A second test without the line break */

DoNothingFunction()

/** 
 * A third Thing
 */

 // Single line comment, will not output
