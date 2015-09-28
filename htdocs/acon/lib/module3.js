function remcxni(i){
	var cnn = getcon(i,delconn,delcon);

	var srctype = String(document.getElementById(cnn.sourceId).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	var tgttype = String(document.getElementById(cnn.targetId).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	var cpid = cnn.getOverlay("cpid").getLabel();
	var epz = cnn.endpoints;
	var cxnid = epz[0].getUuid() + epz[1].getUuid();
	if(srctype=="pgw" || tgttype=="pgw") {
	deploy(cxnid,"null","pgw",["dlttrnkgrpprofin","dlttrnkgrpin","dltinprofile"],"Incoming trunk - MML configuration set:",function(s1) {if(s1) deploy(cxnid,"null","pgw",["dltrtlist","dltrttrnk","dltsiprttrnkgrp","dlttrnkgrpprofout","dlttrnkgrpout","dltoutprofile"],"Outgoing trunk - MML configuration set:", function(s2){if(s2) remcxnii(cxnid,i) })});
	}
	else {remcxnii(cxnid,i);}
	//if(srctype=="sbc" || tgttype=="sbc") deploy(cxnid,"sbc",["start","describe","setvrf","settransport","setmyaddress","setmyport","setpeeraddress","setpeerip","setpeerport","setaccount","end"], "Adjacency command set:");
	//setTimeout(function() {remcxnii(cxnid,i);},500);
}
function remcxnii(cxnid,i){
var ccid = "delcxn" +"& id=" + cxnid;
	var y = getme(ccid); 
	y.complete(function (data) {
	if(i+1<delconn.length) {
	remcxni(i+1); 
	}
	else { 
	delconn = [];
	delcon = [];
	if(addconn.length>0){savecxni(0); ch++;}
	else { 
	$("#list").html("<a>Save successful!</a>"); 
	$("#list").fadeIn();
	$("#list").fadeOut(500, "linear");
	}
	}
	});
}			