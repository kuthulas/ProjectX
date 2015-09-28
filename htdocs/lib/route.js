jsPlumb.draggable($("#cmds"));
jsPlumb.importDefaults({
				Endpoint : ["Dot", {radius:2}],
				ConnectionOverlays : [[ "Arrow", { location:1,id:"arrow",length:10,width:10} ]]
			});
var tid =1;			

		createDisc = function(cname) {
			var d = document.createElement("div");
			d.className = cname; 
			document.getElementById("demo").appendChild(d);
			if(cname=="adjacency") d.innerHTML = "<div class='ep'><a>"+cname+"</a></div><br /><a class='adjtext' onclick=\"toggleme(this,'adjs');\">Adjacency</a>";
			else d.innerHTML = "<div class='ep'><a>"+cname+"</a></div><br /><input style='width:4em;height:1em;font-family:Cambria;color:'#346789';font-weight:bold;border:2px solid black;background-color:#f0f0f0;' id='tabname'></input>";
			d.innerHTML += " <a href=\"#\" onclick=\"$(this).parent().remove()\">x</a>";
			var id = "x"+tid;
			d.setAttribute("id", id); 
			var w = screen.width - 162, h = screen.height - 162;
			var x = (0.2 * w) + Math.floor(Math.random()*(0.5 * w));   
			var y = (0.2 * h) + Math.floor(Math.random()*(0.6 * h)); 
			d.style.top= y + 'px';
			d.style.left= x + 'px';
			jsPlumb.makeTarget(id, {
                dropOptions:{ hoverClass:"dragHover" },
                anchor:"Continuous",
				maxConnections:-1                
            });
            jsPlumb.makeSource($("#"+id).children(".ep"), {
                parent:id, 
                anchor:"Continuous",   
                connector:[ "StateMachine", { curviness:20 } ],
                connectorStyle:{ strokeStyle:"black", lineWidth:2 },  
                maxConnections:-1
            });
			tid++;
			return {id:id}; 
			
		};
		
$("#add1").bind('click', function(){var info = createDisc("rtg-src-account");jsPlumb.draggable(info.id);} );
$("#add2").bind('click', function(){var info = createDisc("rtg-src-adjacency");jsPlumb.draggable(info.id);} );  
$("#add3").bind('click', function(){var info = createDisc("rtg-round-robin");jsPlumb.draggable(info.id);} );
$("#add4").bind('click', function(){var info = createDisc("adjacency");jsPlumb.draggable(info.id);} );

function toggleme(eid,what) {
switch(what){
case "vrf": abc = "sbcints"; col = "vrf";
break;
case "adjs": abc = "allosbc"; col = "adjname";
break;
}

var t = getme(abc);
var cpids =[]; 
t.success(function (data) {
for(var h=0;h<data.length;h++) {cpids.push(data[h][col]);}
var bunch = uniques(cpids);
var sig = 1;
switch(eid.className){
case "adjtext":
//------------------------------------------------------------------------
for(var n=0;n<bunch.length;n++)
{
if(eid.text==bunch[n] && n+1!==bunch.length) {
eid.text = bunch[n+1];
sig++;
break;
}
else if(eid.text==bunch[n] && n+1==bunch.length) 
{
eid.text = bunch[0];
sig++;
break;
}
}
if(sig==1) eid.text = bunch[0];
break;
//------------------------------------------------------------------------
default:
for(var n=0;n<bunch.length;n++)
{
if(eid.getLabel()==bunch[n] && n+1!==bunch.length) {
eid.setLabel(bunch[n+1]);
sig++;
break;
}
else if(eid.getLabel()==bunch[n] && n+1==bunch.length) 
{
eid.setLabel(bunch[0]);
sig++;
break;
}
}
if(sig==1) eid.setLabel(bunch[0]);
break;
//------------------------------------------------------------------------
}
});
}

jsPlumb.bind("jsPlumbConnection", function(info, originalEvent) {
 if (!info.connection.initialised) {
 switch (String(document.getElementById(info.connection.sourceId).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","")){
 case "rtg-src-account": info.connection.addOverlay([ "Label", {location:0.5, cssClass:"aLabel", id:"label",label:"VRF", events:{click:function(labelOverlay, originalEvent){ toggleme(labelOverlay,"vrf");}}}]); 
 break;
 case "rtg-src-adjacency":
 info.connection.addOverlay([ "Label", {location:0.5, cssClass:"aLabel", id:"label", label:"Adjacency", events:{click:function(labelOverlay, originalEvent){ toggleme(labelOverlay,"adjs");}}}]);  
 break; 
 }
 info.connection.initialised = true; 
}
});

function getme(key){return $.ajax({type: "POST",url: "/scripts/submit.php",data: "operate=" + key, dataType: 'json'}); }

function uniques(arr){var a = [];var l = arr.length;for(var i=0; i<l; i++) { for(var j=i+1; j<l; j++) {if (arr[i] === arr[j]){j = ++i;} }a.push(arr[i]); }return a;}

$("#go").click(function(){
$("#cmds").html("call-policy-set 1<br />first-call-routing-table "+$("#x1").children("#tabname").val()+"<br />");
proc("x1");
$("#cmds").append("complete");
});

function proc(nodeid){
var i = 1;
var nexts = [];
var ntype = String(document.getElementById(nodeid).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
if (ntype!="adjacency") $("#cmds").append(ntype+"-table "+$("#"+nodeid).children("#tabname").val()+"<br />");

jsPlumb.select({source:nodeid}).each(function(c){
tgt = String(document.getElementById(c.targetId).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
if (tgt=="adjacency") ncond2 = $("#" + c.targetId).children(".adjtext").text();
if (ntype!="rtg-round-robin") ncond = c.getOverlay("label").getLabel();
nexts.push(c.targetId);
$("#cmds").append("entry"+i+"<br />");

switch(ntype){
case "rtg-src-account": 
nextl = "match-account";
break;
case "rtg-src-adjacency": 
nextl = "match-adjacency";
break;
case "rtg-round-robin": 
if (tgt=="adjacency") nextl = "dst-adjacency"; 
break;
}

if (ntype!="rtg-round-robin") $("#cmds").append(nextl + " " + ncond+"<br />"); 
if (tgt=="adjacency") {
$("#cmds").append("dst-adjacency"+ncond2+"<br />");
$("#cmds").append("action complete"+"<br />");
}
else $("#cmds").append("action next-table "+$("#"+c.targetId).children("#tabname").val()+"<br />");
i++;
});
for (var u = 0;u<nexts.length; u++) proc(nexts[u]); 
}