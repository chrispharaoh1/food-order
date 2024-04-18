<?php
// Database connection
$dsn = 'mysql:host=localhost;dbname=food_store';
$username = 'root';
$password = '';

try {
  $db = new PDO($dsn, $username, $password);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
  exit;
}

// Check if optionId parameter is provided
if (!isset($_GET['optionId'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Option ID not provided']);
  exit;
}

$optionId = $_GET['optionId'];

// Prepare and execute SQL statement to fetch data for the given optionId
$query = 'SELECT * FROM menu_option WHERE option_id = :optionId';
$stmt = $db->prepare($query);
$stmt->bindParam(':optionId', $optionId);

try {
  $stmt->execute();
  $optionData = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($optionData) {
    // Return option data as JSON response
    echo json_encode($optionData);
  } else {
    http_response_code(404);
    echo json_encode(['error' => 'Menu option not found']);
  }
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to fetch menu option data: ' . $e->getMessage()]);
}
?>
