import { parseArgs } from 'node:util';
import { applyValuesToOptions, options } from './options.js';
import { runCommand, validCommand } from './commands.js';
import Log from './log.js';

/** 
 * Execute input.
 *
 * @param {object} input 
 * @return {void}
 */
function execute(input) {
    
    // Apply options and run command.
    applyValuesToOptions(input.values) && runCommand(input.command);
}

/**
 * Process input from the command line and return it.
 *
 * @return {object}
 */
function processInput() {
	
	try {

		const args = process.argv.slice(2) || [];
        const command = (validCommand(args.at(0))) ? args.shift() : '';
        const { values, positionals } = parseArgs({ args, options });
        
        return {
            command: command,
            values: []
        }

	} catch (err) {
		Log.error('Invalid input.');
	}
}

/**
 * Starting point for the CLI.
 * Process and execute input.
 *
 * @return {void}
 */
export default function start() {

    const input = processInput();
    execute(input);
}
