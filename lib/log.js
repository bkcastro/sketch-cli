import chalk from 'chalk';
import figlet from 'figlet';
import HELP from './help.js';
import { getListOfTemplates } from '../templates/templates.js';

/**
 * Print user.
 * 
 * @param {object} user
 * return {void}
 */
function printUser(user) {
    
    console.log(
        chalk.white(
            `
Author: ${user.name}
Created: ${user.date}
Total Sketches: ${user.totalSketches}
            `
        )
    );
}

/** 
 * Print bannner.
 *
 * @return {void}
 */
function printBanner() {

    console.log(
        chalk.red(
            figlet.textSync('Sketchbook', { horizontalLayout: 'full' })
        )
    );
}

/**
 * Print sketchbook.
 * 
 * @param {object} user
 * @return {boolean}
 */
function printSketchbook(user) {

    printBanner();
    printUser(user);
}

/**
 * Singleton object used to print text to terminal.
 */
const Log = {
    success: (str) => console.log('✅ ' + chalk.green(str)),
    error: (str, err='') => console.log('❌ ' + chalk.red(str) + '\n' + chalk.red(err)),
    text: (str) => console.log(str),
    banner: (str) => console.log(chalk.red(str)),
    warning: (str) => console.log(chalk.yellow(str)),
    sketchbook: printSketchbook, 
    serve: (port) => console.log(chalk.yellow('Server running on http://localhost:') + chalk.green(port)),
    invalidSketchbook: () => console.log(chalk.red('This folder is not a valid sketchbook. Use the init command to make one.')),
    help: () => console.log(chalk.white(HELP)),
    templates: () => console.log('🛠️ ' + chalk.blue(getListOfTemplates())),
}

export default Log;
