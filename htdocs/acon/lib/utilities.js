//-------------------------------------------------------------------------------------------------------------------------------------
$("#togglelog").click(function() {
$("#log").slideToggle();
});
//-------------------------------------------------------------------------------------------------------------------------------------
$("#shcountries").click(function() {
jsPlumb.getSelector(".country").toggle('slide'); 
jsPlumb.getSelector("#stage").toggleClass("stage1");
//jsPlumb.repaintEverything();
});
//-------------------------------------------------------------------------------------------------------------------------------------
$("#syncbt").click(function() {
$.ajax({
			type: "POST",
			url: "/scripts/execjar.php",
			data: "", 
			dataType: 'json',
			success: function () { 
                showsbcint();
            }
		});
});
//-------------------------------------------------------------------------------------------------------------------------------------
$("#vossbt").click(function() {
$("#list").html("<a>Contacting Domain Manager</a>");
$("#list").fadeIn();
var blik = window.setInterval(function(){
$("#list").fadeIn();
$("#list").fadeOut();
},500);
$.ajax({
			type: "POST",
			url: "/scripts/soapdriver.php",
			data: "", 
			dataType: 'text',
			success: function(){window.clearInterval(blik);},
			complete: function (data) {
				//data = jQuery.parseJSON(data['responseText']);
				if(data['responseText']==0)$("#list").html("<a>No cluster found!</a>");
				else $("#list").html("<a>"+data['responseText']+" clusters discovered. Application reloading!</a>");
				$("#list").fadeIn();
				setTimeout("window.location.reload()",2000);
            },
			error: function(){$("#list").html("<a>Error!</a>");
			$("#list").fadeIn();
			}
		});
});
//-------------------------------------------------------------------------------------------------------------------------------------
function showsbcint(){
	$("#inform").remove();
	var sig = getme("sbcints");
	sig.success(function (data) {
	var s = "<a href=\"#\" onclick=\"$('#inform').remove()\"> [Close] </a>"
	var y = "<div id=\"inform\"></div>"
	$("#main").append(y);
	jsPlumb.draggable(jsPlumb.getSelector("#inform"));
	s = s + "<span><b>Border Element explored! Discovered Interfaces:</b></span><br/><br/><table class=\"tabla\"><tr><th>Interface</th><th>VRF Identifier</th><th>Destination Address</th></tr>";
					for (var j = 0; j < data.length; j++) {
						s = s + "<tr><td>" + data[j]['interface'] + "</td>" + "<td>" + data[j]['vrf'] + "</td><td>" + data[j]['ip'] + "</td></tr>";
					}
	$("#inform").html(s);
	});
}
//------------------------------------------------------------------------------------------------------------------------------
$("#testcall").click(function() {
	$("#phone").remove();
	var s = "<table><tr><td>User:</td><td><input id='myuser' value='kuthulas' style='width:5em;'></td></tr><tr><td>Pass:</td><td><input id='mypass' style='width:5em;' type='password' value='hcs@123'><td></tr><tr><td>cucm:</td><td><input id='myucm' value='10.5.11.101' style='width:5em;'><td></tr></table><a id=\"logmein\">Login</a>.<a href=\"#\" onclick=\"$(this).parent().remove()\"> [X] </a>";
	var y = "<div id=\"phone\"></div>"
	$("#stage").append(y);
	jsPlumb.draggable(jsPlumb.getSelector("#phone"));
	$("#phone").html(s);
		$("#logmein").click(function(){
		
		$("#phone").cwic('init',{
	ready: function() {
		$(this).cwic('registerPhone',{
		user: $("#myuser").val(),
		password: $("#mypass").val(),
		cucm: $("#myucm").val(),
		success: function() {
		$("#list").html("<a>Registration Success!</a>");
		$("#list").fadeIn();
		$("#list").fadeOut();
		var s = "<table><tr><td><input id='number' style='width:5em;'></th></tr></table><a id=\"callbtn\">Dial</a><a style='width:auto;display:none;' id=\"can\"></a><a id='endbtn' style='display:none;'>End</a></div><a href=\"#\" onclick=\"$(this).parent().remove()\"> [X] </a>";
				$("#phone").html(s);
				$("#callbtn").click(function() {
	var num = $("#number").val();
	var ob = {participant: {recipient: num}};
	$("#phone").cwic('startConversation', ob);
	});
	
	$("#phone").bind('conversationStart.cwic', function(event, conversation){
	$("#can").text('Calling '+conversation.participant.recipient);
	$("#can").show();
	$("#endbtn").show();
	});
	
	$("#endbtn").click(function() { 
	$("#phone").cwic('endConversation');
	});
	
	$("#phone").bind('conversationEnd.cwic', function(event, conversation) {
	$("#can").hide();
	$("#endbtn").hide();
	});
		}
		});
	}
	});

});
});
//------------------------------------------------------------------------------------------------------------------------------

