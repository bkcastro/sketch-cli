import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

/**
 * Get user information via the command line.
 * 
 * @param {function} callback
 * @return {object}
 */
export function getUserInformation(callback) {

    const rl = readline.createInterface({ input, output });
    
    rl.question('Author: ', (answer) => {
        
        callback(answer);

        rl.close();
    });
}
