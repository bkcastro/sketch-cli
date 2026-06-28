import { parseArgs } from 'node:util';
import { printSketchbookInfo, newSketch, initSketchbook } from './files.js';
import start_server from '../server/server.js';
import print_HELP from './help.js';
import { process_options } from './options.js';
import { printTemplates } from '../templates/templates.js';

/**
 * All commands.
 */
const commands = [
	'who',
	'init',
	'serve',
	'help',
    'templates',
];

/** 
 * All options.
 */ 
const options = {
	template: {
		type: 'string',
		short: 't',
	},
	iterate: {
		type: 'boolean',
		short: 'i',
	},
};

/** 
 * Process command.
 *
 * @param {string} command
 * @return {void}
 */
function execute(command) {

	switch(command) {
		case 'who': printSketchbookInfo(); break;
		case 'init': initSketchbook(); break;
		case 'serve': start_server(); break;
		case 'help': print_HELP(); break;
        case 'templates': printTemplates(); break;
		default: newSketch();
	}
}

/**
 * Process arguments.
 *
 * @return {void}
 */
export function process_input() {
	
	try {
	
		const args = process.argv.slice(2);

        var command = (commands.includes(args[0])) ? args.shift() : '';
    
        const { values, positionals, tokens } = parseArgs({ args, options, tokens:true });
        
        process_options(values);
        execute(command);

	} catch (err) {
		console.error('Invalid input.', err);
	}
}
