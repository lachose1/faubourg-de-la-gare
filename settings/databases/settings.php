<?php

//header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$dbSettings = array(
					"dbname"=>"gare_condos",
					"dbUser"=>"gare_condos_user",
					"dbPass"=>"-g4r3_c0nd05_u53r*",
					"host"=>"localhost");

$db = new PDO('mysql:host=' . $dbSettings['host'] . ';dbname=' . $dbSettings['dbname'] . ';charset=utf8', $dbSettings['dbUser'], $dbSettings['dbPass']);
?>