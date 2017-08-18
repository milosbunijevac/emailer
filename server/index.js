var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var models = require('./mailfuncs.js');
var _ = require('lodash');

var helper = require('sendgrid').mail;

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
  console.log('The body of the axios call is: ', req.body);
  // console.log(req.body.to.split(',')[0].replace(/ /g,''));
  function arrayMaker (rbody, type) {
    var tonum = req.body[type].split(',');
    if(type === 'to') {
      type = 'Original';
    }
    var recips = tonum.map((value) => {
      return {address: {email: value.replace(/ /g,''),name: type + ' recipient'},substitution_data: {recipient_type: type}}
    })
    return recips;
  }
  var recipients1 = arrayMaker(req.body, 'to');
  var ccs = arrayMaker(req.body, 'cc');
  var bccs = arrayMaker(req.body, 'bcc');
  var transmission = {
    recipients: recipients1,
    cc: ccs,
    bcc: bccs,
    content: {
      from: {
        name: req.body.source,
        email: req.body.source
      },
      subject: req.body.subject,
      text: req.body.messageBody,
      html: `<p></p>`
    }
  };

  var fromEmail = new helper.Email(req.body.source);
  var toEmail = new helper.Email(req.body.to);
  var subject = req.body.subject;
  var content = new helper.Content('text/plain', req.body.messageBody)
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  var request = models.sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
  
  models.sparkPost(transmission, (err, data) => {
    if(err){ //If error, it will try SendGrid
      console.log('The error occured in the sparkpost mail send call: ', err);
      models.sendGrid(request, (err, data) => {
        if(err){
          console.log('This is the error for SendGrid');
        }
        console.log('The SendGrid email has been sent', data);
      })
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