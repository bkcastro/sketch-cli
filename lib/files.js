import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import figlet from 'figlet';

/**
 * Returns the base directory.
 *
 * @return {String}
 */
export function getCurrentDirectoryBase() {
	return path.basename(process.cwd());
}
/**
 * Check if file or directory exists.
 *
 * @return {boolean}
 */
export function directoryExists(filePath) {
	return fs.existsSync(filePath);
}

/** 
 * Checks if there exists a valid .sketchbook directory.
 *
 * @returns {boolean}
 */
function validSketchbook() {

	return (
		directoryExists('.sketchbook')
		&&		
		directoryExists('.sketchbook/meta-data.json')
	);
}

/**
 * Return the items inside a directory.
 *
 * @param {String} directory_path
 * @return {String[]}
 */
export function listDirectory(directory_path) {

	return fs.readdirSync(directory_path);
}

/**
 * Prints informaiton of the current sketchbook directory it if is valid.
 *
 * @return {boolean}
 */
export async function printSketchbookInfo() {

	if (validSketchbook()) {
		try {
			const rawData = await fs.readFile('.sketchbook/meta-data.json', 'utf-8');
			const user = JSON.parse(rawData);

			console.log(
				chalk.red(
					figlet.textSync('Sketchbook', { horizontalLayout: 'full' })
				)
			);

			console.log(
				chalk.white(
					`
	Author: ${user.name}
	Created: ${user.date}
	Total Sketches: ${user.total_sketches}
					`
				)
			);

		} catch (error) {
			console.error('Error reading or parsing file:', error);
		}
	} else {
		console.log("This folder is not a valid sketchbook. Use the --init command to make one.");
	}
}

/**
 * Create a valid directory name for a sketch.
 *
 * @param {Number} x
 * @return {String}
 */
function createName(x) {

	var name = new String(x);
	while (name.length < 4) name = '0' + name;
	
	return name;
}

/**
 * Create a new sketch project.
 *
 * @param {String} dir 
 * @return {Boolean}
 */
function createSketch(name) {

	const new_dir = path.join(process.cwd(), name + '/sketch');

	//cp(template_dir, new_dir, callback);
    
    // Make the directories.
    try {

        if (!fs.existsSync(new_dir)) {
            fs.mkdirSync(new_dir, { recursive: true });
        }
    } catch(err) {
        console.log('Unable to create sketch');
        return false;
    }

    // Copy the template into the new directory created.
     

    console.log('Sketch created: ', new_dir);

    return true;
}

/** 
 * Handle 'new' command operations.
 * If no flags are added create a default sketch in the current working directory.
 * Else parse and apply flags.
 *
 * @return {void}
 */
export async function newSketch() {
    
    // Check the directory.
    // Create name.
	const regex = /^[0-9]{4}$/;
	const items = listDirectory("./").filter((str) => regex.test(str));
	const new_name = createName(items.length+1);
    
    createSketch(new_name);

}





