import fs from 'fs';
import path from 'path';
import { getTemplateURL } from '../templates/templates.js';
import { getOptionValue } from './options.js';
import Log from './log.js';

/**
 * Returns the base directory.
 *
 * @return {string}
 */
export function getCurrentDirectoryBase() {
	return path.basename(process.cwd());
}

/** 
 * Check if the current working directory is a valid sketchbook.
 *
 * @returns {boolean}
 */
export function validSketchbook(dir='./') {

	return (
		fs.existsSync(path.join(dir, '.sketchbook'))
		&&		
		fs.existsSync(path.join(dir, '.sketchbook/meta-data.json'))
	);
}

/**
 * Get user data.
 *
 * @return {object}
 */
export function getUser(dir='./') {

    const rawData = fs.readFileSync(path.join(dir, '.sketchbook/meta-data.json'), 'utf-8');
    const user = JSON.parse(rawData);

    return user;
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
 * Create a new sketch project from source.
 *
 * @param {string} sketchDir
 * @param {string} sourceDir
 * @return {void}
 */
export function createSketch(sketchDir, sourceDir) {

    fs.mkdirSync(sketchDir, { recursive: true });
    fs.cpSync(sourceDir, sketchDir, { recursive: true });
}

/**
 * Return a list of valid sketch directories.
 *
 * @return {string[]}
 */
export function listValidSketchDirectories(dir='./') {

	const REGEX = /^[0-9]{4}$/;
	const items = fs.readdirSync(dir).filter((str) => REGEX.test(str));
    return items;
}

/**
 * Return a valid sketch and iteration directory.
 *
 * @return {string[]}
 */
export function getValidSketchAndIterationDirectories() {

    const items = listValidSketchDirectories();
    const sketchDir = path.join(createName(items.length+1), './sketch');
    const iterationDir = path.join(items.at(-1) || '', './sketch');
     
    return [ sketchDir, iterationDir];
}

/** 
 * Handle 'new' command operations.
 *
 * @return {void}
 */
export async function newSketch() {
    
    const [sketchDir, iterationDir] = getValidSketchAndIterationDirectories();

    const iterate = getOptionValue('iterate');
    const templateName = getOptionValue('template'); 
    const templateDir = getTemplateURL(templateName);
    const sourceDir = iterate && iterationDir || templateDir; 

    if (fs.existsSync(sketchDir)) {
        return Log.error('Folder ' + sketchDir + ' already exist.');
    }

    if (iterate && !fs.existsSync(sourceDir)) {
        return Log.error('Folder ' + sourceDir + ' does not exist.');
    }
    
    createSketch(sketchDir, sourceDir);

    if (iterate) Log.success(`Sketch iteration created successfully: ${sketchDir}`); 
    else Log.success(`Sketch create successfully with template ${templateName}: ${sketchDir}`);
}

/**
 * Return initial user data in json.
 *
 * @param {string} author
 * @return {string}
 */
export function initialUser(author) {

    var metaData = {
        author: author,
        created: Date(),
        totalSketches: 0
    }

    return metaData; 
}

/**
 * Convert json to string.
 *
 * @param {json}
 * @return {string}
 */
export function jsonToString(json) {
    
    return JSON.stringify(json, null, 2);
}

/**
 * Initialize a sketchbook.
 *
 * @param {string} author
 * @return {void}
 */
export function initializeSketchbook(author) {

    try {
        const data = jsonToString(initialUser(author));   
        fs.mkdirSync('./.sketchbook');
        fs.writeFileSync('./.sketchbook/meta-data.json', data);
        Log.success(`New sketchbook created successfully good luck ${author}.`);

    } catch(error) {
        Log.error('Unable to initialize a sketchbook: ', error);
    }
}
