//-------------------------------------------------------------------------------------------------------------------------------------
function resizeStuff() {
for(var n=0;n<con.length;n=n+3){
document.getElementById(con[n]).style.left = (con[n+1]*window.innerWidth)/2000+'px';
document.getElementById(con[n]).style.top = (con[n+2]*window.innerHeight)/1117+'px';
jsPlumb.repaint(con[n]);
}
}
var TO = false; 
$(window).resize(function(){  
 if(TO !== false)
    clearTimeout(TO);
 TO = setTimeout(resizeStuff, 50);
});
//-------------------------------------------------------------------------------------------------------------------------------------
var pincountries = function(data){
for(var x = 0; x < data.length; x++){
	var d = document.createElement("div");
			d.className = "country";
			//d.style.display = "none";
			document.getElementById("stage").appendChild(d); 
			d.setAttribute("id", data[x]['code']);
			d.innerHTML ="<input type=\"text\" maxlength=\"20\" onchange = motionupdate($(this).attr(\"id\")) class=\"textbox\" id=\""+ data[x]['code'] +"ipport"+"\" value=\""+data[x]['ip']+":"+data[x]['port']+"\"/>";
	document.getElementById(data[x]['code']).style.left = (data[x]['ox']*window.innerWidth)/2000+'px';
	document.getElementById(data[x]['code']).style.top = (data[x]['oy']*window.innerHeight)/1117+'px';
	jsPlumb.makeSource(data[x]['code'],pstnepo);
	con.push(data[x]['code'],data[x]['ox'],data[x]['oy']);
}
}
function motionupdate(id){
motion[id] = 1;
}
//-------------------------------------------------------------------------------------------------------------------------------------
var setports = function(data){
for(var x = 0; x < data.length; x++){
$("#"+data[x]['id']).val(data[x]['value']);
}
}
//-------------------------------------------------------------------------------------------------------------------------------------
	function onstage(data,type){
	for(var x = 0; x < data.length; x++){
			var d = document.createElement("div");
			d.className = data[x]['type'];			 
			document.getElementById("stage").appendChild(d);
			if(type=="cluster"){  
			d.setAttribute("id", data[x]['name1']);
			d.innerHTML ="<a>"+data[x]['name1']+"<br />["+data[x]['cpid']+"]</a>";
			d.style.height = 2*data[x]['nodes']+'em';
			var dxx = document.createElement("div");
			d.appendChild(dxx);
			dxx.innerHTML = "<a onclick=\"toggleports(this)\">P</a>";
			dxx.style.padding = "1px";
			}
			else {
			
			d.setAttribute("id", data[x]['name']);
			d.innerHTML = " <a style=\"float:left;\" id=\"prop"+data[x]['name']+"\">"+data[x]['name']+"</a>";
			var dxx = document.createElement("div");
			d.appendChild(dxx);
			dxx.innerHTML = "<a class=\"onbutr\" onclick=\"toggleports(this)\">P</a>";
			dxx.style.padding = "1px";
			var dd = document.createElement("div");
			dd.setAttribute("id", "propcon"+data[x]['name']);
			dd.innerHTML = "<br /><br /><br /><br /><input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\"name\" value="+data[x]['name']+"></input><br /><br /><input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\"pipa\" value="+data[x]['pipa']+"></input><br /><br /><input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\"user\" value="+data[x]['user']+"></input><br /><br /><input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\"pass\" value="+data[x]['pass']+"></input><br /><br /><a href=\"#\" id=\"update"+data[x]['name']+"\">Update</a><a class=\"onbutl\" id=\"man"+data[x]['name']+"\">Manage</a>"; 
			dd.style.display = "none";
			d.appendChild(dd);
			var d2 = document.createElement("div");		
			d2.className = "pgwatt";
			d2.style.position = "absolute";
			d2.style.width = 'auto';
			d2.style.display = "none";
			d2.setAttribute("id", "prof"+data[x]['name']);
			d2.style.top = '5%'; 
			d2.style.left = '100%'; 
			d2.style.height = 'auto%';  
			d.appendChild(d2);
			if(data[x]['type']=="pgw")popprof(d2);
			else d2.innerHTML = "<a href='/route.html'>Call_Policy</a>";
			
			$("#prop"+data[x]['name']).click(function() {
			if(jsPlumb.select({source:$(this).parent().attr("id")}).length > 0 || jsPlumb.select({target:$(this).parent().attr("id")}).length > 0) $("#"+"propcon"+$(this).parent().attr("id")).children("#name").attr("readonly",true);
			$("#propcon"+$(this).parent().attr("id")).toggle();
			});
			
			$("#man"+data[x]['name']).click(function() {
			$(this).parent().parent().children(".pgwatt").toggle('slow');
			});
			
			$("#update"+data[x]['name']).click(function() {
			var dname = $(this).parent().children("#name").val();
			var dip = $(this).parent().children("#pipa").val(); 
			var duser = $(this).parent().children("#user").val(); 
			var dpass = $(this).parent().children("#pass").val();   
			var doldname = $(this).parent().parent().attr("id");
			var sop = "savedevice &name=" + dname + "&pipa=" + dip + "&user=" + duser + "&pass=" + dpass + "&oldname=" + doldname;
			var y=getme(sop);
			if(dname!=doldname){ 
			y.success(function(){
			$("#list").html("<a>Critical Modification. Application Reloading!</a>");  
			setTimeout("window.location.reload()",2000);
			})
			}
			else {
			$("#list").html("<a>Device Parameters Updated!</a>");  
			}
			$("#list").fadeIn();
			$("#list").fadeOut(500, "linear");
			});
			}
			
			d.style.top = data[x]['ptop'] + 'em';
			d.style.left = data[x]['pleft'] + 'em';
	}
	}	
