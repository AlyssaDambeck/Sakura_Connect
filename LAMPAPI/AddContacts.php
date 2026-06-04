<?php


header('Access-Control-Allow-Origin: https://sakuraconnect.online');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
{
	http_response_code(200);
	exit();
}


$inData = getRequestInfo();

$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$phoneNumber = $inData["phoneNumber"];
$emailAddress = $inData["emailAddress"];
$userId = $inData["userId"];


$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

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
	$userId
);

if ($stmt->execute())
{
	returnWithError("");
}
else
{
	returnWithError($stmt->error);
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
