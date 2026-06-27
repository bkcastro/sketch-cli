/**
 * This file contians all the methods needed to reference a template.
 */

import chalk from 'chalk';

export const templates = {
    'default': './default',
    '2D': './2D',
    '2D_framed': './2D_framed',
}

/**
 * Print templates available.
 */
export function printTemplates() {
    console.log(chalk.green(Object.keys(templates).join(', ')));
}