//---------------------------------------------------------------------------------
function popprof(d){
var ht = "<td><a id=\"profilename\" onclick=\"toggleprofs(this)\">PROFILES</a></td> <td><a onclick=\"newprof()\">NEW</a></td><br /><table class=\"tabla\">";
var sig = getme("getppgw");
sig.success(function(data) {
for(var b=0;b<data.length;b++){
ht += "<tr><td><a id=\"par"+b+"\">"+data[b]['parameter']+"</a></td><td><input class=\"profpar\" type=\""+data[b]['type']+"\"  id=\"part"+b+"\"></td></tr>";
}
ht += "</table><td id=\"butpan\"><a id=\"createbut\" onclick=\"dealprof('create',"+data.length+")\" style=\"display:none;\">Create</a> <a  id=\"deletebut\" onclick=\"dealprof('delete',"+data.length+")\" style=\"display:none;\">Delete</a></td>";
d.innerHTML = ht;
});
}
//-------------------------------------------------------------------------------------------------------------------------------------
function newprof(){
$("#deletebut").hide();
$("#createbut").toggle();
$("#profilename").replaceWith(function() {
switch($(this).attr("type")){
case "text": { 
return "<div><a onclick=\"toggleprofs(this)\" id=\"profilename\">PROFILES</a></div>";
break;
}
default: {
$(".profpar").each(function(){
if($(this).attr("type")=="text") {$(this).val("");}
else {$(this).attr("checked",false);}
});
return "<div><input id=\"profilename\" type=\"text\" style=\"width:3em\"></input></div>";
break;
}
}
    });
}
//-------------------------------------------------------------------------------------------------------------------------------------
function dealprof(op,cnt){
switch(op){
case "create":
var so2 = "cpprof &name="+$("#profilename").val();
for(var t=0;t<cnt;t++){
switch($("#part"+(t)).attr("type"))
{
case "text": so2 += "&"+$("#par"+(t)).text()+"="+$("#part"+(t)).val(); break;
case "checkbox": so2 += "&"+$("#par"+(t)).text()+"="+($("#part"+(t)).attr("checked")? 1:0); break;
}
}
getme(so2);
$("#profilename").replaceWith("<div><a onclick=\"toggleprofs(this)\" id=\"profilename\">PROFILES</a></div>");
$(".profpar").each(function(){
if($(this).attr("type")=="text") {$(this).val("");}
else {$(this).attr("checked",false);}
});
$("#createbut").toggle();
break;
case "delete":
var so2 = "dpprof &name="+$("#profilename").text();
getme(so2);
$("#profilename").replaceWith("<div><a onclick=\"toggleprofs(this)\" id=\"profilename\">PROFILES</a></div>");
$(".profpar").each(function(){
if($(this).attr("type")=="text") {$(this).val("");}
else {$(this).attr("checked",false);}
});
$("#deletebut").toggle();
break;
}
}
//-------------------------------------------------------------------------------------------------------------------------------------
function toggleprofs(eid) {
var t = getme("pprofiles");
var profs =[];
t.success(function (data) {
if(data.length > 0)$("#deletebut").show();
for(var h=0;h<data.length;h++) {profs.push(data[h]['name']);}
for(var n=0;n<profs.length;n++)
{
if(eid.text==profs[n] && n+1!=profs.length) {
eid.text=profs[n+1];

var count = 0;
$.each(data[n+1], function() { count++; });

for(var p=1; p<count;p++) { 
switch($("#part"+(p-1)).attr("type"))
{
case "text": $("#part"+(p-1)).val(data[n+1]["p"+p]); break;
case "checkbox": if(data[n+1]["p"+p]==1) $("#part"+(p-1)).attr("checked",true); else $("#part"+(p-1)).attr("checked",false);
}
}
break;
}
else if(n+1==profs.length) 
{
eid.text=profs[0];
var count = 0;
$.each(data[0], function() { count++; });

for(var p=1; p<count;p++) {
switch($("#part"+(p-1)).attr("type"))
{
case "text": $("#part"+(p-1)).val(data[0]["p"+p]); break;
case "checkbox": if(data[0]["p"+p]==1) $("#part"+(p-1)).attr("checked",true); else $("#part"+(p-1)).attr("checked",false);
}
}
break;
}
}
});
}
//---------------------------------------------------------------------------------
function toggleprofile(eid) {
//.................................................
	var cpid = eid.component.getOverlay("cpid").getLabel();
	var epz = eid.component.endpoints;
	var cxnid = epz[0].getUuid() + epz[1].getUuid();
//.................................................
var t = getme("pprofiles");
var profs =[];
t.success(function (data) {
for(var h=0;h<data.length;h++) {profs.push(data[h]['name']);}
for(var n=0;n<profs.length;n++)
{
if(eid.getLabel()==profs[n] && n+1!=profs.length) {
eid.setLabel(profs[n+1]);
break;
}
else if(n+1==profs.length) 
{
eid.setLabel(profs[0]);
break;
}
}
if(jQuery.inArray(cxnid,addconn)==-1){
	updateConnections(eid.component,"modprofile"); 
	markconn(cxnid,"Profile Modified"); 
	}
});
}
//---------------------------------------------------------------------------------
function togglecpid(eid) {
//.................................................
	var cpid = eid.component.getOverlay("cpid").getLabel();
	var epz = eid.component.endpoints;
	var cxnid = epz[0].getUuid() + epz[1].getUuid();
//.................................................
if(jQuery.inArray(cxnid,addconn)!=-1){
var t = getme("load");
var cpids =[]; 
t.success(function (data) {
for(var h=0;h<data.length;h++) {cpids.push(data[h]['cpid']);}
for(var n=0;n<cpids.length;n++)
{
if(eid.getLabel()==cpids[n] && n+1!=cpids.length) {
eid.setLabel(cpids[n+1]); 
break;
}
else if(n+1==cpids.length) 
{
eid.setLabel(cpids[0]);
break;
}
}
if(jQuery.inArray(cxnid,addconn)==-1){
	updateConnections(eid.component,"modcpid"); 
	markconn(cxnid,"Path Modified"); 
	}
});
}
}
//---------------------------------------------------------------------------------

