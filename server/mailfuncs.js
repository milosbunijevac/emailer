var aws = require('aws-sdk');
var path = require('path');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

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
  sg.API(request, (error, response) => {
    if (error) {
      console.log('Error response received');
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
}
