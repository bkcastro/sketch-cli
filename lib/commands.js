import { getOptionValue } from './options.js';
import { getUser, initializeSketchbook, validSketchbook, newSketch } from './files.js';
import { getUserInformation } from './input.js';
import startServer from '../server/server.js';
import Log from './log.js';

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
 * Check if command exists. 
 *
 * @param {string}
 * @return {boolean}
 */
export function validCommand(command) {
    return commands.includes(command);
}

/**
 * Run the command.
 *
 * @param {string} command
 * @return {void}
 */
export function runCommand(command) {

    switch(command) {
        case 'who': who(); break;
        case 'init': init(); break;
        case 'serve': serve(); break;
        case 'help': help(); break;
        case 'templates': templates(); break;
        default: sketch();
    }
}

/**
 * Print sketchbook information. 
 *
 * return {void}
 */
export function who() {
    
	if (!validSketchbook()) return Log.invalidSketchbook();

    const user = getUser();
    Log.sketchbook(user);
}

/**
 * Initalize a new sketchbook.
 *
 * @return {void}
 */
export function init() {

    if (validSketchbook()) return Log.error('Directory is already a valid sketchbook.'); 

    getUserInformation(initializeSketchbook);
}

/**
 * Start the server.
 *
 * @return {void}
 */
export function serve() {
    
    if (!validSketchbook()) return Log.invalidSketchbook(); 

    startServer();
}

/**
 * Print the help text.
 *
 * @return {void}
 */
export function help() { Log.help(); }

/**
 * Print the templates.
 *
 * @return {void}.
 */
export function templates() { Log.templates(); }

/**
 * Make a new sketch.
 *
 * @return {void}.
 */
export function sketch() {
    newSketch();
}
