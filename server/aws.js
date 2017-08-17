var aws = require('aws-sdk');
var path = require('path');

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