function popprop(x){
var sig = getme("getdevices");
sig.success(function (data) {
for(var b = 0;b<data.length;b++){  
if(data[b]['name']==$(x).parent().attr("id")){
$("#"+$(x).parent().attr("id")).append(s);
}
}
});
}
//-------------------------------------------------------------------------------------------------------------------------------------
function attachpoints(data,type){
		var sancs = [];
		var tancs = [];
		var ttanc = [];
		var ssanc = [];
		var as = []; 
		 
		$( ".pgw" ).bind( "dragstop", function(event, ui) {motion[$(this).attr("id")] = 1;});
		$( ".sbc" ).bind( "dragstop", function(event, ui) {motion[$(this).attr("id")] = 1;});
		$( ".cluster" ).bind( "dragstop", function(event, ui) {motion[$(this).attr("id")] = 1;});

		jsPlumb.draggable(jsPlumb.getSelector(".cluster"));
		
		var nclusters = parseInt(data.length);
		var uuids = [];
		var ti = 0;

for(var hk=0;hk<nclusters;hk++) {uuids[hk] = data[hk]['cpid'];}

for (var i = 0; i < data.length; i++) {
var nnodes = parseInt(data[i]['nodes']);
for (var j = 1; j <=nnodes; j++) {
				as = [0,j/(nnodes+1),-1,0]; 
				ttanc.push(as);
}
addeps(data[i]['name1'], ssanc, ttanc, data[i]['cpid'], "cluster");
ssanc=[];
ttanc=[];
}		
			for (var k = 1; k <=nclusters; k++) {
				as = [1,k/(nclusters+1),1,0];
				sancs.push(as);
				as = [0,k/(nclusters+1),-1,0];
				tancs.push(as);
			}	

		jsPlumb.getSelector(".pgw").each(function() {
		addeps($(this).attr("id"), sancs, tancs, uuids, "pgw");
		});
		
		jsPlumb.getSelector(".sbc").each(function() {
		addeps($(this).attr("id"), sancs, tancs, uuids, "sbc");
		});
}
//-------------------------------------------------------------------------------------------------------------------------------------
addeps = function(toId, sanc, tanc, uuids, type) {
					switch(type) {
					case "sbc":
					for (var i = 0; i < sanc.length; i++) {
						var sbcsep = jsPlumb.addEndpoint(toId, sepo, { anchor:sanc[i], uuid:toId + "s" +uuids[i] });
					}
					for (var j = 0; j < tanc.length; j++) {
						var sbctep = jsPlumb.addEndpoint(toId, tepo, { anchor:tanc[j], uuid:toId + "t"+ uuids[j] });
					}
						portbox(toId,tanc,uuids,20,"t","sbc");
						portbox(toId,sanc,uuids,20,"s","sbc");
					jsPlumb.makeTarget(toId,sbcepo);
					break;
					case "pgw":
					for (var i = 0; i < sanc.length; i++) {
						var pgwsep = jsPlumb.addEndpoint(toId, sepo, { anchor:sanc[i], uuid:toId + "s" +uuids[i] });
					}
						portbox(toId,sanc,uuids,20,"s","pgw");
						jsPlumb.makeTarget(toId,pgwepo);
					break;
					case "cluster":
					for (var j = 0; j < tanc.length; j++) {
						var ctep = jsPlumb.addEndpoint(toId, tepo, { anchor:tanc[j], uuid:toId +"t"+ "-"+j+"-" +uuids });
					}
					portbox(toId,tanc,uuids,6,"t","cluster");
					break;
					}
};
//-------------------------------------------------------------------------------------------------------------------------------------
	function portbox(pid,points,uuids,ph,type,device){
	for (var i = 0; i < points.length; i++) {
			var d = document.createElement("div");		
			d.setAttribute("id", "port"+uuids[i]);
			d.style.position = "absolute";
			if(device=="cluster") {
			d.innerHTML="<input class=\"portbox\" onchange = motionupdate($(this).attr(\"id\")) style=\"display: none;\" maxlength=\"4\" id=\"portbox"+pid + type + "-"+i+"-" + uuids+"\"/>";
			d.style.top = (points[i][1]*100)-(60/(1.8*points.length)) + '%';
			}
			else {
			d.innerHTML="<input class=\"portbox\" onchange = motionupdate($(this).attr(\"id\")) style=\"display: none;\" maxlength=\"4\" id=\"portbox"+pid + type +uuids[i]+"\"/>";
			d.style.top = (points[i][1]*100)-4+ '%';
			} 
			
			switch (type){
			case "s": d.style.left = 100-(3.7/12)*100+'%'; break; 
			case "t": d.style.left = 5+'px'; break;
			} 
			document.getElementById(pid).appendChild(d);
			}
			}
