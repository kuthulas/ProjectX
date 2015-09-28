<?php
ini_set('error_reporting', E_ALL);
error_reporting(E_ALL);
ini_set('log_errors',TRUE);
ini_set('html_errors',TRUE);
ini_set('error_log','C:/error_log.txt');
ini_set('display_errors',TRUE);
$rel = 'drivesbc.jar';
$abs = realpath($rel);
exec('java -jar '.$abs,$output,$result);
echo json_encode($output);
?>