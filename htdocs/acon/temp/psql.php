<?php
$db = mysql_connect("localhost","root");
mysql_select_db("hcs", $db);
//$operate = htmlspecialchars(trim($_POST['operate']));
//switch ($operate){
//case "getdevices":
$result = mysql_query("select * from inv;",$db);
echo json_encode(mysql_fetch_assoc($result));
//break;
//}
?>