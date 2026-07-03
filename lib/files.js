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
 * Return the items inside a directory.
 *
 * @param {string} directory_path
 * @return {string[]}
 */
export function listDirectory(directory_path) {

	return fs.readdirSync(directory_path);
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
 * Create a new sketch project.
 *
 * @param {string} name 
 * @return {boolean}
 */
function createSketch(dir, template_dir) {

    fs.mkdirSync(dir, { recursive: true });
    fs.cpSync(template_dir, dir, { recursive: true });
}

/**
 * Create a new iteration sketch.
 *
 * @param {string} dir 
 * @return {void}
 */
function createIterationSketch(dir, iteration_dir) {

    fs.mkdirSync(dir, { recursive: true });
    fs.cpSync(iteration_dir, dir, { recursive: true });
}

/**
 * Return a list of valid sketch directories.
 *
 * @return {string[]}
 */
export function listValidSketchDirectories(dir='./') {

	const regex = /^[0-9]{4}$/;
	const items = listDirectory(dir).filter((str) => regex.test(str));
    return items;
}

/**
 * Return a valid sketch and iteration directory name.
 *
 * @return {string[]}
 */
export function getValidSketchAndIterationDirectories() {

    const items = listValidSketchDirectories();
    const i_dir = path.join(items.at(-1) || '', './sketch');
    const s_dir = path.join(createName(items.length+1), './sketch');
    
    if (fs.existsSync(s_dir)) throw new Error('This file should not exist: ' + s_dir); 
    if (!fs.existsSync(i_dir)) throw new Error('This file should exist: ' + i_dir);
    
    return [ s_dir, i_dir];
}


/** 
 * Handle 'new' command operations.
 *
 * @return {void}
 */
export async function newSketch() {
    
    const [sketch_dir, iteration_dir] = getValidSketchAndIterationDirectories();

    const iterate = getOptionValue('iterate');
    const template_dir = getTemplateURL(getOptionValue('template'));

    if (iterate) {
        createIterationSketch(sketch_dir, iteration_dir);
    } else {
        createSketch(sketch_dir, template_dir);
    }
}

/**
 * Return initialized user json data.
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
 * Json to string.
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
