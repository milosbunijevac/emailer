var path = require('path');
var apiSG = require('../sendgrid.js');
var apiSP = require('../sparkpost.js');
var sg = require('sendgrid')(apiSG.SG_API_KEY);
var SparkPost = require('sparkpost');
var client = new SparkPost(apiSP.SP_API_KEY);

exports.sendGrid = (params, cb) => {
  sg.API(params, (error, response) => {
    if (error) {
      cb(error, null);
    }
    cb(null, response);
  });
}

exports.sparkPost = (params, cb) => {
  client.transmissions.send(params, (err, data) => {
    if(err) {
      cb(err, null);
    }
    cb(null, data);
  })
}

exports.sg = sg;