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

$results = [];

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "SakuraConnect");

if ($conn->connect_error)
{
	returnWithError($conn->connect_error);
	exit();
}

$searchTerm = trim($inData["search"]);
$searchParam = "%" . $searchTerm . "%";

$stmt = $conn->prepare(
	"SELECT *
	FROM Contacts
	WHERE UserID = ?
	AND (
		FirstName LIKE ?
		OR LastName LIKE ?
		OR CONCAT(FirstName, ' ', LastName) LIKE ?
	)
	ORDER BY FirstName ASC, LastName ASC"
);

$stmt->bind_param(
	"isss",
	$inData["userId"],
	$searchParam,
	$searchParam,
	$searchParam
);

$stmt->execute();

$result = $stmt->get_result();

while ($row = $result->fetch_assoc())
{
	$results[] = [
		"FirstName" => $row["FirstName"],
		"LastName" => $row["LastName"],
		"PhoneNumber" => $row["PhoneNumber"],
		"EmailAddress" => $row["EmailAddress"],
		"UserID" => $row["UserID"],
		"ID" => $row["ID"]
	];
}

if (count($results) === 0)
{
	returnWithError("No Records Found");
}
else
{
	returnWithInfo($results);
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
			"results" => [],
			"error" => $err
		])
	);
}

function returnWithInfo($results)
{
	sendResultInfoAsJson(
		json_encode([
			"results" => $results,
			"error" => ""
		])
	);
}
?>
```
