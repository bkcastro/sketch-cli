import { beforeEach, afterEach, before, after, describe, it} from 'node:test';
import fs from 'fs';
import { join } from 'path';
import assert from 'node:assert/strict';
import Log from '../lib/log.js';
import { createSketch, newSketch, getValidSketchAndIterationDirectories, listValidSketchDirectories, createName, validSketchbook, initialUser, jsonToString, getUser } from '../lib/files.js';

describe('Who:', async (t) => { 
    
    const testDir = './test_who';

    before(() => {

        fs.mkdirSync(testDir); 
    }); 

    after(() => {

        fs.rmSync(testDir, { recursive: true });
    });

    await it('Invalid folder.', async () => {

        const res = validSketchbook(testDir); 
        assert.equal(res, false);
    });

    await it('Valid folder.', { todo: false }, async  () => {
        
        const userData = initialUser('Brandon Castro');
        const userDataString = jsonToString(userData);
        const testSketchbookDir = join(testDir, '.sketchbook');
        const testMetaDataDir = join(testDir, '.sketchbook/meta-data.json');
        
        fs.mkdirSync(testSketchbookDir);
        fs.writeFileSync(testMetaDataDir, userDataString);

        const data = getUser(testDir);

        assert.deepStrictEqual(data, userData);

    });

});

describe('Init: ', { todo: true }, async () => {

    const testDir = './test_init';

    before(() => {

        fs.mkdirSync(testDir); 
    }); 

    after(() => {

        fs.rmSync(testDir, { recursive: true });
    });

    await it('Valid folder', { todo: false }, async  () => {
        
        fs.mkdirSync(join(testDir, '.sketchbook'));
        fs.writeFileSync(join(testDir, '.sketchbook/meta-data.json'), '');

        const res = validSketchbook(testDir);

        assert.ok(res);

    });

    await it('Invalid folder', async () => {
        
        fs.rmSync(join(testDir, '.sketchbook'), { recursive: true });

        const res = validSketchbook(testDir);

        assert.ok(res == false);

    });

});

describe('Sketch: ', { todo: false }, async (t) => {

    const testDir = './test_sketch';

    beforeEach(() => {

        fs.mkdirSync(testDir);
    });

    afterEach(() => {

        fs.rmSync(testDir, { recursive: true });
    });

    await it('Create valid sketch names.', () => {

        const nums = [1,2,3,4,5,6,7,8,9,10];
        const answer = [
            '0001',
            '0002',
            '0003',
            '0004',
            '0005',
            '0006',
            '0007',
            '0008',
            '0009',
            '0010'
        ]

        var temp = new Array();

        for (const n of nums) temp.push(createName(n));

        assert.deepStrictEqual(answer, temp);

    });

    const directories = [
        '0001',
        '0002',
        '0003'
    ];

    await it('List valid sketch directories should be empty.', () => {


        const items = listValidSketchDirectories(testDir);
        
        assert.deepStrictEqual(items, []);

    });

    await it('List valid sketch directories should match directories array.', () => {

        directories.forEach((dir) => fs.mkdirSync(join(testDir, dir)));

        const items = listValidSketchDirectories(testDir);

        assert.deepStrictEqual(items, directories)
    });

    await it ('Function createSketch should create a valid sketch folder.', () => {

        const sourceDir = join(testDir, './sketch');
        const sketchDir = join(testDir, './0002/sketch');

        fs.mkdirSync(sourceDir, { recursive: true });

        createSketch(sketchDir, sourceDir); 
        
        const fileExist = fs.existsSync(sketchDir);

        assert.ok(fileExist, true); 
    });

    await it ('Function createSketch should copy source sketch directory.', () => {

        const sourceDir = join(testDir, './0001/sketch/');
        const sourceItem = join(testDir, './0001/sketch/hi');
        const sketchDir = join(testDir,'./0002/sketch');

        fs.mkdirSync(sourceDir, { recursive: true });
        fs.mkdirSync(sourceItem);

        createSketch(sketchDir, sourceDir); 

        const items = fs.readdirSync(sketchDir);
        const sourceItems = fs.readdirSync(sourceDir);

        assert.deepStrictEqual(items, sourceItems); 
    });

});
