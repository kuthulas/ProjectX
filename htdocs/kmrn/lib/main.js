jsPlumb.ready(function() {
var tid = [0,0,0,0,0];
    $(".addnode").click(function(){
    switch($(this).attr("name"))
{
case "Provider":
  spawnme("Provider",tid[0]);
  tid[0]++; 
  break;
case "Reseller":
  spawnme("Reseller",tid[1]);
  tid[1]++;
  break;
case "Customer":
  spawnme("Customer",tid[2]);
  tid[2]++;
  break;
case "Division":
  spawnme("Division",tid[3]);
  tid[3]++;
  break;
case "Location":
  spawnme("Location",tid[4]);
  tid[4]++;
  break;
case "Phone":
  spawnme("Phone",tid[5]);
  tid[5]++;
  break;
}
});

jsPlumb.bind("jsPlumbConnection", function(info, originalEvent) {
	var requestkey = document.getElementById(info.targetId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
    $("#stream").append("<a>Add"+requestkey+"</a><br/>"); 
});
    
jsPlumb.bind("jsPlumbConnectionDetached", function(info, originalEvent) {
 
            });
			
jsPlumb.bind("dblclick", function(connection, originalEvent) { 
jsPlumb.detach(connection);
});
    		
});

function spawnme(tag,tid){
var allows = ["ProviderReseller","ResellerCustomer","CustomerDivision","DivisionLocation","LocationPhone"];
var divsize = ((Math.random()*100) + 50).toFixed();
	 var posx = (Math.random() * (500 - divsize)).toFixed();
     var posy = (Math.random() * (500 - divsize)).toFixed();
			var d2 = document.createElement("div");        
            d2.className = tag;
            d2.setAttribute("id", tag+tid);
            d2.style.top = posx+'px'; 
            d2.style.left = posy+'px'; 
            epid=tag+"e"+tid;
            d2.innerHTML = "<div class='ep' id="+epid+"><input class='idleField' value="+tag.substr(0,1)+tid+" type='text'/></div>";
			if(tag=="Provider") {
			var d3 = document.createElement("div");
			d3.setAttribute("id", tag+tid+"prop");
			d3.className = "propmenu";
			d3.innerHTML = "<input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\"name\" value=></input><br /><br /><input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\"pipa\" value=></input><br /><br /><input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\"user\" value=></input><br /><br /><input class=\"propbox\" onclick=\"this.focus();this.select();\" id=\"pass\" value=></input><br /><br /><a href=\"#\" id=\"submitme\" >Submit</a>"; 
			d2.appendChild(d3);
			}
            document.getElementById("demo").appendChild(d2);
			
			$('#submitme').click(function() {
			if(tag=="Provider") {
			$("#stream").append("<a>AddProvider</a><br/>");
			$("#"+tag+tid+"prop").toggle('slow');
			
			}
			});
			
			$('#'+tag+tid).dblclick(function() {
				var c1 = jsPlumb.getConnections({sourceId:tag+tid});
				var c2 =jsPlumb.getConnections({targetId:tag+tid});
				if (c1.length==0 && c2.length==0) $(this).remove();
				else alert("Dependency exists!");
			});
			$('#'+tag+tid).mousedown(function(event) {
			switch (event.which) {
            case 3:
            alert('Object properties!');
            break;
			}
			});
			
            jsPlumb.draggable(jsPlumb.getSelector("#"+tag+tid));
            
			var eopt = 
            jsPlumb.makeSource($("#"+tag+"e"+tid), {
                parent:$("#"+tag+"e"+tid).parent(),
                anchor:"Continuous",
                connector:[ "StateMachine"],
                connectorStyle:{ strokeStyle:"#008000", lineWidth:3 },
                maxConnections:-1,
				Endpoint: "Dot",
				paintStyle:{ fillStyle:"#008000",radius:2},
				beforeDrop:function(params) { 
				if(allows.indexOf(document.getElementById(params.sourceId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","") + document.getElementById(params.targetId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ",""))!=-1)
					return true;
				else
				{
				
				alert(document.getElementById(params.sourceId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","") + document.getElementById(params.targetId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ",""));
				alert("Not allowed!");
					return false;
				} 
				},
            });
			jsPlumb.makeTarget($("#"+tag+tid), {
                parent:$("#"+tag+tid).parent(),
                anchor:"Continuous",
                connector:[ "StateMachine"],
                connectorStyle:{ strokeStyle:"#008000", lineWidth:5 },
                maxConnections:1,
				Endpoint: "Dot",
				paintStyle:{ fillStyle:"#008000",radius:2},
				beforeDrop:function(params) { 
				if(allows.indexOf(document.getElementById(params.sourceId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","") + document.getElementById(params.targetId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ",""))!=-1)
					return true;
				else
				{
				alert(document.getElementById(params.sourceId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ","") + document.getElementById(params.targetId).className.replace(" ui-draggable","").replace("ui-droppable","").replace(" ",""));
				alert("Not allowed!");
					return false;
				} 
				},
            });
            
            $('input[type="text"]').addClass("idleField");
       		$('input[type="text"]').focus(function() {
       			$(this).removeClass("idleField").addClass("focusField");
    		    if (this.value == this.defaultValue){ 
    		    	this.value = '';
				}
				if(this.value != this.defaultValue){
	    			this.select();
	    		}
    		});
    		$('input[type="text"]').blur(function() {
    			$(this).removeClass("focusField").addClass("idleField");
    		    if ($.trim(this.value) == ''){
			    	this.value = (this.defaultValue ? this.defaultValue : '');
				}
    		});
}