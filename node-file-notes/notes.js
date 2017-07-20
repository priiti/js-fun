'use strict';

const fs = require('fs');
const readline = require('readline');
const log = console.log;
const assert = require('assert');

const fileLineReader = title => {
    return new Promise((resolve, reject) => {
        let data = [];
        const lineReader = readline.createInterface({
            input: fs.createReadStream('notes.txt', err => assert.ifError(reject(err)))
        });

        lineReader
            .on('line', line => {
                data.push(line);
            })
            .on('close', () => {
                let note, index = undefined;
                data.forEach((n, i) => {
                    let temp = n.split(' Body:');
                    if (temp[0].includes(title)) {
                        index = i;
                    }
                });
                const noteData = {
                    index,
                    data: data[index]
                };
                resolve(noteData);
            });
    });
}

exports.addNote = (title, body) => {
    const data = `Title: ${title} Body: ${body}\n`;
    fs.appendFile('notes.txt', data, err => assert.ifError(err));
};

exports.getAllNotes = () => {
    fs.readFile('notes.txt', 'utf8', (err, data) => {
        assert.ifError(err);
        log(data);
    });
};

exports.getNote = async title => {
    try {
        const noteData = await fileLineReader(title);
        noteData.index === undefined ? log('Note not found!') : log(noteData.data);
    } catch (err) {
        assert.ifError(err);
    }
};

exports.removeNote = async title => {
    try {
        let data = [];
        const { index } = await fileLineReader(title);
        const lineReader = readline.createInterface({
            input: fs.createReadStream('notes.txt', err => {
                assert.ifError(err);
            })
        });

        lineReader
            .on('line', line => {
                data.push(line);
            })
            .on('close', () => {
                if (index === undefined) {
                    log('Note not found!');
                    process.exit(0);
                }
                fs.writeFile('notes.txt', '', err => assert.ifError(err));
                data.splice(index, 1);
                data.map(v => v + '\n').forEach(note => fs.appendFile('notes.txt', note, err => assert.ifError(err)));
            });
    } catch (err) {
        assert.ifError(err);
    }
};