
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

$phoneNumber = $inData["phoneNumber"];
$emailAddress = $inData["emailAddress"];
$newFirst = $inData["newFirstName"];
$newLast = $inData["newLastName"];
$id = $inData["id"];
$userId = $inData["userId"];


$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "SakuraConnect");

if ($conn->connect_error)
{
	returnWithError($conn->connect_error);
	exit();
}


$stmt = $conn->prepare(
	"UPDATE Contacts
	SET
		FirstName = ?,
		LastName = ?,
		PhoneNumber = ?,
		EmailAddress = ?
	WHERE
		ID = ?
	AND
		UserID = ?"
);

$stmt->bind_param(
	"ssssii",
	$newFirst,
	$newLast,
	$phoneNumber,
	$emailAddress,
	$id,
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
		returnWithError(
			"Contact not found or unauthorized"
		);
	}
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
