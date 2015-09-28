<?php
$start = (float) array_sum(explode(' ',microtime()));
ini_set('display_errors', "1");
$url= "https://HCS-CC-USM.voss.cluster:8181/webservices/8.0/ucFulfillment?wsdl";

$mxml=fread(STDIN,65536);

$created_time = date("Y-m-d\TH:i:s\Z");
$user = "webservice";
$pass = "Cisco123";
$requestaction = $argv[1];
$yt =curl_init();

//$sheader = simplexml_load_file("shead.xml");
$sheader =  "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ucf=\"http://webservice.api.visionoss.com/v8_0/ucFulfillment/\">\n";
$sheader .= "<soapenv:Header xmlns:wsa=\"http://www.w3.org/2005/08/addressing\"><wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"><wsse:UsernameToken wsu:Id=\"UsernameToken-74\"><wsse:Username>".$user."</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">".$pass."</wsse:Password><wsu:Created>".$created_time."</wsu:Created></wsse:UsernameToken></wsse:Security><wsa:Action>http://webservice.api.visionoss.com/v8_0/ucFulfillment/ucFulfillment/".$requestaction."</wsa:Action><wsa:MessageID>uuid:db69c4d4-2b7d-4392-bf2c-7bc930959f3e</wsa:MessageID></soapenv:Header>\n";

$header =   "POST /webservices/8.0/ucFulfillment  HTTP/1.1\r\n";
$header .=  "Accept-Encoding: gzip,deflate\r\n";
$header .=  "Content-Type: text/xml;charset=UTF-8\r\n";
$header .=  "SOAPAction: \"\"\r\n";
$header .=  "Connection: Keep-Alive\r\n";
$header .=  "User-Agent: Apache-HttpClient/4.1.1 (java 1.5)\r\n";
$header .=  "Host: 10.4.250.3:8181\r\n";
$header .=  "Content-Length: ".strlen($mxml.$sheader)."\r\n";
$header .=  "Content-Transfer-Encoding: text\r\n";
$header .=  "Connection-Close: close\r\n\r\n";
$header .=  $sheader;
$header .=  $mxml;

curl_setopt($yt, CURLOPT_SSL_VERIFYPEER,0);
curl_setopt($yt, CURLOPT_URL, $url);
curl_setopt($yt, CURLOPT_CUSTOMREQUEST, $header);
curl_setopt($yt, CURLOPT_RETURNTRANSFER, true);

$rxml=curl_exec($yt);

$xml = simplexml_load_string($rxml);
$xml->registerXPathNamespace('ns5', 'http://webservice.api.visionoss.com/v8_0/ucFulfillment/');
foreach($xml->xpath('//cucmClusterDetails') as $x) {
echo $x->callProcessingId;
echo("->");
echo $x->customerName;
echo("\n");
foreach($x->cucmServers as $y){
echo $y->hostName;
echo(",");
echo $y->ipAddress;
echo(",");
echo $y->callProcessorEngine;
echo("\n");
}
}
curl_close($yt);
$end = (float) array_sum(explode(' ',microtime()));
echo sprintf("%.4f",($end-$start))."seconds";
?>