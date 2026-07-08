import chalk from 'chalk';
import HELP from './help.js';
import { getListOfTemplates } from '../templates/templates.js';

/**
 * Print sketchbook information.
 * 
 * @param {object} user
 * return {void}
 */
function printSketchbook(user) {
    
    console.log(
        chalk.white(
            `
    Author: ${user.author}
    Created: ${user.created}
    Total Sketches: ${user.totalSketches}
            `
        )
    );
}

/**
 * Singleton object used to print text to terminal.
 */
const Log = {
    success: (str) => console.log('✅ ' + chalk.green(str)),
    error: (str, err='') => console.log('❌ ' + chalk.red(str)),
    text: (str) => console.log(str),
    banner: (str) => console.log(chalk.red(str)),
    warning: (str) => console.log(chalk.yellow(str)),
    sketchbook: printSketchbook, 
    serve: (port) => console.log(chalk.yellow('Server running on http://localhost:') + chalk.green(port)),
    invalidSketchbook: () => console.log(chalk.red('This folder is not a valid sketchbook. Use the init command to make one.')),
    help: () => console.log(chalk.white(HELP)),
    templates: () => console.log(chalk.bold(chalk.blue(getListOfTemplates()))),
}

export default Log;
