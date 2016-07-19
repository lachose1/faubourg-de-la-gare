<?php
require_once('settings.php'); 
if($_SERVER['REQUEST_METHOD'] == "GET") {
	// if(!empty($_GET['limit']))
	echo json_encode(getCondos());
}
// if($_SERVER['REQUEST_METHOD'] == "DELETE") {
// 	echo json_encode(deleteActions());
// }
// if($_SERVER['REQUEST_METHOD'] == "POST") {
// 	$json = file_get_contents('php://input');
	// if($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] == 'PUT') {
	// 	//This is an UPDATE call
	// 	if(!empty($json))
	// 		return json_encode(updatePrice());
	// }
	// if($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'] == 'DELETE') {
	// 	//This is a DELETE call
	// 	die("SUPPPPP");
	// // 	if(!empty($_GET['id'] && !empty($_GET['quantity'])))
	// // 		return json_encode(deletePriceFromQuantity($_GET['id'], $_GET['quantity']));
	// }
	// else {
	// 	//This is an ADD call
	// if(!empty($json))
	// 	return json_encode(addAction($json));
	// }
// }

function getCondos() {
	global $db;

	$stmt = $db->query("SELECT
							id,
							name,
							sold
						FROM
							condos
						ORDER BY
							id ASC");

    if(!empty($stmt))
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    else
      return array();
}
?>