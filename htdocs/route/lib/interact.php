<?php
try
{
$db = new PDO('mysql:host=127.0.0.1;dbname=projectx','root','',array(PDO::ATTR_PERSISTENT => true));
$operate        = htmlspecialchars(trim($_POST['operate']));
switch ($operate){
case "getfields":
    $table = htmlspecialchars(trim($_POST['table']));
	$sth = $db->prepare("DESCRIBE ".$table);
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
case "savecxn":
	$src        = htmlspecialchars(trim($_POST['src']));
	$tgt        = htmlspecialchars(trim($_POST['tgt']));
	$type       = htmlspecialchars(trim($_POST['type']));;
	$tag1        = htmlspecialchars(trim($_POST['tag1']));
	$tag2        = htmlspecialchars(trim($_POST['tag2']));
	$tid1        = htmlspecialchars(trim($_POST['tid1']));
	$tid2        = htmlspecialchars(trim($_POST['tid2']));

	$query = "INSERT INTO cxnz (src,tgt,type) VALUES (\"".$src."\",\"".$tgt."\",\"".$type."\");";
	$db->query($query);
	$query = "INSERT INTO inv (tag,tid) VALUES (\"".$tag1."\",\"".$tid1."\");";
	$db->query($query);
	$query = "INSERT INTO inv (tag,tid) VALUES (\"".$tag2."\",\"".$tid2."\");";
	$db->query($query);
       break;
case "getcxnz":
	$sth = $db->prepare("SELECT * from cxnz");
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
       break;
       }
}
catch(Exception $e)
{
}
?>