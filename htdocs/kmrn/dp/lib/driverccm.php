<?php
$action = htmlspecialchars(trim($_POST['instruction']));
var $pars;
$ind = 1;
	foreach($_POST as $key =>$value){
	if ($ind > 1) $pars[$key] = $value;
	$ind++;
	}
            $client = new SoapClient("AXLAPI.wsdl",
                array('trace'=>true,
               'exceptions'=>true,
               'location'=>"https://10.78.97.111:8443/axl",
               'login'=>'ccmadmin',
               'password'=>'hcs@123!',
            ));
			
			
	switch ($action){
case "AddCSS":
           $client->addCSS(array("css"=>$pars));
case "Addpartition":
           $client->addCSS(array("routePartition"=>$pars));
case "AddTP":
           $client->addCSS(array("transPattern"=>$pars));
case "AddCSSPT":
           $client->updateCss(array("addMembers"=>array("member"=>$pars)));
		   }
        ?>