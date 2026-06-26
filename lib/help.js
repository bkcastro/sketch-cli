import chalk from "chalk";

/** 
 * Help information.
 */
const HELP = `

USAGE: 
	
	$ sketch [COMMAND] [OPTIONS] [ARGUMENTS...]

DESCRIPTION: 
	
	Sketch is a cli tool that helps create art with code. 
	
COMMANDS: 
	
	who			Print information about the current sketchbook.
	init			Initalize a new sketchbook.
	new			Make a new sketch.
	serve			Start the file server.
	help			Print this help page.

OPTIONS: 
	
	--iterate,-i
`

export default function print_HELP() {
	console.log(chalk.yellow(HELP));
}
