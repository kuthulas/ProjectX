jsPlumb.ready(function() {
var bod = document.body;
menustring1 = '<h5>Levels</h5><a class="addnode" name="0" href="#">PT</a>&nbsp;<br/><a href="#" class="addnode" name="1">CSS</a>&nbsp;<br/><a href="#" name="2" class="addnode">TP</a>&nbsp;<br/>&nbsp;';
menustring2 = '<h5>Layers</h5><a id="addp" href="#" class="rmode">Hardware</a>&nbsp;<br/>|&nbsp;<a href="#">Services</a>&nbsp;<br/>|&nbsp;<a href="#">Endpoints</a>';
var d = document.createElement("div");
d.className = "menudiv";
d.innerHTML = menustring1 + "<br/>" + menustring2;
bod.appendChild(d);
jsPlumb.draggable($(".menudiv"));
});