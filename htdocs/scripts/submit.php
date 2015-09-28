<?php
ini_set('error_reporting', E_ALL);
error_reporting(E_ALL);
ini_set('log_errors',TRUE);
ini_set('html_errors',TRUE);
ini_set('error_log','C:/error_log.txt');
ini_set('display_errors',TRUE);
ob_start();
try
{
$db = new PDO('mysql:host=127.0.0.1;dbname=hcs','root','',array(PDO::ATTR_PERSISTENT => true));
$operate        = htmlspecialchars(trim($_POST['operate']));
switch ($operate){

case "add":
	$name        = htmlspecialchars(trim($_POST['name']));
	$customer        = htmlspecialchars(trim($_POST['customer']));
	$address        = htmlspecialchars(trim($_POST['address']));
	$portin        = htmlspecialchars(trim($_POST['portin']));
	$portout        = htmlspecialchars(trim($_POST['portout']));
	$cpid        = htmlspecialchars(trim($_POST['cpid']));
	$type        = htmlspecialchars(trim($_POST['type']));
	$left        = htmlspecialchars(trim($_POST['left']));
	$top        = htmlspecialchars(trim($_POST['top']));
	
	$query = "INSERT INTO clusters (type, top, left, name, customer, address, portin, portout, cpid) VALUES (\"".$type."\",\"".$top."\",\"".$left."\",\"".$name."\",\"".$customer."\",\"".$address."\",\"".$portin."\",\"".$portout."\",\"".$cpid."\");";
	$db->query($query);
       break;
	   
case "delete":
	$delcname = htmlspecialchars(trim($_POST['delcname']));
	$query = "DELETE FROM clusters where name=\"".$delcname."\";";
	$db->query($query);
       break;
	   
case "dpprof":
	$pname = htmlspecialchars(trim($_POST['name']));
	$query = "DELETE FROM pprofiles where name=\"".$pname."\";";
	$db->query($query);
       break;
	   
case "load":
	$sth = $db->prepare("SELECT * from clusters");
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "modify":
	$name        = htmlspecialchars(trim($_POST['name']));
	$top        = htmlspecialchars(trim($_POST['top']));
	$left        = htmlspecialchars(trim($_POST['left']));
	$type        = htmlspecialchars(trim($_POST['type']));
	if($type == "cluster")
	{
	$query = "UPDATE clusters SET ptop=\"".$top."\", pleft=\"".$left."\" WHERE name1=\"".$name."\";";
	}
	else
	{
	$query = "UPDATE inv SET ptop=\"".$top."\", pleft=\"".$left."\" WHERE name=\"".$name."\";";
	} 
	$db->query($query);
       break;

case "getcxnz":
	$sth = $db->prepare("SELECT * from cxnz");
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "getppgw":
	$sth = $db->prepare("SELECT * from ppgw");
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;

case "pprofiles":
	$sth = $db->prepare("SELECT * from pprofiles");
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;

case "getports":
	$sth = $db->prepare("SELECT * FROM ports");
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "savecxn":
	$cpid        = htmlspecialchars(trim($_POST['cpid']));
	$src        = htmlspecialchars(trim($_POST['src']));
	$tgt        = htmlspecialchars(trim($_POST['tgt']));
	$srcepid        = htmlspecialchars(trim($_POST['srcepid']));
	$tgtepid        = htmlspecialchars(trim($_POST['tgtepid']));
	$type       = htmlspecialchars(trim($_POST['type']));;
	$id			= htmlspecialchars(trim($_POST['id']));
	if(isset($_POST['vrflabel']) && isset($_POST['profilelabel'])){
	$vrflabel			= htmlspecialchars(trim($_POST['vrflabel']));
	$profilelabel			= htmlspecialchars(trim($_POST['profilelabel']));
	$query = "INSERT INTO cxnz (id,vrflabel,profilelabel,cpid,type,src,tgt,srcepid,tgtepid) VALUES (\"".$id."\",\"".$vrflabel."\",\"".$profilelabel."\",\"".$cpid."\",\"".$type."\",\"".$src."\",\"".$tgt."\",\"".$srcepid."\",\"".$tgtepid."\");";
	}
	else if(isset($_POST['vrflabel'])){
	$vrflabel			= htmlspecialchars(trim($_POST['vrflabel']));
	$query = "INSERT INTO cxnz (id,vrflabel,cpid,type,src,tgt,srcepid,tgtepid) VALUES (\"".$id."\",\"".$vrflabel."\",\"".$cpid."\",\"".$type."\",\"".$src."\",\"".$tgt."\",\"".$srcepid."\",\"".$tgtepid."\");";
	}
	else {
	$profilelabel			= htmlspecialchars(trim($_POST['profilelabel']));
	$query = "INSERT INTO cxnz (id,profilelabel,cpid,type,src,tgt,srcepid,tgtepid) VALUES (\"".$id."\",\"".$profilelabel."\",\"".$cpid."\",\"".$type."\",\"".$src."\",\"".$tgt."\",\"".$srcepid."\",\"".$tgtepid."\");";
	}
	$db->query($query);
       break;
	   
case "insertopgw":
	$query = "INSERT INTO opgw VALUES (";
	$ind = 1;
	foreach($_POST as $key =>$value){
	if($ind>1)
	{
	if (substr($value,0,1)=="("){
	$query .= $value;
	}
	else{
	$query .= "\"".$value."\"";
	}
	if($ind != count($_POST)) {
	$query .= ",";
	}
	}
	$ind++;
	}
	$query .= ");";
	$db->query($query);
       break;

case "cpprof":
	$query = "INSERT INTO pprofiles VALUES (";
	$ind = 1;
	foreach($_POST as $key =>$value){
	if($ind>1)
	{
	$query .= "\"".$value."\"";
	if($ind != count($_POST)) {
	$query .= ",";
	}
	}
	$ind++;
	}
	$query .= ");";
	$db->query($query);
break;
	   
case "insertosbc":
	$query = "INSERT INTO osbc VALUES (";
	$ind = 1;
	foreach($_POST as $key =>$value){
	if($ind>1)
	{
	if (substr($value,0,1)=="("){
	$query .= $value;
	}
	else{
	$query .= "\"".$value."\"";
	}
	if($ind != count($_POST)) {
	$query .= ",";
	}
	}
	$ind++;
	}
	$query .= ");";
	$db->query($query);
       break;
	   
case "modlabel":
	$query = "update cxnz set ";
	$ind = 1;
	foreach($_POST as $key =>$value){
	if($ind==2) {$cxnid = $value;}
	if($ind>2)
	{
	$query .= $key."=\"".$value."\"";
	if($ind != count($_POST)) {
	$query .= ",";
	}
	}
	$ind++;
	}
	$query .= " where id=\"".$cxnid."\";";
	$db->query($query);
       break;
	   
case "delcxn":
	$id        = $_POST['id'];
	$query1 = "DELETE FROM CXNZ WHERE id=\"".$id."\"";
	$query2 = "DELETE FROM opgw WHERE id=\"".$id."\"";
	$query3 = "DELETE FROM osbc WHERE id=\"".$id."\"";
	$db->query($query1);
	$db->query($query2);
	$db->query($query3);
       break;
	   
case "savepstndest":
	$code        = $_POST['code'];
	$ip        = $_POST['ip'];
	$port        = $_POST['port'];
	$query1 = "UPDATE countries SET ip=\"".$ip."\", port=\"".$port."\" WHERE code=".$code;
	$db->query($query1);
       break;
	   
case "saveportbox":
	$id        = $_POST['id'];
	$value        = $_POST['value'];
	$query1 = "DELETE FROM ports where id=\"".$id."\"";
	$query2 = "INSERT INTO ports VALUES (\"".$id."\",\"".$value."\");";
	$db->query($query1);
	$db->query($query2);
       break;

case "savedevice":
	$name        = $_POST['name'];
	$pipa        = $_POST['pipa'];
	$user        = $_POST['user'];
	$pass        = $_POST['pass'];
	$oldname        = $_POST['oldname'];
	$query = "UPDATE inv SET name=\"".$name."\",pipa=\"".$pipa."\",user=\"".$user."\",pass=\"".$pass."\" WHERE name=\"".$oldname."\"";
	$db->query($query);
       break;
	   
case "sbcints":
	$sth = $db->prepare("SELECT * from sbcint");
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "getcountries":
	$sth = $db->prepare("SELECT * from countries");
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "getdevices":
	$sth = $db->prepare("SELECT * from inv");
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "tpgw":
	$query = "SELECT * FROM tpgw WHERE ";
	$query2 = " Order By Field(tag";
	$ind = 1;
	foreach ($_POST as $k =>$tag){
	if($ind>1){
	$query .= "tag=\"".$tag."\"";
	$query2 .= ",\"".$tag."\""; 
	if($ind!=count($_POST))$query .= " OR "; 
	else $query2 .= ")";
	}
	$ind++;
	}
	$sth = $db->prepare($query.$query2);
	$sth->execute(); 
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "opgw":
	$id        = $_POST['id'];
	$query = "SELECT * FROM opgw WHERE id=\"".$id."\"";
	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "tsbc":
	$query = "SELECT * FROM tsbc WHERE ";
	$query2 = " Order By Field(tag";
	$ind = 1;
	foreach ($_POST as $k =>$tag){
	if($ind>1){
	$query .= "tag=\"".$tag."\"";
	$query2 .= ",\"".$tag."\""; 
	if($ind!=count($_POST))$query .= " OR "; 
	else $query2 .= ")";
	}
	$ind++;
	}
	$sth = $db->prepare($query.$query2);
	$sth->execute(); 
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "osbc":
	$id        = $_POST['id'];
	$query = "SELECT * FROM osbc WHERE id=\"".$id."\"";
	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "allosbc":
	$query = "SELECT * FROM osbc";
	$sth = $db->prepare($query);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
	   
case "trnkidupdate":
	$key        = $_POST['key'];
	switch($key){
	case "ip":
	$db->query("UPDATE globals SET ipttrnkgrpin=ipttrnkgrpin+1");
	$db->query("UPDATE globals SET ipttrnkgrpout=ipttrnkgrpout+1");
	break;
	case "pstn":
	$db->query("UPDATE globals SET pstntrnkgrpin=pstntrnkgrpin+1");
	$db->query("UPDATE globals SET pstntrnkgrpout=pstntrnkgrpout+1");
	break;
	}
	break;
	
case "modosbc":
	$query = "UPDATE osbc SET ";
	$ind = 1;
	foreach($_POST as $key =>$value){
	if($ind>1)
	{
	$query .= $key."=\"".$value."\"";
	if($ind != count($_POST)) {
	$query .= ",";
	}
	}
	$ind++;
	}
	$query .= ";";
	$db->query($query);
       break;

case "modopgw":
	$query = "UPDATE opgw SET ";
	$ind = 1;
	foreach($_POST as $key =>$value){
	if($ind>1)
	{
	$query .= $key."=\"".$value."\"";
	if($ind != count($_POST)) {
	$query .= ",";
	}
	}
	$ind++;
	}
	$query .= ";";
	$db->query($query);
       break;
}
}
catch(Exception $e)
{
print 'Exception : '.$e->getMessage();
}
$contents = ob_get_flush();
file_put_contents("C:/application.log",$contents,FILE_APPEND);
?>