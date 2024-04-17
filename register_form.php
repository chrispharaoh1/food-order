<?php
// Retrieve form data
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$phoneNumber = $data['phoneNumber'];
$email = $data['email'];
$password = $data['password'];
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "food_store";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO customers (name, phone, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $phoneNumber, $email, $hashed_password);

// Execute SQL statement
if ($stmt->execute() === TRUE) {
    echo json_encode(array("message" => "Form data inserted successfully"));
} else {
    echo json_encode(array("error" => "Error inserting form data: " . $conn->error));
}

// Close prepared statement and database connection
$stmt->close();
$conn->close();
?>
