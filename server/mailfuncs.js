var aws = require('aws-sdk');
var path = require('path');
var api = require('../sendgrid.js');
var sg = require('sendgrid')(api.SG_API_KEY);

aws.config.loadFromPath(path.join(__dirname, '../awsconfig.json'));

var ses = new aws.SES();

exports.emailSend = (params, cb) => {
  ses.sendEmail(params, (err, data) => {
    if(err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  })
}

exports.sendGrid = (params, cb) => {
  sg.API(params, (error, response) => {
    if (error) {
      cb(error, null);
    }
    cb(null, response);
  });
}

exports.sg = sg;