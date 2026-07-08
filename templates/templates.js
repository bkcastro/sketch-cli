import path from 'path';

const templates = {
    'default': {
        src: './default',
        description: 'Blank canvas.'
    },
    '3D': {
        src: './3D',
        description: 'Basic three.js scene.'
    }, 
    '2D_Camera': {
        src: './2D_Camera',
        description: 'Canvas with video camera background.'
    },
    '2D_Hand_Tracking': {
        src: './2D_Hand_Tracking',
        description: 'Canvas with video camera background and hand tracking support.'
    },
}

/**
 * Return template URL.
 *
 * @param {string} template
 * @return {string}
 */
export function getTemplateURL(template) {
    
    const project_directory = import.meta.dirname;
    const template_directory = templates[template].src; 

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
    
    var list = 'Templates 🛠️:\n';
    
    for (const key of Object.keys(templates)) {
        list += key + ': ' + templates[key].description + '\n';
    }

    return list;
}
