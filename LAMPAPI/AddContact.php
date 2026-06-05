<?php

/*ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
*/
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: false');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
{
	http_response_code(200);
	exit();
}


$inData = getRequestInfo();

//echo json_encode($inData);
//exit();

$firstName = isset($inData["FirstName"]) ? $inData["FirstName"] : "";
$lastName = isset($inData["LastName"]) ? $inData["LastName"] : "" ;
$phoneNumber = isset($inData["PhoneNumber"]) ? $inData["PhoneNumber"] : "" ;
$emailAddress = isset($inData["EmailAddress"]) ? $inData["EmailAddress"] : "" ;
$userID = isset($inData["UserID"]) ? $inData["UserID"] : "" ;


$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "SakuraConnect");

if ($conn->connect_error)
{
	returnWithError($conn->connect_error);
	exit();
}


$stmt = $conn->prepare(
	"INSERT INTO Contacts
		(FirstName, LastName, PhoneNumber, EmailAddress, UserID)
	VALUES
		(?, ?, ?, ?, ?)"
);

$stmt->bind_param(
	"ssssi",
	$firstName,
	$lastName,
	$phoneNumber,
	$emailAddress,
	$userID
);

try {
    if ($stmt->execute()) {
        returnWithError("");
    } else {
        returnWithError($stmt->error);
    }
} catch (mysqli_sql_exception $e) {
	returnWithError($e->getMessage());
	}


$stmt->close();
$conn->close();



function getRequestInfo()
{
	return json_decode(
		file_get_contents('php://input'),
		true
	);
}

function sendResultInfoAsJson($obj)
{
	header('Content-Type: application/json');
	echo $obj;
}

function returnWithError($err)
{
	sendResultInfoAsJson(
		json_encode([
			"error" => $err
		])
	);
}
?>
```
