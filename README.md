This project contains a couple samples that show how to upload a
file to S3 from node.

The first example consists of two files - urlmaker.js and upload-client.js.

The urlmaker.js file exposes an endpoint for generating a signed
url for upload to the embedded bucked using the key in the uri.

The upload-client.js makes a class to the urlmaker endpoint to get a signed
url to use for the upload, then uploads the file to s3 using the signed url. Note that the use of a signed url means the client does not need AWS credentials, the urlmaker has the credentials generating a url its clients can use.

The first example also works behind an http proxy.

The second example (node-upload.js) reads a file and puts it to an S3 bucket. This version now fully supports an HTTP proxy.


