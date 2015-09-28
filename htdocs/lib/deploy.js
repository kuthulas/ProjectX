function deploy(cxnid,ocom,type,tags,description,callback){
var jtags = [];
for(var t=0;t<tags.length;t++) jtags += "&tag"+t+"=" + tags[t];
var opt1 = "t"+ type + jtags;
var opt2 = "o"+ type +"& id="+ cxnid; 
var cmds = [];
var z = getme(opt1);
	z.complete(function (data) {
	data = jQuery.parseJSON(data['responseText']);
if(ocom=="null"){ 
	var s2 = getme(opt2);
	s2.complete(function (d2) {
	d2 = jQuery.parseJSON(d2['responseText']); 
	$("#commands").append("<b>"+description+"</b><hr />");
	cmds = deploy2(data,d2);
	cmdisplay(cmds);
	});
	}
else {
var d2 = [];
d2[0] = [];
$.each(ocom.split('&'), function (index, elem) {
   var vals = elem.split('=');
   d2[0][vals[0]] = vals[1];
});
cmds = deploy2(data,d2);
var s2 = getme(opt2);
	s2.complete(function (d2) {
	d3 = jQuery.parseJSON(d2['responseText']); 
	$("#commands").append("<b>"+description+"</b><hr />");
	cmds = deploy2(cmds,d3);
	cmdisplay(cmds);
	});
	}
callback(true);
	}); 
document.getElementById("commands").style.display = 'inline';
}

function deploy2(data,d2){
var cmds = [];
var regex = /#([^#]*)#/gi; 
		for(var i=0;i<data.length;i++){  
		var e; 
var cmd = data[i]['cmd'];
while (e = regex.exec(data[i]['cmd'])){
if(d2[0][e[1]]!==undefined) cmd = cmd.replace(e[0],d2[0][e[1]]);
}
cmds[i] = []; 
cmds[i]['cmd'] = cmd;
		}
return cmds;
}

function cmdisplay(cmds){
for(var i=0;i<cmds.length;i++){
$("#commands").append("<tr><td>"+ (i+1) +". </td><td>" + cmds[i]['cmd'] + "</td></tr>"); 
}
$("#commands").append("<tr><td>&nbsp;</td></tr>"); 
}