"use strict";

var AWS = require('aws-sdk');
var fs = require('fs');


AWS.config.update({region: 'us-east-1'});
AWS.config.loadFromPath('../config.json');

var httpProxy = process.env.http_proxy;
if(httpProxy !== undefined) {

  var HttpProxyAgent = require('https-proxy-agent');
  var proxyAgent = new HttpProxyAgent(httpProxy);
  AWS.config.httpOptions = { agent: proxyAgent };

} else {
  console.log("No proxy settings found");
}

fs.readFile("./image.jpg", function(error, data) {
	if(error) {
		return console.log("error reading file: " + error);
	}

	var s3 = new AWS.S3();
	var putParams = {
		Bucket: 'xt-iot-bucket',
		Key: 'foo',
		Body: data
	};

	console.log('put object');
	s3.putObject(putParams, function(err, data) {
		if(err) {
			console.log('error putting object');
			console.log(err);
		} else {
			console.log(data);
		}
	});
});
