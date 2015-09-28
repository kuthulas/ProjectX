<?php
try
{
$db = new PDO('mysql:host=127.0.0.1;dbname=hcs','root','',array(PDO::ATTR_PERSISTENT => true));
$operate        = htmlspecialchars(trim($_POST['operate']));
switch ($operate){
case "getfields":
    $table = htmlspecialchars(trim($_POST['table']));
	$sth = $db->prepare("DESCRIBE ".$table);
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