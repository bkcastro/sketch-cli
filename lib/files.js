import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import figlet from 'figlet';
import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { getTemplateURL } from '../templates/templates.js';
import { getOption } from './options.js';

/**
 * Returns the base directory.
 *
 * @return {string}
 */
export function getCurrentDirectoryBase() {
	return path.basename(process.cwd());
}

/** 
 * Checks if there exists a valid .sketchbook directory.
 *
 * @returns {boolean}
 */
export function validSketchbook() {

	return (
		fs.existsSync('.sketchbook')
		&&		
		fs.existsSync('.sketchbook/meta-data.json')
	);
}

/**
 * Return the items inside a directory.
 *
 * @param {string} directory_path
 * @return {string[]}
 */
export function listDirectory(directory_path) {

	return fs.readdirSync(directory_path);
}

/**
 * Prints informaiton of the current sketchbook directory.
 *
 * @return {boolean}
 */
export async function printSketchbookInfo() {

	if (validSketchbook()) {
		try {
			const rawData = fs.readFileSync('.sketchbook/meta-data.json', 'utf-8');
			const user = JSON.parse(rawData);

			console.log(
				chalk.red(
					figlet.textSync('Sketchbook', { horizontalLayout: 'full' })
				)
			);

			console.log(
				chalk.white(
					`
	Author: ${user.author}
	Created: ${user.created}
					`
				)
			);

		} catch (err) {
			console.log(chalk.red('Error reading or parsing file.', err));
		}
	} else {
		console.log(chalk.yellow("This folder is not a valid sketchbook. Use the init command to make one."));
	}
}

/**
 * Create a valid directory name for a sketch.
 *
 * @param {number} x
 * @return {string}
 */
export function createName(x) {

	var name = new String(x);
	while (name.length < 4) name = '0' + name;
	
	return name;
}

/**
 * Create a new sketch project.
 *
 * @param {string} name 
 * @return {boolean}
 */
function createSketch(dir) {

    try {
	
        if (!fs.existsSync(dir)) {

            const template_dir = getTemplateURL(getOption('template'));
            if (fs.existsSync(template_dir)) {

                fs.mkdirSync(dir, { recursive: true });
                fs.cpSync(template_dir, dir, { recursive: true });
                console.log(chalk.green('Sketch created: ', dir));
            } else {
                throw new Error(`Template source files missing.`);
            }
        } else {
            throw new Error('Unable to create sketch due to conflicting directories.');
        }
    } catch(err) {
        console.log(chalk.red(err));
    }
}

/**
 * Create a new iteration sketch.
 *
 * @param {string} dir 
 * @return {void}
 */
function createIterationSketch(dir, iteration_dir) {
    
    try {

	if (!fs.existsSync(dir)) {
		if (fs.existsSync(iteration_dir)) {

		    fs.mkdirSync(dir, { recursive: true });
		    fs.cpSync(iteration_dir, dir, { recursive: true });

		    console.log(chalk.green('Iteration created: ', dir));
		} else {
		    console.log(chalk.red(`Unable to iteate due to missing ${iteration_dir} direcotry.`));
		}
	} else {
		throw new Error('Unable to create sketch due to conflicting directories.');
	}
    } catch(err) {
        console.log('Unable to iterate sketch.');
    }
}

/** 
 * Handle 'new' command operations.
 *
 * @return {void}
 */
export async function newSketch() {

	// Check the directory.
	// Create name.
	const regex = /^[0-9]{4}$/;
	const items = listDirectory("./").filter((str) => regex.test(str));
    const iteration_name = (items.length) ? createName(items.length) : '';
    const iteration_dir = path.join(iteration_name, './sketch');
	const name = createName(items.length+1);
    const new_dir = path.join(name, './sketch');
    
    const iterate = getOption('iterate');

    if (iterate) {
        createIterationSketch(new_dir, iteration_dir);
    } else {
        createSketch(new_dir);
    }
}

/**
 * Initalize a sketchbook.
 *
 * @return {void}
 */
export function initSketchbook() {

    if (!validSketchbook()) {
        
        try {
            // Get user name. 
            var author = ''; 
            const date = new Date();
            const date_string = date.toDateString();
            const rl = readline.createInterface({ input, output });
            
            rl.question('Author: ', (answer) => {
                author = answer;
                // Create the folder ./sketchbook
                // Create the file ./sketchbook/meta-data.json with data in it.
                fs.mkdirSync('./.sketchbook');
                fs.writeFileSync('./.sketchbook/meta-data.json', 
`{
    "author": "${author}",
    "created": "${date_string}"
}`
                );

                console.log(chalk.green(`New sketchbook created successfully good luck ${author}.`));

                rl.close();
            });

        } catch(err) {
            console.log(chalk.red(err));
        }

    } else {
        console.log(chalk.red('Directory is already a valid sketchbook.'));
    }
}
