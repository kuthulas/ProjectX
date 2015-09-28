jsPlumb.ready(function() {
var bod = document.body;
menustring1 = '<h5>Levels</h5><a class="addnode" name="0" href="#">Provider</a>&nbsp;<br/><a href="#" class="addnode" name="1">Reseller</a>&nbsp;<br/>&nbsp;<a href="#" name="2" class="addnode">Customer</a>&nbsp;<br/>&nbsp;<a href="#" name="3" class="addnode">Division</a>&nbsp;<br/>&nbsp;<a href="#" name="4" class="addnode">Location</a>';
menustring2 = '<h5>Layers</h5><a id="addp" href="#" class="rmode">Hardware</a>&nbsp;<br/>|&nbsp;<a href="#">Services</a>&nbsp;<br/>|&nbsp;<a href="#">Endpoints</a>';
var d = document.createElement("div");
d.className = "menudiv";
d.innerHTML = menustring1 + "<br/>" + menustring2;
bod.appendChild(d);
jsPlumb.draggable($(".menudiv"));
});