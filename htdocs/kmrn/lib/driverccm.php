<?php
$action = htmlspecialchars(trim($_POST['action']));
$ind = 1;
	foreach($_POST as $key =>$value){
	if ($ind > 1) $pars[$key] = $value;
	$ind++;
	}
	
	//print ("cucm ip is ==>" . $pars['cucmip']);
	
            $client = new SoapClient("AXLAPI.wsdl",
                array('trace'=>true,
               'exceptions'=>true,
               'location'=>"https://10.78.97.111:8443/axl",
               //'location'=>"https://".$pars['cucmip'].":8443/axl",
               'login'=>'administrator',
               'password'=>'hcs@123',
            ));
			
			
	switch ($action){
case "AddCSS":
           $client->addCSS(array("css"=>$pars));
		   sleep(3);
		   break;
case "AddPT":
           $client->addRoutePartition(array("routePartition"=>$pars));
		   sleep(3);
		   break;
		   
case "AddTP":
			print "inside TP";
           $client->addTransPattern(array("transPattern"=>$pars));
		   sleep(3);
		   break;
case "AddCSSPT":
           $client->updateCss(array("name"=>$pars['name'], "addMembers"=>array("member"=>$pars)));
		   sleep(3);
		   break;
case "AddPhone":
			

			//Add a Line. Get the UUID to use for Phone
			$response =  $client->__soapCall("addLine", array("newLine"=>array("line"=>array(
			"pattern"=>$pars['directoryNumber'],
			"usage"=>"Device",
			"routePartitionName"=>$pars['routePartitionName'],
			))));
			
			$lineuuid = $response->return;
			
			print "AddLine returned Line UUID: ".$lineuuid."<br>\n";
			
			print_r ($pars);
			
			
			//Add a Phone with the line UUID as above
			$pars['lines'] = array("line"=>array("index"=>"1","dirn"=>array("uuid"=>$lineuuid,"usage"=>"Device","pattern"=>$pars['directoryNumber'])));
			
			//$response = $client->addPhone(array("phone"=>$pars, "lines"=>array("line"=>array("index"=>"2","dirn"=>array("uuid"=>$lineuuid,"usage"=>"Device","pattern"=>"801001"), "lineIdentifier"=>array("directoryNumber"=>"801001","routePartitionName"=>"Site01")))));
			
			
			unset($pars['directoryNumber']);
			unset($pars['routePartitionName']);
			
			$response = $client->addPhone(array("phone"=>$pars));
			print ($response->return);
			//$client->addPhone(array("phone"=>$pars, "lines"=>);
			sleep(3);
			break;
			}
?>