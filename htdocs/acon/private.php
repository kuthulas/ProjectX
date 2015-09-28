<?php 
define('USER', 'user'); 
define('PASSWORD', 'password'); 
if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) { 
header('WWW-Authenticate: Basic realm="My Realm"'); 
header('HTTP/1.0 401 Unauthorized'); echo 'You hit cancel, good on you.'; 
} 
elseif ( isset($_SERVER['PHP_AUTH_USER']) && $_SERVER['PHP_AUTH_USER'] == USER && isset($_SERVER['PHP_AUTH_PW']) && $_SERVER['PHP_AUTH_PW'] == PASSWORD ) {
header("Location: index.html");
 } 
 else { 
 header('HTTP/1.0 400 Bad Request'); echo "<p>You shall not pass!</p>"; 
 } 
 ?>