<?php
$ind = 1;
	foreach($_POST as $key =>$value){
	$matrx[$key] = $value;
	$ind++;
	}
$rparams = json_encode($matrx);
$url = 'http://127.0.0.1:8888';
$header_array = array('Content-Type'=> 'application/json',
  'Content-Length'=> strlen($rparams),'Transfer-encoding'=> 'chunked');
  
$httpRequest_OBJ = new httpRequest($url, HTTP_METH_POST);
$httpRequest_OBJ->setHeaders = $header_array;
$httpRequest_OBJ->setContentType = 'Content-Type: application/json';
$httpRequest_OBJ->setBody($rparams);
//send the http request
$result = $httpRequest_OBJ->send();
//print out the result
echo ($httpRequest_OBJ->getResponseBody());
?>