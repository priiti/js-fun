'use strict';

const yargs = require('yargs');
const _ = require('lodash');
const notes = require('./notes');

const command = process.argv[2];
const argv = yargs.argv;

switch (command) {
    case 'add':
        notes.addNote(argv.title, argv.body);
        break;
    case 'list':
        notes.getAllNotes();
        break;
    case 'read':
        notes.getNote(argv.title);
        break;
    case 'remove':
        notes.removeNote(argv.title);
        break;
    default:
        console.log('Command not found!');
        break;
}