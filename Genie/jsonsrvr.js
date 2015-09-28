try{

var http = require('http');
var mysql      = require('mysql');

var server = http.createServer(function(req, res) {
        res.writeHead(200, {'Content-Type': 'application/json'});
	    var body = '';
        req.on('data', function (data) {body += data;});
        req.on('end', function () {processreq(res,body);});
});
server.listen(8888, "localhost");
console.log('MAAS JSON server running at http://127.0.0.1:8888/');

var processreq = function(res,body) {
	var jsons = new Array();
    var rob = JSON.parse(body);
	var tables = ['PT','CSS','CSSPT','TP','PH'];
	for(var i = 0;i<tables.length;i++)
	{
    q = "SELECT * FROM " + tables[i] +" WHERE transaction=\""+rob.request+"\"";
	console.log('Query' + q);
	
    q4me(q, function(result){
		var ind = 1;
        var dat = poison(result,rob);
		console.log('dat ==>' + JSON.stringify(dat));
		jsons.push(dat);
		console.log('jsons' + JSON.stringify(jsons));
		if(jsons.length==5)
		{
		res.write(JSON.stringify(jsons));
		res.end();
		}
    	});
		}
}

var q4me = function(q,callback){
var connection = mysql.createConnection({host:'localhost',user:'root',database:'projectx'});
    connection.connect();
    connection.query(q, function(err, rows, fields) {if (err) throw err;callback(rows);});
    connection.end();
}

function poison(a,b){
var regex = /#([^#]*)#/gi; 
		for(var i=0;i<a.length;i++){  
		var obj = a[i];
		for(var k in obj){
		while (e = regex.exec(obj[k])){
		      obj[k] = obj[k].replace(e[0],b[e[1]]);
			  //console.log(obj[k]);
		}
		}
		a[i]=obj;
}
return a;
}

}catch (err) {console.log(err)}