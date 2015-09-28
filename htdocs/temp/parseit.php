<?php
$xml = simplexml_load_file("clusters-out.xml");
$xml->registerXPathNamespace('ns5', 'http://webservice.api.visionoss.com/v8_0/ucFulfillment/');
foreach ($xml->xpath('//customerName') as $item) echo $item."\n";
foreach ($xml->xpath('//name') as $item) echo $item."\n";
foreach ($xml->xpath('//callProcessingId') as $item) echo $item."\n";
foreach ($xml->xpath('//ipAddress') as $item) echo $item."\n";
?> 