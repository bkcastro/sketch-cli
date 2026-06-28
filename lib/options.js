/**
 * This file handles all of the options for the cli. The options variable is a singleton used to change and retrieve values. 
 */

/**
 * Singleton object to store options.
 */
var options = {
	'template': 'default',
	'iterate': false,
}

/**
 * Assign the variables to the options.
 *
 * @return {void}
 */
export function process_options(values) {
    
    for (const [key, value] of Object.entries(values)) {
        options[key] = value;
    }
}

/**
 * Return option value.
 *
 * @param {string} option
 * @return {string|number|boolean}
 */
export function getOption(option) {
    
    return options[option];
}
