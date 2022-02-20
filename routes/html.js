const mainPageRoute = require('express').Router();
const index = require('../public/index.html');

mainPageRoute.get('/', (res, req) => 
res.sendFile(path.join(__dirname, '/public/index.html')));

module.exports = mainPageRoute;