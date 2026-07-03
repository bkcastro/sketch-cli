import path from 'path';

const templates = {
    'default': './default',
}

/**
 * Return template URL.
 *
 * @param {string} template
 * @return {string}
 */
export function getTemplateURL(template) {
    
    const project_directory = import.meta.dirname;
    const template_directory = templates[template]; 

    return path.join(project_directory, template_directory);
}

/**
 * Return true if templates exists.
 *
 * @param {string} template
 * @return {boolean}
 */
export function validTemplate(template) {
    return Object.hasOwn(templates, template);
}

/**
 * Return a list of templates.
 *
 * @return {string}
 */
export function getListOfTemplates() {

    return Object.keys(templates).join(', '); 
}
