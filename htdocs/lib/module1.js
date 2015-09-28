// HCS Aggregation Configurator Module 1. c inside o Kumaran Thulasiraman 2012
var signal = getme("getdevices");
var excxnz = [];
var eycxnz = [];
signal.success(function (data) {
	onstage(data,0);
	jsPlumb.draggable(jsPlumb.getSelector(".pgw"));
	jsPlumb.draggable(jsPlumb.getSelector(".sbc"));
		var signal2 = getme("load");
		signal2.success(function (data) {
			if(data.length!=0){
			onstage(data,"cluster");
			attachpoints(data);
			}
				var signal123 = getme("getcountries");
				signal123.success(function (data) {
					pincountries(data);
						var signal3 = getme("getcxnz");
						signal3.success(function (data) {
								connectem(data);
								addconn = []; addcon = [];
								vrfconn= []; vrfcon= [];
								delconn= []; delcon= [];

								jsPlumb.draggable(jsPlumb.getSelector("#log"));
								var s = "<a href=\"#\" onclick=\"$('#log').hide()\"> [Close] </a> Session Trace<br />";
								//s = s + "<span><b>Changes in Session:</b></span><br/><br/><table align=\"center\" class=\"tabla\"><tr><th>Cxnid</th><th>Change</th></tr>";
								$("#log").html(s);
									var signal8 = getme("getports");
									signal8.success(function (data) {
										setports(data);
										//jsPlumb.getSelector("#stage").toggle('slide');
										jsPlumb.getSelector(".country").toggle(100); 
										jsPlumb.repaintEverything();
										$("#list").html("<a>Load successful!</a>"); 
										$("#list").fadeOut(500, "linear");
									});
						});
				});
		});
});

var motion = [];
//jsPlumb.draggable(jsPlumb.getSelector(".commands")); 
$(".commands").append("<a href=\"#\" onclick=\"$(this).parent().hide()\"> [Close] </a>");
//document.getElementById("commands").style.overflow = "scroll";
document.getElementById("stage").style.minHeight = window.innerHeight-16 +'px';

var connections = [];
var addconn= []; var addcon= [];
var delconn= []; var delcon= []; 
var vrfconn=[]; var vrfcon= [];
var con = [];
var ses = [], tes = [];
var connectorPaintStyle = {lineWidth:2, strokeStyle:"#225588", joinstyle:"round"};
var detect = {lineWidth:2, strokeStyle:"#15DC93", joinstyle:"round"};
var pstncpaint = {lineWidth:2, strokeStyle:"#225588", joinstyle:"round", dashstyle:"4 2"};
connectorHoverStyle = {lineWidth:3, strokeStyle:"#225588"};

sepo = {endpoint:"Rectangle", paintStyle:{ fillStyle:"#225588",width:10, height:10, }, isSource:true, connectorStyle:connectorPaintStyle, hoverPaintStyle:connectorHoverStyle, connectorHoverStyle:connectorHoverStyle, connector:[ "Flowchart", { stub:40 } ],maxConnections:8};

pstnepo = {endpoint:"Dot", paintStyle:{ fillStyle:"#225588",radius:5, }, isSource:true, connectorStyle:pstncpaint, hoverPaintStyle:connectorHoverStyle, connectorHoverStyle:connectorHoverStyle, connector:[ "Bezier", { curviness: 50 } ],anchor:"Continuous",maxConnections:1,uuid:"countrypstn"};

pgwepo = {endpoint:"Dot", paintStyle:{ fillStyle:"#225588",radius:5, }, isTarget:true, connectorStyle:pstncpaint, hoverPaintStyle:connectorHoverStyle, connectorHoverStyle:connectorHoverStyle, connector:[ "Bezier", { curviness: 50 } ],anchor:"Continuous",maxConnections:10, uuid:"pgwpstn"};

sbcepo = {endpoint:"Dot", paintStyle:{ fillStyle:"#225588",radius:5, }, isTarget:true, connectorStyle:pstncpaint, hoverPaintStyle:connectorHoverStyle, connectorHoverStyle:connectorHoverStyle, connector:[ "Bezier", { curviness: 50 } ],anchor:"Continuous",maxConnections:10, uuid:"sbcpstn"};

tepo = {sendpoint:"Dot", paintStyle:{ fillStyle:"#225588",radius:5 }, hoverPaintStyle:connectorHoverStyle, maxConnections:1, dropOptions:{ hoverClass:"hover",  activeClass:"active" }, isTarget:true};

jsPlumb.importDefaults({ConnectionOverlays : [[ "Arrow", { location:0.2, width:10, length:10 } ], [ "Arrow", { location:0.9, width:10, length:10, direction:-1 } ]]});	