"use strict";

var http = require('http');
var request = require('request');
var fs = require('fs');

var uploadUrlOptions = {
	host: 'localhost',
	port: 3003,
	path: '/uploadurl/foo'
};


var putFile = function(s3url) {
	console.log('put file to ' + s3url);
	var buf = fs.readFileSync("./image.jpg");
	var options = {
		url: s3url,
		method: 'PUT',
		body: buf
	};
	
	request(options, function(err, response, body) {
		if(err) {
			console.log(err, err.stack);;
		} else {
			console.log("body returned: " + body);
		}
	});
}


var callback = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
    putFile(JSON.parse(str).signed_request);
  });
};

http.request(uploadUrlOptions, callback).end();
