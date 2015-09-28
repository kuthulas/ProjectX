jsPlumb.ready(function() {
var tid = [0,0,0,0,0];
var etypes = ["PT","CSS","TP"];
    $(".addnode").click(function(){
    spawnme(etypes[parseInt($(this).attr("name"))],tid[parseInt($(this).attr("name"))]);
    tid[parseInt($(this).attr("name"))]++; 
	});

jsPlumb.bind("jsPlumbConnection", function(info, originalEvent) {
var rs= '';
    var src = info.sourceId;
    var tgt = info.targetId;
    $('#' + src + ' :input').prop('disabled',true);
    $('#' + tgt + ' :input').prop('disabled',true);
	var vals = $('#' + tgt + ' :input');
	var val = {};
	for(var i = 1;i<vals.length;i++)
	{
	 rs+= vals[i].id +'='+ vals[i].value+'&';
	}
	var requestkey = document.getElementById(info.targetId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	rs+='request='+'Add'+requestkey;
	var t = askjson(rs);
    $("#stream1").append("<a>"+rs+"</a><br/>"); 
	t.complete(function(data){
	data = JSON.parse(data.responseText);
	$("#stream2").append("<a>"+JSON.stringify(data)+"</a><br/>"); 	
	seqnz(data,0);
	});
});
			
jsPlumb.bind("dblclick", function(connection, originalEvent) { 
	jsPlumb.detach(connection);
	var src = connection.sourceId;
    var tgt = connection.targetId;
    $('#' + src + ' :input').prop('disabled',false);
    $('#' + tgt + ' :input').prop('disabled',false);
});	
});

function spawnme(tag,tid){
	 var allows = ["PTCSS","CSSTP","TPDivision","DivisionLocation"];
	 var divsize = ((Math.random()*100) + 50).toFixed();
	 var posx = (Math.random() * (600 - divsize)).toFixed();
     var posy = (Math.random() * (600 - divsize)).toFixed();
	 posx = parseInt(posx)+100;
	 posy = parseInt(posy)+100;
			var d2 = document.createElement("div");        
            d2.className = tag;
            d2.setAttribute("id", tag+tid);
            d2.style.top = posx+'px'; 
            d2.style.left = posy+'px'; 
            epid=tag+"e"+tid;
            d2.innerHTML = "<div class='ep' id="+epid+"><input class='idleField' value="+tag.substr(0,1)+tid+" type='text'/></div>";
			var d3 = document.createElement("div");
			d3.setAttribute("id", tag+tid+"prop");
			d3.className = "propmenu";
			popform(d3,tag,tid);
			d2.appendChild(d3);
            document.getElementById("demo").appendChild(d2);
			
			$('#'+tag+tid).dblclick(function() {
				var c1 = jsPlumb.getConnections({source:tag+tid});
				var c2 = jsPlumb.getConnections({target:tag+tid});
				if (c1.length==0 && c2.length==0) 
				{
				$(this).remove();
				}
				else alert("Dependency exists!");
			});
			
			$('#'+tag+tid).mousedown(function(event) {
			switch (event.which) {
            case 3:
            $("#"+tag+tid+"prop").toggle('fast');
            break;
			}
			});
			
            jsPlumb.draggable(jsPlumb.getSelector("#"+tag+tid));

            jsPlumb.makeSource($("#"+tag+"e"+tid), {
                parent:$("#"+tag+"e"+tid).parent(),
                anchor:"Continuous",
                connector:[ "StateMachine"],
                connectorStyle:{ strokeStyle:"#808080", lineWidth:3 },
                maxConnections:-1,
				Endpoint: "Dot",
				paintStyle:{ fillStyle:"#808080",radius:2},
				beforeDrop:function(params) { 
				if(allows.indexOf(document.getElementById(params.sourceId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","") + document.getElementById(params.targetId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ",""))!=-1)
					return true;
				else
				{
				alert("Not allowed!");
					return false;
				} 
				},
            });
			jsPlumb.makeTarget($("#"+tag+tid), {
                parent:$("#"+tag+tid).parent(),
                anchor:"Continuous",
                connector:[ "StateMachine"],
                connectorStyle:{ strokeStyle:"#808080", lineWidth:5 },
                maxConnections:1,
				Endpoint: "Dot",
				paintStyle:{ fillStyle:"#808080",radius:2},
				beforeDrop:function(params) { 
				if(allows.indexOf(document.getElementById(params.sourceId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","") + document.getElementById(params.targetId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ",""))!=-1)
					return true;
				else
				{
				alert("Not allowed!");
					return false;
				} 
				},
            });
}

function getme(key){
	return $.ajax({
			type: "POST",
			url: "lib/interact.php",
			data: "operate=" + key, 
			dataType: 'json'
		}); 
	}

	function askjson(key){
	return $.ajax({
			type: "POST",
			url: "lib/askjson.php",
			data: key, 
			dataType: 'json'
		}); 
	}
	
	function deploy(key){
	return $.ajax({
			type: "POST",
			url: "lib/driverccm.php",
			data: key, 
			dataType: 'json'
		}); 
	}

function seqnz(data,i){
	var t1 = deploy(data[i]);
	t1.complete(function(data){
	if(i<data.length) seqnz(data,i+1);
	});
}
function popform(d,tag,tid){
	var form = '';
	var so = "getfields" + "&table="+ tag;
	var x = getme(so);
	x.complete(function (data) {
	data = JSON.parse(data.responseText);
	
	for(var i =0;i < data.length; i++){
	if(i==0){
		form = form + "<input class=\"transpropbox\" onclick=\"this.focus();this.select();\" id=\""+data[i]['Field']+"\" value='"+data[i]['Field']+"' disabled></input><br /><br />";
	}else{
		form = form + "<input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\""+data[i]['Field']+"\" value='"+data[i]['Field']+"'></input><br /><br />";
	}
	
	}
	//form = form + "<a href=\"#\" id=\"s"+tag+tid+"prop"+"\" >Submit</a>";
	d.innerHTML = form; 
	$("#s"+tag+tid+"prop").click(function() {
			if(tag=="PT") {
			var tgt = tag+tid;
			var vals = $('#' + tgt + ' :input');
	var val = {};
	for(var i = 1;i<vals.length;i++)
	{
	val[vals[i].id] = vals[i].value;
	}
	var jval = JSON.stringify(val);
	jval = '{\\"request\\":\\"AddPT\\",' +jval.split('"').join('\\"').replace('{','');
    $("#stream").append("<a>"+jval+"</a><br/>"); 
			}
			$("#"+tag+tid+"prop").toggle('fast');
			});
	});
}