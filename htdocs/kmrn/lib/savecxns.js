function savecxni(i){
	var acxn = addcon[i];
	acxn.setPaintStyle(detect);
	var srcid = acxn.sourceId;
	var tgtid = acxn.targetId;
	
	var tag1 = String(document.getElementById(srcid).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	var tid1=srcid.replace(tag1,"");
	
	var tag2 = String(document.getElementById(tgtid).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	var tid2=tgtid.replace(tag2,"");
    
	var so = "savecxn" +
	"& src="+ srcid +
	"& tgt="+ tgtid +
	"& type="+ tag1+"-"+tag2+
	"& tag1="+ tag1 +
	"& tag2="+ tag2 +
	"& tid1="+ tid1 +
	"& tid2="+ tid2;
	
	var x = getme(so);
	x.complete(function (data) {

if(i+1<addcon.length) {
savecxni(i+1);
} 
else {
addconn = [];
addcon = [];
$("#appstatus").html("<a>Save successful!</a>");
acxn.setPaintStyle(connectorPaintStyle);
	$("#appstatus").fadeIn();
	$("#appstatus").fadeOut(500, "linear");
}
	});
}