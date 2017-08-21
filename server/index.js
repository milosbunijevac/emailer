var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var models = require('./mailfuncs.js');
var _ = require('lodash');
var apiSG = require('../sendgrid.js');
var sg = require('sendgrid')(apiSG.SG_API_KEY);

var PORT = process.env.PORT || 3000;

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
 
  req.body.source = 'MB85Photography@mb85.net';
  function arrayMaker (rbody, type) {
    var tonum = req.body[type].split(',');
    if(type === 'to') {
      type = 'Original';
    }
    var recips = tonum.map((value) => {
      return {address: {email: value.replace(/ /g,''),name: value.replace(/ /g,'')},substitution_data: {recipient_type: type}}
    })
    return recips;
  }
  var recipients1 = arrayMaker(req.body, 'to');
  var ccs = arrayMaker(req.body, 'cc');
  var bccs = arrayMaker(req.body, 'bcc');

  var transmission = {
    recipients: recipients1,
    content: {
      from: {
        name: req.body.source,
        email: req.body.source
      },
      subject: req.body.subject,
      text: req.body.messageBody,
      html: req.body.messageBody
    }
  };

  if(ccs[0].address.email !== ''){
    transmission['cc'] = ccs;
  }
  if(bccs[0].address.email !== ''){
    transmission['bcc'] = bccs;
  }

  function sendInfo() {
    
    function arrayMaker (rbody, type) {
      var tonum = req.body[type].split(',');
      var recips = tonum.map((value) => {
        return {email: value}
      })
      return recips;
    }

    var to1 = arrayMaker(req.body, 'to')
    var cc1 = arrayMaker(req.body, 'cc')
    var bcc1 = arrayMaker(req.body, 'bcc')

    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: {
        personalizations: [
          {
            to: to1,
            subject: req.body.subject
          }
        ],
        from: {
          email: 'MB85Photography@mb85.net'
        },
        content: [
          {
            type: 'text/plain',
            value: req.body.messageBody
          }
        ]
      }
    });

    if(cc1[0].email !== ''){
      request.body.personalizations[0]['cc'] = cc1
    }

    if(bcc1[0].email !== ''){
      request.body.personalizations[0]['bcc'] = bcc1
    }

    return request
  }

  function sendGrid(toSend) {

    sg.API(sendInfo(), (error, response) => {
      if(error){
        console.log(error);
      }
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
      res.sendStatus(200);
    })
  }
  
  models.sparkPost(transmission, (err, data) => {
    if(err){ //If error, it will try SendGrid
      console.log('The error occured in the sparkpost mail send call: ', err);
      console.log('Using SendGrid instead')
      sendGrid(sendInfo())
    } else { //Sent with SparkPost
      console.log('The SparkPost call got to the index.js: ', data);
      res.sendStatus(200);
    }
  })
  
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src', 'index.html'));
});

app.listen(PORT, () => {
  console.log('The server is listening on port: ', PORT);
}); 