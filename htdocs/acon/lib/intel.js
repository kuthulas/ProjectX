function savecxni(i){
	var acxn = addconn[i];
	var label = acxn.getOverlay("label1").getLabel();
	var eps = acxn.endpoints;
	cpid = eps[0].getUuid().substr(-4);
	var srcepid =  eps[0].getUuid();
	var tgtepid =  eps[1].getUuid();
	var cxnid = acxn.sourceId + cpid +acxn.targetId;
	var srcid = acxn.sourceId;
	var tgtid = acxn.targetId;
	var srctype = String(document.getElementById(srcid).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	var tgttype = String(document.getElementById(tgtid).className).replace(" ui-draggable","").replace("ui-droppable","").replace(" ","");
	var rttrnkname = "(select rtpref from globals)||\"" + cpid + "\"";
	var rtlistname = "(select rtlistpref from globals)||\"" + cpid + "\"";
	var type = "pgw-sbc";
	acxn.setPaintStyle(detect);

	if(document.getElementById(acxn.sourceId).className.replace(" ui-draggable","") == "country") type = "country";
// Save connection

function restorepaint(){
acxn.setPaintStyle(connectorPaintStyle);
}
	var so = "savecxn" +
	"& cpid="+ cpid +
	"& id="+ cxnid +
	"& src="+ srcid +
	"& tgt="+ tgtid +
	"& label="+ label +
	"& srcepid="+ srcepid +
	"& tgtepid="+ tgtepid +
	"& type="+ type ;
	
	var x = getme(so);
	x.success(function (data) {
// Save connection options if savecxn is a success
	switch (srctype) {
    case "pgw":
	{
				switch (tgttype) {
						case "sbc":
							var dest = label.split(":");
							dest = dest[1];
							var port = "select sbcinport from globals";
						break;
						case "cluster":
							var dest = "select ip1 from clusters where cpid=\""+cpid+"\"";
							var port = "select portin from clusters where cpid=\""+cpid+"\"";
						break;
				}
				
	var trnkgrpname = "select ipttrnkout from globals";
	var svc = "select svc from globals";
	var sipprofile = "sipprofile";
	var distrib = "distrib";
	var mgcdomain = "select pipa from inv where name=\""+srcid+"\"";
	
	var s1 = "insertopgw" +
	"& cpid="+ cpid +
	"& id="+ cxnid +
	"& trnkgrpname="+ "select ipttrnkout from globals" +
	"& svc="+ "select svc from globals" +
	"& sipprofile="+ "sipprofile" +
	"& distrib="+ "OFF" +
	"& mgcdomain="+ "select pipa from inv where name=\""+srcid+"\"" +
	"& destination="+ dest +
	"& sipproxyport="+ port +
	"& rttrnkname="+ rttrnkname +
	"& rtlistname="+ rtlistname;
	
	var y = getme(s1);
	y.success(function (data) {
	restorepaint();
	});
	}
        break;
    case "sbc":
	{
				switch (tgttype) {
						case "pgw":
							var dest = "select pipa from inv where name=\"" + tgtid + "\"";
							var port = "5000"
						break;
						case "cluster":
							var dest = "select ip1 from clusters where cpid=\""+cpid+"\"";
							var port = "select portin from clusters where cpid=\""+cpid+"\"";
						break;
				}
				
	var vrf = "select vrf from clusters where cpid=\"" + cpid +"\"";
	var sigip = "select ip from sbcint where vrf=(" + vrf + ")";
	
	var s2 = "insertosbc" +
	"& id="+ cxnid +
	"& adjname="+ "ADJTo"+tgtid +
	"& description="+ "To " + tgtid + " for" + cpid +
	"& vrf="+ vrf +
	"& sigip="+ sigip +
	"& portin="+ "hi" +
	"& peerip="+ dest +
	"& peerport="+ port;
	
	var z = getme(s2);
	z.success(function (data) {
	restorepaint();
	});
	}
        break;
		case "country":
	{
	switch (tgttype) {
						case "pgw":
							
						break;
						case "sbc":
							
						break;
				}
	break;
	}
	}
	
//Process next connection
	if(i+1<addconn.length) {
	savecxni(i+1);
	}
	else {
	addconn = [];
	}
	});

}
