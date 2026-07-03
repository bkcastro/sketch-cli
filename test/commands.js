import { test, before, after } from 'node:test';
import fs from 'fs';
import { join } from 'path';
import assert from 'node:assert/strict';
import Log from '../lib/log.js';
import { getValidSketchAndIterationDirectories, listValidSketchDirectories, createName, validSketchbook, initialUser, jsonToString, getUser } from '../lib/files.js';

test('Who:', async (t) => { 
    
    let testDir;

    before(() => {
    
        fs.mkdirSync('./test_who'); 
        testDir = './test_who';
    }); 

    after(() => {

        fs.rmSync('./test_who', { recursive: true });
    });

    await t.test('Invalid folder.', async () => {

        const res = validSketchbook(testDir); 
        assert.equal(res, false);
    });

    await t.test('Valid folder.', { todo: false }, async  () => {
        
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

test('Init: ', { todo: true }, async (t) => {

    await t.test('Invalid folder.', async () => {});

    await t.test('Valid folder.', { todo: false }, async  () => {});

});

test('Sketch: ', { todo: false }, async (t) => {

    const test_dir = './test_sketch';

    before(() => {

        fs.mkdirSync(test_dir);
    });

    after(() => {

        fs.rmSync(test_dir, { recursive: true });
    });

    await t.test('Create valid sketch names.', () => {

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

    await t.test('List valid sketch directories.', () => {

        const directories = [
            '0001',
            '0002',
            '0003'
        ];

        before(() => {
            directories.forEach((dir) => fs.mkdirSync(path.join(test_dir, dir)));
        });
        
        after(() => {
              directories.forEach((dir) => fs.rmSync(path.join(test_dir, dir)));
        });
        
        const items = listValidSketchDirectories(test_dir);
        
        assert.deepStrictEqual(items, directories);

    });
});
