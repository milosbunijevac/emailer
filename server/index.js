var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var models = require('./mailfuncs.js');

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

app.post('/mailSend', (req, res) => {
  console.log('The body of the axios call is: ', req.body);
  if(req.body.bcc === ''){
    req.body.bcc = req.body.to;
  } 
  if (req.body.cc === '') {
    req.body.cc = req.body.to;
  } 
  if (req.body.subject === '') {
    req.body.subject = 'No subject';
  }
  if (req.body.source === '') {
    req.body.source = req.body.to;
  }
  if (req.body.messageBody === '') {
    req.body.messageBody = 'No body text has been entered';
  }
  var parameters = {
    Destination: {
      BccAddresses: [
        req.body.bcc,
      ],
      CcAddresses: [
        req.body.cc,
      ],
      ToAddresses: [
        req.body.to,
      ]
    },
    Message: {
      Body: {
        Html: {
          Data: req.body.messageBody,
          Charset: 'utf-8'
        },
        Text: {
          Data: req.body.messageBody,
          Charset: 'utf-8'
        }
      },
      Subject: {
        Data: req.body.subject,
        Charset: 'utf-8'
      }
    },
    Source: req.body.source
  };
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