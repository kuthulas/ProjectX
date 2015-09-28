var bod = document.body;
menustring0 = '<div id="appstatus" style="font-weight:normal; text-align:center">Ready</div>';
menustring1 = '<hr style="border:0.1em solid #F2C24A;"><img class="addnode" name="0" src="lib/icon.png" width=25 height=25><br/><a title="Add a provider">Provider</a>&nbsp;<br/><img class="addnode" name="1" src="lib/icon.png" width=25 height=25><br/><a>Reseller</a>&nbsp;<br/><img class="addnode" name="2" src="lib/icon.png" width=25 height=25><br/><a title="Add a customer" >Customer</a>&nbsp;<br/><img class="addnode" name="3" src="lib/icon.png" width=25 height=25><br/><a>Division</a>&nbsp;<br/><img class="addnode" name="4" src="lib/icon.png" width=25 height=25><br/><a title="Add a location">Location</a>&nbsp;<br/><img class="addnode" name="5" src="lib/icon.png" width=25 height=25><br/><a title="Add a Phone">Phone</a>';
menustring2 = '<hr style="border:0.1em solid #F2C24A;"><h5 style="color:#F2C24A;text-align:center">Layers</h5><a class="addnode" name="0" href="#" title="add a provider">Hardware</a>&nbsp;<br/><a href="#" class="addnode" name="1">Resources</a>&nbsp;<br/><a href="#" name="2" class="addnode">Services</a>';
menustring3 = '<hr style="border:0.1em solid #F2C24A;"><h5 style="color:#F2C24A;text-align:center">Tools</h5><img class="extool" id="loadbt" href="#" src="lib/load.png" width=25 height=25><br/><img class="extool" id="savebt" href="#" src="lib/save.png" width=25 height=25><br/><hr style="border:0.1em solid #F2C24A;">';
var d = document.createElement("div");
d.className = "menudiv";
d.setAttribute("id", "sidebar");
d.innerHTML = menustring0+menustring1+"<br/>"+menustring3;
bod.appendChild(d);
$("#savebt").click(function() {
savebtfn();
});
var auto=1;
var s = getme("getdevices");
s.success(function (data) {
	for(var x = 0; x < data.length; x++){
	spawnme(data[x]['tag'],data[x]['tid']);
	}
	var s = getme("getcxnz");
	s.success(function (data) {
for(var x = 0; x < data.length; x++){
jsPlumb.connect({source:data[x]['src'], target:data[x]['tgt']});
}
auto=0;
	});
});

var tid = [0,0,0,0,0,0];
var etypes = ["Provider","Reseller","Customer","Division","Location","Phone"];
    $(".addnode").click(function(){
    spawnme(etypes[parseInt($(this).attr("name"))],tid[parseInt($(this).attr("name"))]+1);
    tid[parseInt($(this).attr("name"))]++; 
	});

var connections = [];
var addcon=[];
var delcon=[];
var detect = {lineWidth:2, strokeStyle:"#15DC93", joinstyle:"round"};
var connectorPaintStyle = { strokeStyle:"black", lineWidth:3};

