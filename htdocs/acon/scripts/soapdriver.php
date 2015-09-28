<?php
ini_set('max_execution_time',100);
$url= "https://Voss-Migration.voss.cluster:8181/webservices/8.0/ucFulfillment?wsdl";
$mxml = file_get_contents("clusters.xml");
$created_time = date("Y-m-d\TH:i:s\Z");
$mxml = str_replace("kuthulas",$created_time,$mxml);

$header1 =  "POST /webservices/8.0/ucFulfillment  HTTP/1.1";
$header2 =  "SOAPAction: \"\"";
$header3 =  "Host: 10.4.252.40:8181";
$header4 =  "Content-Length: ".strlen($mxml)."";
$header5 = "Expect:";

$yt =curl_init();
curl_setopt($yt, CURLOPT_SSL_VERIFYPEER,0);
curl_setopt($yt, CURLOPT_URL, $url);
curl_setopt($yt, CURLOPT_HTTPHEADER, Array($header1,$header2,$header3,$header4,$header5));
curl_setopt($yt, CURLOPT_POSTFIELDS, $mxml);
curl_setopt($yt, CURLOPT_RETURNTRANSFER, true);
curl_setopt($yt, CURLOPT_VERBOSE, true);

$rxml = curl_exec($yt);
//echo $rxml;
curl_close($yt);
$db = new PDO('mysql:host=127.0.0.1;dbname=hcs','root','',array(PDO::ATTR_PERSISTENT => true));
$db->query("DELETE FROM CLUSTERS");
$xml = simplexml_load_string($rxml);
$xml->registerXPathNamespace('ns5', 'http://webservice.api.visionoss.com/v8_0/ucFulfillment/');
$n = 1;
foreach($xml->xpath('//cucmClusterDetails') as $x) { 
$query1 = "INSERT INTO clusters (type,ptop,pleft";
$query2 = "VALUES (\"cluster\"";
$pt = 10*(int)$n;
$query2 .= ",\"".$pt."\",\"5\"";
$cpid = $x->callProcessingId;
$cust = $x->customerName;
$query1 .= ",cpid,customer";
$query2 .= ",\"".$cpid."\",\"".$cust."\"";
$nodes = array();
$m=1;
foreach($x->cucmServers as $y){
$node = $y->hostName;
$ip = $y->ipAddress;
$iscp =  $y->callProcessorEngine;  
if($iscp=="true") {
$query2 .= ",\"".$node."\",\"".$ip."\"";
$query1 .= ",name".$m.",ip".$m;
}
$m++;
}
$n++;
$ns = $m-1;
$query1 .= ",nodes)";
$query2 .= ",\"".$ns."\")";
$q = $query1.$query2;
$db->query($q);
}
echo $n-1;
?>
