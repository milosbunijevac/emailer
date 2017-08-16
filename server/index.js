var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('style'));
app.use(express.static('src'));
app.use(express.static('src/webdata'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src', 'index.html'));
});

app.listen(port, () => {
  console.log('The server is listening on port: ', port);
});