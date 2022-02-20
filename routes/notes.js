const express = require('express');
const notesRoute = require('express').Router();
const notes = require('../db/db.json')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

notesRoute.use(express.json());
notesRoute.use(express.urlencoded({ extended: true }));

notesRoute.get('/', (req, res) => {
    console.info(`${req.method} request received to read notes.`)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            return res.json(JSON.parse(data))
        }
    })
});

notesRoute.post('/', (req, res) => {

    console.info(`${req.method} add note request received.`);

    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parseNotes = JSON.parse(data);
                parseNotes.push(newNote);
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parseNotes, null, 4),
                    (Err) =>
                        Err
                            ? console.error(Err)
                            : console.info('Successully added note!')
                );
            }
        });
        const response = {
            status: 'Success',
            body: newNote,
        };
        res.status(201).json(response);
    } else {
        res.status(500).json('Cannot post notes.');
        return response
    }
});


module.exports = notesRoute;