import clear from 'clear'
import chalk from 'chalk'
import { parseArgs } from 'node:util';
import { printSketchbookInfo } from './files.js'
import start_server from '../server/server.js'

/** 
 * Help information.
 */
const HELP = `

USAGE: 
	
	$ sketch [COMMAND] [OPTIONS] [ARGUMENTS...]

DESCRIPTION: 
	
	Sketch is a cli tool that helps generate ideas, develop them, and bring them to life. 
	
COMMANDS: 
	
	--who,-w			Print information of the current sketchbook.
	--init				Initalize a new sketchbook.
	--make,-m			Make a new sketch.
	--iterate,-i		Iterate on a sketch.
	--serve,-s			Spin up a file server to view sketchs.
	--help,-h			Print this help page.

OPTIONS: 

`

/** 
 * All options for the CLI tool.
 */ 
const options = {
	who: {
		type: 'boolean',
		short: 'w',
	},
	init: {
		type: 'boolean',
	},
	make: {
		type: 'boolean',
		short: 'm'
	},
	template: {
		type: 'string',
		short: 't',
	},
	iterate: {
		type: 'boolean',
		short: 'i',
	},
	serve: {
		type: 'boolean',
		short: 's',
	},
	help: {
		type: 'boolean',
		short: 'h',
	}
};

/**
 * Finite state machine.
 */
const states = {
	who: {},
	init: {},
	make: { template: {} },
	template: { make: {} },
	iterate: {},
	serve: {},
	help: {},
}

/**
 * Test tokens are in the correct order.
 * 
 * @param {object[]}
 * @return {boolean}
 */
function test_tokens(tokens) {
	// Test tokens.
	var state = states;
	for (const token of tokens) {
		if (token.name in state) {
			state = state[token.name];
		} else {
			console.error('Invalid token order.');
			return false;
		}
	}

	return true;
}

/** Process tokens.
 *
 * @param {objects[]}
 * @return {void}
 */
function process_tokens(tokens) {

	for (const token of tokens) {

		switch(token.name) {
			case 'who': who(); break;
			case 'init': init(); break;
			case 'make': make(); break;
			case 'iterate': iterate(); break;
			case 'serve': serve(); break;
			case 'help': help(); break;
			default:
		}
	}
}

/**
 * Process command arguments.
 *
 * @param {string[]} - The arguments.
 * @return {void}
 */
export function process_input() {
	
	try {
		
		const { values, positionals, tokens } = parseArgs({options, tokens: true});
		
		if (test_tokens(tokens)) {
			process_tokens(tokens);
		} 

	} catch (err) {
		console.error('Invalid input.', err);
	}
}

/**
 * Prints the author of the sketchbook if it exists.
 *
 * @return {void}
 */
function who() {
	printSketchbookInfo();
}

/**
 * Creates a sketchbook object.
 *
 * @return {void}
 */
function init() {
	initSketchbook();
}

/**
 * Makes a new sketch.
 *
 * @return {void}
 */
function make() {
	makeSketch();
}

/*
 * Makes a copy of a sketch.
 *
 * @return {void}
 */
function iterate() {
	iterateSketch();
}

/**
 * Starts the server.
 *
 * @return {void}
 */
function serve() {
	start_server() 
}

/**
 * Prints the help page.
 *
 * @return {void}
 */
function help() {
	console.log(chalk.yellow(HELP));
}

