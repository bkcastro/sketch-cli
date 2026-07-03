import { validTemplate } from '../templates/templates.js';
import Log from './log.js';

/**
 * Singleton object to store option values.
 */
var optionsState = {
	'template': 'default',
	'iterate': false,
}

/** 
 * All options and their type.
 */ 
export const options = {
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
 * Test that values are correct.
 *
 * @return {boolean}
 */
function testOptionValues() {
    return validTemplate(optionsState["template"]);
}

/**
 * Apply the values to the options.
 * 
 * @param {object} values
 * @return {boolean}
 */
export function applyValuesToOptions(values) {
    
    for (const [key, value] of Object.entries(values)) {
        optionsState[key] = value;
    }
    
    if (!testOptionValues()) {
        Log.error('Invalid options.');
        return false;
    }

    return true;
}

/**
 * Return the value of the option.
 *
 * @param {string} option
 * @return {string|number|boolean}
 */
export function getOptionValue(option) {
    
    return optionsState[option];
}
