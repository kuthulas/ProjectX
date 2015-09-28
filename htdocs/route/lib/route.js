var ndev = 0;
var con = [];
var calltype = "";
$(".button").click(function(){
if($("#call").val()!="select"){
spawnme($(this).attr("name"),ndev);
ndev++ ;
}
});

$("#addtype").click(function(){
$("#newtype").hide();
});


function spawnme(tag,tid){
	 var allows = ["CSSPT","PTTP","PTRP","RPRL", "RLRG", "TPCSS"];
			var d2 = document.createElement("div");        
            d2.className = tag;
            d2.setAttribute("id", tag+tid);
            d2.setAttribute("name", "topdiv");
            d2.style.left = 10+70*(ndev)+'px'; 
            epid=tag+"e"+tid;
            d2.innerHTML = "<div class='ep' id="+epid+"></div><a style='color:black;'><br/>"+tag.substr(0,3)+tid+"</a>";
			var d3 = document.createElement("div");
			d3.setAttribute("id", tag+tid+"prop");
			d3.className = "propmenu";
			d3.style.display = "none";
			popform(d3,tag,tid);
			d2.appendChild(d3);
            document.getElementById("canvas").appendChild(d2);
			
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
                connector:[ "Straight"],
                connectorStyle:{ strokeStyle:"black", lineWidth:2 },
                maxConnections:-1,
				Endpoint: "Blank",
				paintStyle:{ fillStyle:"green",radius:5},
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
                connectorStyle:{ strokeStyle:"black", lineWidth:2 },
                maxConnections:1,
				Endpoint: "Blank",
				paintStyle:{ fillStyle:"green",radius:5},
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

function popform(d,tag,tid){
	var form = '';
	var so = "getfields" + "&table="+ tag;
	var x = getme(so);
	x.complete(function (data) {
	data = JSON.parse(data.responseText);
	for(var i =0;i < data.length; i++){
		if(data[i]['Field'] == "action" || data[i]['Field'] == "transaction"){
			form = form + "<input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\""+tag+tid+data[i]['Field']+"\" value='"+data[i]['Field']+"' type=\"hidden\"></input><br /><br />";
			
		}else{
			form = form + "<input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\""+tag+tid+data[i]['Field']+"\" value='"+data[i]['Field']+"'></input><br /><br />";
		}
	}
	d.innerHTML = form; 
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
	
	
function deployRoute(key){
	return $.ajax({
			type: "POST",
			url: "lib/saveRoute.php",
			data: "data=" + key, 
			dataType: 'json'
		}); 
}	
	
	
jsPlumb.bind("dblclick", function(connection, originalEvent) { 
	jsPlumb.detach(connection);
	var src = connection.sourceId;
    var tgt = connection.targetId;
    $('#' + src + ' :input').prop('disabled',false);
    $('#' + tgt + ' :input').prop('disabled',false);
});	

jsPlumb.bind("jsPlumbConnection", function(info, originalEvent) {
    var src = info.sourceId;
    var tgt = info.targetId;
    con.push(info.connection);
    $('#' + src + ' :input').prop('disabled',true);
    $('#' + tgt + ' :input').prop('disabled',true);
});



$("#submit").click(function(){
	var action = $("#actionname").val();
	var base = parseFloat($("#canvas").css('font-size').replace("px",""));
	var submitData = new Array();
	d = 0; 
	$('div[name=topdiv]').each(function() {
		collectData($(this).attr('id'));	
	});
    for (var i=0;i<con.length;i++){
		var src = con[i].sourceId;
		var tgt = con[i].targetId;
		srce = document.getElementById(src);
		tgte = document.getElementById(tgt);
		srctype = srce.className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
		tgttype= tgte.className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
		if(srctype=="CSS" && tgttype=="PT"){
			datax = "kuthulas";
			var vals1 = $('#' + src + ' :input');
				var vals2= $('#' + tgt + ' :input');
		for(var i = 0;i<vals1.length;i++)
			{
				if(vals1[i].id == src+"transaction") {datax+= "|" + vals1[i].value;}
				if(vals1[i].id == src+"name") datax+= "|" + vals1[i].value;
			}
			for(var i = 0;i<vals2.length;i++) {
				if(vals2[i].id == tgt+"name") {datax+= "|" + vals2[i].value;}
			}
			datax+= "|" + 1;
			datax+= "|" + "AddCSSPT";
			deployRoute(datax);
		}
	}



	//$('#pid').val('value')


	/*for(int p=0;p<con.length;p++){
	var src = con[p].sourceId;
	var tgt = con[p].targetId;
	srce = document.getElementById(src);
	tgte = document.getElementById(tgt);
	srcleft = srce.offsetLeft/base;
	srctop = srce.offsetTop/base;
	tgtleft = tgte.offsetLeft/base;
	tgttop = tgte.offsetTop/base;
	srctype = srce.className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	tgttype= tgte.className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	var vals = $('#' + src + ' :input');
		for(var i = 0;i<vals.length;i++)
		{
		 vals[i].id;
		}
	}*/
});

function collectData(idElem){

		x = idElem;
		submitData = x;
		$('input[id*=' + x + ']').each(function() {
		
			submitData += "|" + $(this).val();
		//$(this).children().filter('input[id*=CSS0]').each(function() {
		//$("#"+$(this).attr('id') 'input[id*=CSS0]').each(function() {
		//alert($(this).val());
		});
		deployRoute(submitData);
		d++;

}