//-------------------------------------------------------------------------------------------------------------------------------------
var updateConnections = function(conn, changetype) {
//___________________________________________________________________
var srctype = String(document.getElementById(conn.sourceId).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	var cpid = conn.getOverlay("cpid").getLabel();
	var eps = conn.endpoints;
	var cxnid = eps[0].getUuid() + eps[1].getUuid();
//___________________________________________________________________
				if (changetype=="add") {
				connections.push(conn);
				addconn.push(cxnid);
				addcon.push(conn);
				markconn(cxnid,"Connection created");
				}
				else if(changetype=="remove"){
					var idx = -1;
					for (var i = 0; i < connections.length; i++) {
						if (connections[i] == conn) {
							idx = i; break;
						}
					}
					if (idx != -1) {
					connections.splice(idx, 1);
					}
					if(jQuery.inArray(cxnid,addconn)==-1){
					delconn.push(cxnid);
					delcon.push(conn);
					markconn(cxnid,"Connection Removed");
					}
					else {
					addconn.splice(jQuery.inArray(cxnid,addconn),1);
					addcon = splicecon(cxnid,addcon);
					markconn(cxnid,"Connection Removed");
					}
					
					if(jQuery.inArray(cxnid,vrfconn)!=-1){
					vrfconn.splice(jQuery.inArray(cxnid,vrfconn),1);
					vrfcon = splicecon(cxnid, vrfcon);
					delconn.push(cxnid);
					delcon.push(conn);
					}
				}
				else if(changetype=="reinitcon"){
				if(jQuery.inArray(cxnid,delconn)!=-1){
					delconn.splice(jQuery.inArray(cxnid,delconn),1);
					delcon = splicecon(cxnid, delcon);
					}
					else{
					addconn.push(cxnid);
					addcon.push(conn);
					markconn(cxnid,"Connection created");
					}
				}
				else { 
				if(vrfconn[cxnid]==undefined) {vrfconn[cxnid] = [];vrfcon.push(conn);}
				vrfconn[cxnid].push(changetype);				
				}
};			
//-------------------------------------------------------------------------------------------------------------------------------------
function connectem(data){
excxnz = data;
for(var x = 0; x < data.length; x++){
if(data[x]['type']=="country-pgw" || data[x]['type']=="country-sbc"){
var cxn = jsPlumb.connect({source:data[x]['srcepid'], target:data[x]['tgtepid']});
if(data[x]['vrflabel']!=null)cxn.getOverlay("vrf").setLabel(data[x]['vrflabel']);
if(data[x]['profilelabel']!=null)cxn.getOverlay("profile").setLabel(data[x]['profilelabel']); 
}
else{
var cxn = jsPlumb.connect({uuids:[data[x]['srcepid'], data[x]['tgtepid']]});
if(data[x]['vrflabel']!=null)cxn.getOverlay("vrf").setLabel(data[x]['vrflabel']);
if(data[x]['profilelabel']!=null)cxn.getOverlay("profile").setLabel(data[x]['profilelabel']);
cxn.getOverlay("cpid").setLabel(data[x]['cpid']);
}
}
}
//-------------------------------------------------------------------------------------------------------------------------------------
jsPlumb.bind("jsPlumbConnection", function(info, originalEvent) {
 if (!info.connection.initialised) {
				var tmpeps = info.connection.endpoints;
				var ud = tmpeps[0].getUuid();
				
				var tgttype = String(document.getElementById(info.connection.targetId).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
				var srctype = String(document.getElementById(info.connection.sourceId).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
				
				if(srctype=="country" || tgttype=="country"){
				info.connection.addOverlay([ "Label", {location:0.8, id:"cpid", cssClass:"aLabel",events:{click:function(labelOverlay, originalEvent) { }}}]);
				info.connection.getOverlay("cpid").setLabel(info.connection.sourceId);
				}
				if(srctype=="pgw" || tgttype=="pgw"){
				info.connection.addOverlay([ "Label", {location:0.8, id:"profile", cssClass:"aLabel", label:"Profile", events:{click:function(labelOverlay, originalEvent){ toggleprofile(labelOverlay);}}}]); 
				info.connection.hideOverlay("profile");
				if(srctype!="country" && tgttype!="country"){
				info.connection.addOverlay([ "Label", {location:0.8, id:"cpid", cssClass:"aLabel", label:"CPID",events:{click:function(labelOverlay, originalEvent) {togglecpid(labelOverlay);}}}]);
				//info.connection.getOverlay("cpid").setLabel(ud.substr(-4)); 
				}
				}
				if(srctype=="sbc" || tgttype=="sbc"){
				info.connection.addOverlay([ "Label", {location:0.8, id:"vrf", cssClass:"aLabel", label:"VRF:IP", events:{click:function(labelOverlay, originalEvent){ togglevrf(labelOverlay);}}}]);
				info.connection.hideOverlay("vrf");
				if(srctype!="country" && tgttype!="country" && srctype!="pgw" && tgttype!="pgw"){
				info.connection.addOverlay([ "Label", {location:0.8, id:"cpid", cssClass:"aLabel", label:"CPID",events:{click:function(labelOverlay, originalEvent) {togglecpid(labelOverlay);}}}]);
				//info.connection.getOverlay("cpid").setLabel(ud.substr(-4)); 
				}
				}
				tmpeps[0].clearListeners();
				tmpeps[1].clearListeners();
				tmpeps[0].bind("click", function(endpoint) {epclick(endpoint);});
				tmpeps[1].bind("click", function(endpoint) {epclick(endpoint);});				
				updateConnections(info.connection,"add");
				info.connection.initialised = true;
				}
				else {
				updateConnections(info.connection,"reinitcon");
				}
			});
//-------------------------------------------------------------------------------------------------------------------------------------
function epclick(endpoint){
var cs = endpoint.connections;
for(var i=0;i<cs.length;i++){
var one = 0; 
var labelids = [];
var lays = cs[i].overlays;
for(var k=2;k<lays.length;k++){
if(cs[i].getOverlay(lays[k].id).isVisible()) {
one++;
cs[i].hideOverlay(lays[k].id);
if(k+1!=lays.length) {cs[i].showOverlay(lays[k+1].id);}
break;
}
}
if(one==0) cs[i].showOverlay(lays[2].id);
}						
}
//-------------------------------------------------------------------------------------------------------------------------------------
jsPlumb.bind("jsPlumbConnectionDetached", function(info, originalEvent) {
		updateConnections(info.connection, "remove");
		//info.connection.initialised = false;
			});
//-------------------------------------------------------------------------------------------------------------------------------------
function getme(key){
	return $.ajax({
			type: "POST",
			url: "/scripts/submit.php",
			data: "operate=" + key, 
			dataType: 'json'
		}); 
	}
//-------------------------------------------------------------------------------------------------------------------------------------
$("#savebt").click(function() {
var ch=0;
	$("#list").html("<a>Saving.. Please wait!</a>");
	$("#list").fadeIn();
	$(".pgw").each(function() {
	if(motion[$(this).attr("id")]==1)saveit($(this).attr("id"), "pgw");});
	$(".sbc").each(function() {if(motion[$(this).attr("id")]==1) saveit($(this).attr("id"), "sbc");});
	$(".cluster").each(function() {if(motion[$(this).attr("id")]==1) saveit($(this).attr("id"), "cluster");});

	$(".textbox").each(function() {
	if(motion[$(this).attr("id")]==1){ 
	var values = document.getElementById($(this).attr("id")).value;
	var splits = values.split(":"); 
		var savewat = "savepstndest" +"& code="+ $(this).attr("id").replace("ipport","") +"& ip="+ splits[0] +"& port="+ splits[1];
		getme(savewat);
		}
	});
	$(".portbox").each(function() {
	if(motion[$(this).attr("id")]==1){
	var value = document.getElementById($(this).attr("id")).value;
		var savewat = "saveportbox" +"& id="+ $(this).attr("id") +"& value="+ value;
		getme(savewat);
		}
	});
	
	motion = [];

	// addconn = uniques(addconn);
	// delconn = uniques(delconn); 
	// vrfconn = uniques(vrfconn);
	
	if(delconn.length>0){remcxni(0);ch++;} 
	else if(addconn.length>0){savecxni(0); ch++;}
	
	if(vrfcon.length>0){
	 if(vrfcon.length>0){cngcxni(0); ch++;}
	}
	if (ch==0){
	$("#list").html("<a>Layout saved!</a>");   
	$("#list").fadeIn();
	$("#list").fadeOut(500, "linear");
	}
ch=0; 
});
//-------------------------------------------------------------------------------------------------------------------------------------

function splicecon(id,acon) {
for(var i=0;i<acon.length;i++){
var eps = acon[i].endpoints;
var cpid = acon[i].getOverlay("cpid").getLabel();
var cxnid = eps[0].getUuid() + eps[1].getUuid();
if(id==cxnid)acon.splice(i,1);	
}
return acon;
}
//-------------------------------------------------------------------------------------------------------------------------------------
function getcon(index,aid,acon) {
var indexx;
for(var i=0;i<acon.length;i++){ 
var eps = acon[i].endpoints;
var cpid = acon[i].getOverlay("cpid").getLabel();
var cxnid = eps[0].getUuid() + eps[1].getUuid();
if(aid[index]==cxnid)indexx=i;
}
return acon[indexx];
}
//-------------------------------------------------------------------------------------------------------------------------------------
function saveit(id, type){
	x = document.getElementById(id); 
	var base = parseFloat($(".pgw").css('font-size').replace("px",""));
	var saveoptions = "modify" +"& name="+ id +"& type="+ type +"& top="+ x.offsetTop/base +"& left="+ x.offsetLeft/base;
	getme(saveoptions);
}
//-------------------------------------------------------------------------------------------------------------------------------------
function toggleports(x) {
$(x).parent().parent().children().children(".portbox").slideToggle('slow');
}
//------------------------------------------------------------------------------------------------------------------------------------
function togglevrf(eid) {
//.................................................
	var cpid = eid.component.getOverlay("cpid").getLabel();
	var epz = eid.component.endpoints;
	var cxnid = epz[0].getUuid() + epz[1].getUuid();
//.................................................
var t = getme("sbcints");
var vrfs=[];
t.success(function (data) {
for(var h=0;h<data.length;h++) {vrfs.push(data[h]['vrf']+":"+data[h]['ip']);}
var vrfarray = uniques(vrfs);
vrfarray.push("VRF:IP"); 

for(var n=0;n<vrfarray.length;n++)
{
if(eid.getLabel()==vrfarray[n] && n+1!=vrfarray.length) {
eid.setLabel(vrfarray[n+1]);
break;
}
else if (eid.getLabel()==vrfarray[n] && n+1==vrfarray.length) 
{
eid.setLabel(vrfarray[0]);  
break;
}
}
jsPlumb.repaintEverything();
	});
	if(jQuery.inArray(cxnid,addconn)==-1){
	updateConnections(eid.component,"modvrf"); 
	markconn(cxnid,"Destination Modified"); 
	}
}
//-------------------------------------------------------------------------------------------------------------------------------------
function uniques(arr){
var a = [];
    var l = arr.length;
    for(var i=0; i<l; i++) {
        for(var j=i+1; j<l; j++) {
            if (arr[i] === arr[j]){
              j = ++i;
			  } 
        }
        a.push(arr[i]); 
    }
    return a;
}
//------------------------------------------------------------------------------------------------------------------------------------
function markconn(id,type){	
var s = "<tr><td>" + id + "</td>" + "<td>" + type + "</td></tr>";
$("#log").append(s);
}
//------------------------------------------------------------------------------------------------------------------------------------