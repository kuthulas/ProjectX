<?php
try
{
$db = new PDO('mysql:host=127.0.0.1;dbname=projectx','root','',array(PDO::ATTR_PERSISTENT => true));
$_data        = htmlspecialchars(trim($_POST['data']));

$saveData = explode("|", $_data);



	if(strpos($saveData[0], "CSS") !== false){

		$query = "INSERT INTO CSS (transaction,name,description,action) VALUES (\"".$saveData[1]."\",\"".$saveData[2]."\",\"".$saveData[3]."\",\""."AddCSS"."\")";
		print $query;
		$db->query($query);
	
	}elseif(strpos($saveData[0], "PT") !== false){
		$query = "INSERT INTO PT (transaction,name,description,action) VALUES (\"".$saveData[1]."\",\"".$saveData[2]."\",\"".$saveData[3]."\",\""."AddPT"."\")";
		print $query;
		$db->query($query);
	}elseif(strpos($saveData[0], "TP") !== false){
		$query = "INSERT INTO TP (transaction,description,pattern,`usage`,routePartitionName,callingSearchSpaceName,action) VALUES (\"".$saveData[1]."\",\"".$saveData[2]."\",\"".$saveData[3]."\",\"".$saveData[4]."\",\"".$saveData[5]."\",\"".$saveData[6]."\",\""."AddTP"."\")";
		print $query;
		$db->query($query);
	}elseif(strpos($saveData[0], "RP") !== false){
		$query = "INSERT INTO RP (transaction,name,description,action) VALUES (\"".$saveData[1]."\",\"".$saveData[2]."\",\"".$saveData[3]."\",\"".$saveData[4]."\")";
		print $query;
		$db->query($query);
	}elseif(strpos($saveData[0], "RL") !== false){
		$query = "INSERT INTO RL (transaction,name,description,action) VALUES (\"".$saveData[1]."\",\"".$saveData[2]."\",\"".$saveData[3]."\",\"".$saveData[4]."\")";
		print $query;
		$db->query($query);
	}elseif(strpos($saveData[0], "RG") !== false){
		$query = "INSERT INTO RG (transaction,name,description,action) VALUES (\"".$saveData[1]."\",\"".$saveData[2]."\",\"".$saveData[3]."\",\"".$saveData[4]."\")";
		print $query;
		$db->query($query);
	}elseif(strpos($saveData[0], "PH") !== false){
		$query = "INSERT INTO PH (transaction,name,description,product,class,protocol,callingSearchSpaceName,devicePoolName,commonPhoneConfigName,locationName,action) VALUES (\"".$saveData[1]."\",\"".$saveData[2]."\",\"".$saveData[3]."\",\"".$saveData[4]."\",\"".$saveData[5]."\",\"".$saveData[6]."\",\"".$saveData[7]."\",\"".$saveData[8]."\",\"".$saveData[9]."\",\"".$saveData[10]."\",\"AddPhone\")";
		print $query;
		$db->query($query);
	}
	elseif(strpos($saveData[0], "kuthulas") !== false){
		$query = "INSERT INTO CSSPT (transaction,name,routePartitionName,`index`,action) VALUES (\"".$saveData[1]."\",\"".$saveData[2]."\",\"".$saveData[3]."\",\"".$saveData[4]."\",\"AddCSSPT\")";
		print $query;
		$db->query($query);
	}

	/*$query = "INSERT INTO cxnz (src,tgt,type) VALUES (\"".$src."\",\"".$tgt."\",\"".$type."\");";
	$db->query($query);
	$query = "INSERT INTO inv (tag,tid) VALUES (\"".$tag1."\",\"".$tid1."\");";
	$db->query($query);
	$query = "INSERT INTO inv (tag,tid) VALUES (\"".$tag2."\",\"".$tid2."\");";
	$db->query($query);
	*/
     

}catch(Exception $e)
{
}
?>