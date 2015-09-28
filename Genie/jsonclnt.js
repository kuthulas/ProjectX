var http = require('http');
var rparams = {
request:"AddProvider",
Name:"Hah"
};
rparams = JSON.stringify(rparams);

var headers = {
  'Content-Type': 'application/json',
  'Content-Length': rparams.length
};

var options = {
  host: 'localhost',
  port: 8888,
  path: '/',
  method: 'POST',
  headers: headers
};

var req = http.request(options, function(res) {
res.setEncoding('utf-8');
var rstring = '';
res.on('data', function(data) {
    rstring += data;
});

  res.on('end', function() {
    var robj = JSON.parse(rstring);
	console.log(robj);
  });
});

req.on('error', function(e) {
//console.log(e);
});
req.write(rparams);
req.end();