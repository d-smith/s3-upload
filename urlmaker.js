"use strict";

var app = require('express')();
var http = require('http').Server(app);

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
AWS.config.loadFromPath('../config.json');

var httpProxy = process.env.http_proxy;
if(httpProxy !== null) {
	console.log('set http proxy to ' + httpProxy);
	AWS.config.update({
	  httpOptions: {
	    proxy: httpProxy
	  }
	});
} else {
	console.log("No proxy settings found");
}

app.get('/uploadurl/:s3_object_name', function(req, res){
    var s3 = new AWS.S3();
    var s3_params = {
        Bucket: 'xt-iot-bucket',
        Key: req.param('s3_object_name')
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://xt-iot-bucket.s3.amazonaws.com/'+req.param('s3_object_name')
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

http.listen(3003, function(){
  console.log('listening on *:3003');
});
