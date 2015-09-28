jsPlumb.bind("jsPlumbConnection", function(info, originalEvent) {
    var rs= '';
    var src = info.sourceId;
    var tgt = info.targetId;
    $('#' + src + ' :input').prop('disabled',true);
    $('#' + tgt + ' :input').prop('disabled',true);
	if(auto==0){
	var vals = $('#' + tgt + ' :input');
	var val = {};
	for(var i = 0;i<vals.length;i++)
	{
	 rs+= vals[i].id +'='+ vals[i].value+'&';
	}
	var requestkey = document.getElementById(info.targetId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	rs+='request='+'Add'+requestkey;
	//rs+='&cucmip='+'10.78.97.111';
	var t = askjson(rs);
	console.log("t ==>"+JSON.stringify(t));
    $("#stream1").append("<a>"+rs+"</a><br/>"); 
	t.complete(function(data){
	console.log("data response ==>"+data.responseText);
	data = JSON.parse(data.responseText); 	
	seqnz(info,data,0);
	});
	}
});

jsPlumb.bind("dblclick", function(connection, originalEvent) { 
	jsPlumb.detach(connection);
	var src = connection.sourceId;
    var tgt = connection.targetId;
    $('#' + src + ' :input').prop('disabled',false);
    $('#' + tgt + ' :input').prop('disabled',false);
});	

function spawnme(tag,tid){
	 var allows = ["ProviderReseller","ResellerCustomer","CustomerDivision","CustomerLocation","LocationPhone","DivisionLocation"];
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
            d2.innerHTML = "<div class='ep' id="+epid+"><a style='color:black;'>"+tag.substr(0,1)+tid+"</a></div>";
			var d3 = document.createElement("div");
			d3.setAttribute("id", tag+tid+"prop");
			d3.className = "propmenu";
			d3.style.display = "none";
			//d3.setAttribute("disabled", true);
			popform(d3,tag,tid);
			d2.appendChild(d3);
            document.getElementById("demo").appendChild(d2);
			
			$('#'+tag+tid).dblclick(function() {
				//alert("Double clicked");
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
                connector:[ "Straight"],
                connectorStyle:{ strokeStyle:"black", lineWidth:3 },
                maxConnections:-1,
				Endpoint: "Blank",
				paintStyle:{ fillStyle:"black",radius:2},
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
                connector:[ "Straight"],
                connectorStyle:{ strokeStyle:"black", lineWidth:3},
                maxConnections:1,
				Endpoint: "Blank",
				paintStyle:{ fillStyle:"black",radius:2},
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

function updatecxnz(conn, changetype) {
if (changetype=="add") {
				connections.push(conn);
				addcon.push(conn);
				}
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
	
	console.log(key);
	
	return $.ajax({
			type: "POST",
			url: "lib/askjson.php",
			data: key, 
			dataType: 'json'
		}); 
	}
	
	function deploy(key){
	
		//key += "&cucmip="+"10.78.97.111";
		
		//console.log("Stringifed JSON" + JSON.stringify(key));
		//key.push({cucmip: "10.78.97.111"});
		
		//alert(JSON.stringify(key));
	
	return $.ajax({
			type: "POST",
			url: "lib/driverccm.php",
			data: key, 
			dataType: 'json'
		}); 
	}
	

	
	
	
function savebtfn() {
var ch=0;
	$("#appstatus").html("<a>Saving.. Please wait!</a>");
	$("#appstatus").fadeIn();
	alert(addcon.length);
	if(delcon.length>0){remcxni(0);ch++;} 
	else if(addcon.length>0){savecxni(0); ch++;}
	
	if (ch==0){
	$("#appstatus").html("<a>Layout saved!</a>");   
	$("#appstatus").fadeIn();
	$("#appstatus").fadeOut(500, "linear");
	}
ch=0; 
}

function seqnz(info,data,i){

	//alert(JSON.stringify(data));

	if(data[i][0]=== undefined){
	
		//alert('inside undefined');
		if(i+1<data.length) seqnz(info,data,i+1); else updatecxnz(info.connection,"add");
	}
	else 
	{
	
		//alert('inside else undefined');
		$("#stream2").append("<a>"+JSON.stringify(data[i][0])+"</a><br/>");
		//alert(deploy(data[i][0]));
		//data[i][0].push({cucmip: "10.78.97.111"});
		//console.log("console log" + JSON.stringify(data[i][0]));
		//data[i][0]['cucmip'] = '10.78.97.111';
		//data[i][0]['cucmip'] = $("CUCM").val(); 
		//console.log("CUCM IP ==>" + $("CUCM").val());
		//console.log("console log" + data[i][0]['description'].toString());
		
		var t1 = deploy(data[i][0]);
		
		t1.complete(function(d){
			if(i+1<data.length) seqnz(info,data,i+1);
			else updatecxnz(info.connection,"add");
		});
	}
}

function popform(d,tag,tid){
	var form = '';
	var so = "getfields" + "&table="+ tag;
	var x = getme(so);
	x.complete(function (data) {
	data = JSON.parse(data.responseText);
	for(var i =0;i < data.length; i++){
	form = form + "<input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\""+data[i]['Field']+"\" value='"+data[i]['Field']+"'></input><br /><br />";
	}
	d.innerHTML = form; 

	$("#s"+tag+tid+"prop").click(function() {
			if(tag=="Provider") {
			var tgt = tag+tid;
			var vals = $('#' + tgt + ' :input');
	var val = {};
	for(var i = 1;i<vals.length;i++)
	{
	val[vals[i].id] = vals[i].value;
	}
	var jval = JSON.stringify(val);
	jval = '{\\"request\\":\\"AddProvider\\",' +jval.split('"').join('\\"').replace('{','');
    $("#stream").append("<a>"+jval+"</a><br/>"); 
			}
			$("#"+tag+tid+"prop").toggle('fast');
			});
	});
}

function saveit(id, type){
	x = document.getElementById(id); 
	var base = parseFloat($(".pgw").css('font-size').replace("px",""));
	var saveoptions = "modify" +"& name="+ id +"& type="+ type +"& top="+ x.offsetTop/base +"& left="+ x.offsetLeft/base;
	getme(saveoptions);
}