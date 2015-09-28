function cngcxni(i){
var cnn = vrfcon[i];
var eps = cnn.endpoints;
var cxnid = eps[0].getUuid() + eps[1].getUuid();
var cngs = vrfconn[cxnid];
var po = "modopgw";
var so = "modosbc";

var csbc = 0;
var cpgw = 0;

var co  = "modlabel &cxnid="+ cxnid;
pmods = [];
smods = [];
smods.push("start","disconnect");
var srctype = String(document.getElementById(cnn.sourceId).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ",""); 
var tgttype = String(document.getElementById(cnn.targetId).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");

for(var t=0;t<cngs.length;t++){
switch(cngs[t]){
case "modvrf": 
var vrfip = cnn.getOverlay("vrf").getLabel().split(":");
co += "&vrflabel=" + cnn.getOverlay("vrf").getLabel();
if(srctype=="pgw" || tgttype=="pgw") {po += "&destination=" + vrfip[1]; pmods.push("moddest");}
if(srctype=="sbc" || tgttype=="sbc") {so += "&sigip=" + vrfip[1]; smods.push("setmyaddress");}
csbc++;
cpgw++;
break;
case "modprofile": 
co += "&profilelabel=" + cnn.getOverlay("profile").getLabel();
if(srctype=="pgw" || tgttype=="pgw") {po += "&sipprofile=" + cnn.getOverlay("profile").getLabel();pmods.push("modtrnkgrpprofin","modtrnkgrpprofout");
cpgw++;
break;
}
}
}
smods.push("end");
if(cpgw>0) deploy(cxnid,"operate="+po,"pgw",pmods,"MML configuration set:",function(s1) {if(s1)moddb(po); });
if(csbc>0) deploy(cxnid,"operate="+so,"sbc",smods,"Adjacency command set:", function(s1){if(s1) moddb(so); });

function moddb(po){
var s1 = getme(po);
s1.complete(function(data){
var s = getme(co);
s.complete(function(){
$("#list").html("<a>Modify successful!</a>"); 
	$("#list").fadeIn();
	$("#list").fadeOut(500, "linear");
});
});
}
}