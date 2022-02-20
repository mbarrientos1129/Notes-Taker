const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js');
//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('api', api);
app.use(express.static('public'));

// routes go here
//Default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
//Notes Page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//WildCard to primary index
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html')))

//Trail Code
// app.get('/api/notes', (req, res) => {
//   let allNotes = fs.readFileSync(path.join(__dirname, './db/db.json'));
//   allNotes = JSON.parse(allNotes)
//   res.json(allNotes)
// });

// app.post('/api/notes', (req, res) => {
//   console.log(req.body)
//   let allNotes = fs.readFileSync(path.join(__dirname, './db/db.json'));
//   allNotes = JSON.parse(allNotes)
//   res.json(allNotes)
// });

app.listen(PORT, () => console.log(`Listening on PORT: http://localhost:${PORT}`));