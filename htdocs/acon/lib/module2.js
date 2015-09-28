function savecxni(i){
	var acxn = getcon(i,addconn,addcon);
	acxn.setPaintStyle(detect);
	var srcid = acxn.sourceId;
	var tgtid = acxn.targetId;
	var srctype = String(document.getElementById(srcid).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	var tgttype = String(document.getElementById(tgtid).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	var eps = acxn.endpoints;

	if(srctype=="country"){
	var label1 = acxn.getOverlay("cpid").getLabel();
	cpid = label1;
	var srcepid =  srcid;
	var tgtepid =  tgtid;
	}
	else{
	cpid = acxn.getOverlay("cpid").getLabel();;
	var srcepid =  eps[0].getUuid();
	var tgtepid =  eps[1].getUuid();
	}
	if(srctype=="sbc" || tgttype=="sbc") var vrfip = acxn.getOverlay("vrf").getLabel();
	if(srctype=="pgw" || tgttype=="pgw") var profile = acxn.getOverlay("profile").getLabel();
	var cxnid = eps[0].getUuid() + eps[1].getUuid();

	if(srctype=="country" || tgttype=="country") {
							cpid = label1;
							srcepid = srcid;
							tgtepid = tgtid;
	}
	
	var sop = [];
	var las = acxn.overlays;
	for(var mt=2;mt<las.length;mt++)sop+= "& "+las[mt].id+"label="+acxn.getOverlay(las[mt].id).getLabel();

	var so = "savecxn" +
	"& cpid="+ cpid +
	"& id="+ cxnid +
	"& src="+ srcid +
	"& tgt="+ tgtid + sop +
	"& srcepid="+ srcepid +
	"& tgtepid="+ tgtepid +
	"& type="+ srctype+"-"+tgttype;
	
	var x = getme(so);
	x.complete(function (data) {
	switch (srctype+tgttype) {
					case "pgwsbc":
						var trnkgrpin = "(select ipttrnkgrpin from globals)";
						var trnkgrpout = "(select ipttrnkgrpout from globals)";
						var svc = "(select svc from globals)";
						var sipprofile = profile;
						var distrib = "OFF"
						var mgcdomain = "(select pipa from inv where name=\""+srcid+"\")";
						var dest = vrfip.split(":");
						var destination = dest[1];
						var portin = $("#portbox"+srcepid).val();
						var portout = $("#portbox"+tgtepid).val();
						var rttrnkname = "( CONCAT((select rtpref from globals),\"" + cpid + "\"))";
						var rtlistname = "( CONCAT((select rtlistpref from globals),\"" + cpid + "\"))";
						
						if(howmanyocc(srcepid,excxnz,1)>0 || howmanyocc(srcepid, addcon,0)>1 || howmanyocc(srcepid, eycxnz,0)>0) pgwcombo("nocountry",cxnid,trnkgrpin,trnkgrpout,svc,sipprofile,distrib,mgcdomain,destination,portin,portout,rttrnkname,rtlistname,cpid,0);
						else pgwcombo("nocountry",cxnid,trnkgrpin,trnkgrpout,svc,sipprofile,distrib,mgcdomain,destination,portin,portout,rttrnkname,rtlistname,cpid,1);
						 
						var vrf = dest[0];
						var adjname =  vrf + "-"+srcid+"-"+cpid; 
						var description = "To " + tgtid + " for " + cpid;
						var sigip = destination; 
						var portin = $("#portbox"+tgtid+"t"+cpid).val();
						var peerip = mgcdomain;
						var peerport = $("#portbox"+srcid+"s"+cpid).val();
						
						sbc(cxnid,adjname,description,vrf,sigip,portin,peerip,peerport);
						break;
					case "pgwcluster":
						var nodesplit = tgtepid.split("-");
						var nodeid = nodesplit[1];
						var trnkgrpin = "(select ipttrnkgrpin from globals)";
						var trnkgrpout = "(select ipttrnkgrpout from globals)"; 
						var svc = "(select svc from globals)";
						var sipprofile = profile;
						var distrib = "OFF"
						var mgcdomain = "(select pipa from inv where name=\""+srcid+"\")";
						var destination = "(select ip"+(parseInt(nodeid)+1)+" from clusters where cpid=\""+cpid+"\")";
						var portin = $("#portbox"+srcepid).val();
						var portout = $('#portbox'+tgtepid).val();
						var rttrnkname = "( CONCAT((select rtpref from globals),\"" + cpid + "\"))";
						var rtlistname = "( CONCAT((select rtlistpref from globals),\"" + cpid + "\"))";
						//alert(howmanyocc(srcepid,excxnz,1)+":"+howmanyocc(srcepid,addcon,0)+ ":"+howmanyocc(srcepid, eycxnz,0));
						if(howmanyocc(srcepid,excxnz,1)>0 || howmanyocc(srcepid, addcon,0)>1 || howmanyocc(srcepid, eycxnz,0)>0) pgwcombo("nocountry",cxnid,trnkgrpin,trnkgrpout,svc,sipprofile,distrib,mgcdomain,destination,portin,portout,rttrnkname,rtlistname,cpid,0); 
						else pgwcombo("nocountry",cxnid,trnkgrpin,trnkgrpout,svc,sipprofile,distrib,mgcdomain,destination,portin,portout,rttrnkname,rtlistname,cpid,1);
						break;
					case "sbccluster":
						var nodesplit = tgtepid.split("-");
						var nodeid = nodesplit[1];
						if(nodeid==0) var adjapp = "pub"; else adjapp = "sub"+nodeid;
						var dest = vrfip.split(":");
						var vrf = dest[0];
						var adjname =  vrf + "-"+tgtid+"-"+cpid+adjapp;
						var description = "To " + tgtid + " for " + cpid+adjapp;
						var sigip = dest[1]; 
						var portin = $("#portbox"+srcepid).val(); 
						var peerip = "(select ip"+(parseInt(nodeid)+1)+" from clusters where cpid=\""+cpid+"\")";
						var peerport = $('#portbox'+tgtepid).val();
						sbc(cxnid,adjname,description,vrf,sigip,portin,peerip,peerport);
						break;
					case "countrypgw":
						var ipport = $("#"+cpid+"ipport").val();
						var csp = ipport.split(":");
						var trnkgrpin = "(select pstntrnkgrpin from globals)";
						var trnkgrpout = "(select pstntrnkgrpout from globals)";
						var svc = "(select svc from globals)";
						var sipprofile = profile;
						var distrib = "OFF"
						var mgcdomain = "(select pipa from inv where name=\""+tgtid+"\")";
						var destination = csp[0];
						var portin = "(select defpstnport from globals)";
						var portout = csp[1];
						var rttrnkname = "( CONCAT((select rtpstnpref from globals),\"" + cpid + "\"))";
						var rtlistname = "( CONCAT((select rtlistpstnpref from globals),\"" + cpid + "\"))";
						pgwcombo("country",cxnid,trnkgrpin,trnkgrpout,svc,sipprofile,distrib,mgcdomain,destination,portin,portout,rttrnkname,rtlistname,"P"+cpid);
						break;
					case "countrysbc":
						var ipport = $("#"+cpid+"ipport").val();
						var csp = ipport.split(":");
						var cvip = vrfip.split(":");						
						var adjname = vrf + "-"+srcid+"-"+cpid;
						var description = "To " + tgtid + " for" + cpid;
						var vrf = cvip[0];
						var sigip = cvip[1];
						var portin = "5060";
						var peerip = csp[0];
						var peerport = csp[1];
						sbc(cxnid,adjname,description,vrf,sigip,portin,peerip,peerport);
						break;
				}
				if(i+1<addconn.length) {
savecxni(i+1);
} 
else {
addconn = [];
addcon = [];
$("#list").html("<a>Save successful!</a>");
	$("#list").fadeIn();
	$("#list").fadeOut(500, "linear");
}
				});
	
function pgwcombo(ukey,cxnid,trnkgrpin,trnkgrpout,svc,sipprofile,distrib,mgcdomain,destination,portin,portout,rttrnkname,rtlistname,cpid,nl){
var options = "insertopgw" +
	"& id="+ cxnid +
	"& trnkgrpin="+ trnkgrpin +
	"& trnkgrpout="+ trnkgrpout +
	"& svc="+ svc +
	"& sipprofile="+ sipprofile +
	"& distrib="+ distrib +
	"& mgcdomain="+ mgcdomain +
	"& destination="+ destination +
	"& portin="+ portin +
	"& portout="+ portout +
	"& rttrnkname="+ rttrnkname +
	"& rtlistname="+ rtlistname+
	"& cpid="+ cpid;

	var y = getme(options);
	y.complete(function (data) {
	switch(ukey){
	case "country":
	getme("trnkidupdate&key=pstn");
	break;
	case "nocountry":
	getme("trnkidupdate&key=ip");
	break;
	}
	
	var o1 = ["addinprofile","addtrnkgrpin","addtrnkgrpprofin"];
	if(nl==1) o2 = ["addoutprofile","addtrnkgrpout","addtrnkgrpprofout","addsiprttrnkgrp","addrttrnk","addrtlist"];
	else o2 = ["addoutprofile","addtrnkgrpout","addtrnkgrpprofout","addsiprttrnkgrp","edrttrnk"];

	deploy(cxnid,"null","pgw",o1,"Incoming trunk - MML configuration set:", function(s1){if(s1) deploy(cxnid,"null","pgw",o2,"Outgoing trunk - MML configuration set:", function(s2){if(s2) restorepaint();});});
	
	}); 
}

function sbc(cxnid,adjname,description,vrf,sigip,portin,peerip,peerport){
var s2 = "insertosbc" +
	"& id="+ cxnid +
	"& adjname="+ adjname +
	"& description="+ description +
	"& vrf="+ vrf +
	"& sigip="+ sigip +
	"& portin="+ portin + 
	"& peerip="+ peerip +
	"& peerport="+ peerport;
	
	var z = getme(s2);
	z.complete(function (data) {
	deploy(cxnid,"null","sbc",["start","describe","setvrf","settransport","setmyaddress","setmyport","setpeeraddress","setpeerip","setpeerport","setaccount","end"], "Adjacency command set:",function(s1){if(s1) restorepaint();});
	});
}


function restorepaint(){
eycxnz.push(acxn);
acxn.setPaintStyle(connectorPaintStyle);
}
}

function howmanyocc(spid,ctab,x){
var nocc = 0;
for (var t=0;t<ctab.length;t++){
if(x==0){
	var ez = ctab[t].endpoints;
    if( ez[0].getUuid() === spid) nocc++;
	}
	else if(x==1){
	if( ctab[t]['srcepid'] === spid) nocc++;
	}
}
return nocc;
}
