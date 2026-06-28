import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';
import chalk from 'chalk'
import figlet from 'figlet';
import { validSketchbook } from '../lib/files.js';

const ROOT_DIR = '.';
const PORT = 8000;
const __dirname = import.meta.dirname; 

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.doc': 'application/msword',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/x-font-ttf',
};

let tree_data;
let display_data;
var total_sketches = 0;
var title = figlet.textSync('Sketchbook', { horizontalLayout: 'full' });

function isNumberedFolder(name) {
	return /^\d+/.test(name);
}


function renderTree(relPath = '') {
		const fullPath = path.join(ROOT_DIR, relPath);

		const entries = fs.readdirSync(fullPath, { withFileTypes: true })
		.filter(e => e.isDirectory() && !e.name.startsWith('.') && isNumberedFolder(e.name))
		.sort((a, b) => a.name.localeCompare(b.name));
	
		total_sketches += entries.length;
		const childrenHTML = entries.map(entry => {
		            const childPath = path.join(relPath, entry.name);
		            return `
			                <li>
						<a target='_blank' href='/${childPath}/sketch/'
					         data-path='/${childPath}/sketch/'>${entry.name}/</a>

						<ul>
						${renderTree(childPath)}
						</ul>
					</li>
				  `;
		}).join('');

		return '<ul>' + childrenHTML + '</ul>';
}

function renderDisplay(relPath = '') {

		const fullPath = path.join(ROOT_DIR, relPath);
		var res = '';	
		const entries = fs.readdirSync(fullPath, { withFileTypes: true })
		.filter(e => e.isDirectory() && !e.name.startsWith('.') && isNumberedFolder(e.name))
		.sort((a, b) => a.name.localeCompare(b.name));

		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i];
			const childPath = path.join(relPath, entry.name);
            
            const sketch_files = fs.readdirSync(path.join(childPath, './sketch'));
            const regex = /^thumbnail\.[jpg|webp|png]+$/;
            const filter = sketch_files.filter(file => regex.test(file));
            const thumbnail = (filter.length) ? childPath + '/sketch/' + filter[0] : 'https://media.tithe.ly/images/picture.jpeg'
		    
			res += `
				<div class='card'>
					<img class='custom-img' src='${thumbnail}' width='300' height='300' alt=''>
					<p>title</p>
					<a target='_blank' href='/${childPath}/sketch/' data-path='/${childPath}/sketch/'>${childPath}</a>
				</div>
				`
			res += renderDisplay(childPath);
		}

		return res;
}

/**
 * Fetch the data for the server.
 *
 * @return {void}
 */
function getData() {
	total_sketches = 0;

	tree_data = renderTree();
	display_data = renderDisplay();
}

function render(file, data) {
	    let html = fs.readFileSync(file, 'utf-8');

	    Object.entries(data).forEach(([key, value]) => {
		            html = html.replaceAll(`{{${key}}}`, value);
		        });

	    return html;
}

const server = http.createServer((req, res) => {

	console.log(`${req.method} ${req.url}`);

	if (req.url == '/' && req.method == 'GET') {
		
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		getData();

		const html = render(path.join(__dirname, 'reference.html'), {
			title: title,
			tree: tree_data, 
			sketches: total_sketches
		});

		res.end(html);

		return;
	}

	if (req.url == '/display' && req.method == 'GET') {

		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		const html = render(path.join(__dirname, 'display.html'), {
			sketches: total_sketches,
			data: display_data
		});

		res.end(html);

		return;
	}


	// Pares URL
    	const parsedUrl = url.parse(req.url, true);

	// extract URL path
	// Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
	// e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
	// by limiting the path to current directory only
	const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
	let pathname = path.join(ROOT_DIR, sanitizePath);


	fs.exists(pathname, function (exist) {
		if(!exist) {
			// if the file is not found, return 404
			res.statusCode = 404;
			res.end(`File ${pathname} not found!`);
			return;
		}

		// if is a directory, then look for index.html
		if (fs.statSync(pathname).isDirectory()) {
			pathname += '/index.html';
		}

		// read file from file system
		fs.readFile(pathname, function(err, data){
			if(err){
				res.statusCode = 500;
				res.end(`Error getting the file: ${err}.`);
			} else {
				// based on the URL path, extract the file extention. e.g. .js, .doc, ...
				const ext = path.parse(pathname).ext;
				// if the file is found, set Content-type and send data
				res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
				res.end(data);
			}
		});
	});

});


/**
 * Start the server if the directory is a valid sketchbook.
 *
 * @return {void}
 */
export default function start_server() {
    
    if (validSketchbook()) {

        server.listen(PORT, () => {
            console.log(
                chalk.yellow('Server running on http://localhost:') + chalk.green(PORT)
            );
        });

    } else {
        console.log(chalk.red('Not a valid sketchbook directory.'));
    }
}

