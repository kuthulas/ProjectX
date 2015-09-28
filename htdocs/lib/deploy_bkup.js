function deploy(cxnid,type,tags,description,callback){
var jtags = [];
for(var t=0;t<tags.length;t++) jtags += "&tag"+t+"=" + tags[t];
var opt1 = "t"+ type + jtags;
var opt2 = "o"+ type +"& id="+ cxnid;
var regex = /#([^#]*)#/gi;  
var z = getme(opt1);
	z.complete(function (data) {
	data = jQuery.parseJSON(data['responseText']);
	var s2 = getme(opt2);
	s2.complete(function (d2) {
	d2 = jQuery.parseJSON(d2['responseText']); 
	$("#commands").append("<b>"+description+"</b><hr />");
		for(var i=0;i<data.length;i++){  
		var e; 
var cmd = data[i]['cmd'];
while (e = regex.exec(data[i]['cmd'])){
cmd = cmd.replace(e[0],d2[0][e[1]]);
}
$("#commands").append("<tr><td>"+ (i+1) +". </td><td>" + cmd + "</td></tr>");  
		}
$("#commands").append("<tr><td>&nbsp;</td></tr>");
callback(true);
	});
	}); 
document.getElementById("commands").style.display = 'inline';
}