var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var models = require('./aws.js');

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

app.post('/mailSendAWS', (req, res) => {
  console.log('The body of the axios call is: ', req.body);
  var parameters = {};
  models.emailSend(parameters, (err, data) => {
    if(err){
      console.log('The error occured in the aws mail send call: ', err);
    } else {
      console.log('The call got to the index.js: ', data);
      res.sendStatus(200);
    }
  })
  
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src', 'index.html'));
});

app.listen(port, () => {
  console.log('The server is listening on port: ', port);
});