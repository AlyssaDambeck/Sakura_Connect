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

$userId = $inData["userId"];
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");


if ($conn->connect_error)
{
	returnWithError($conn->connect_error);
	exit();
}


$stmt = $conn->prepare(
	"DELETE FROM Contacts
	WHERE FirstName = ?
	AND LastName = ?
	AND UserID = ?"
);

$stmt->bind_param(
	"ssi",
	$firstName,
	$lastName,
	$userId
);

if ($stmt->execute())
{
	if ($stmt->affected_rows > 0)
	{
		returnWithError("");
	}
	else
	{
		returnWithError("Contact not found");
	}
}
else
{
	returnWithError($stmt->error);
}


$stmt->close();
$conn->close();

//help

function getRequestInfo()
{
	return json_decode(
		file_get_contents("php://input"),
		true
	);
}

function sendResultInfoAsJson($obj)
{
	header("Content-Type: application/json");
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
