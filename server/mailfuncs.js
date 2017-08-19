var path = require('path');
var apiSP = require('../sparkpost.js');
var SparkPost = require('sparkpost');
var client = new SparkPost(apiSP.SP_API_KEY);

exports.sparkPost = (params, cb) => {
  client.transmissions.send(params, (err, data) => {
    if(err) {
      cb(err, null);
    }
    cb(null, data);
  })
}