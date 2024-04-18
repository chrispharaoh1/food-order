<?php
// Database connection
$dsn = 'mysql:host=localhost;dbname=food_store';
$username = 'root';
$password = '';

// Get the option ID from the request
$optionId = $_POST['optionId'];

try {
  $db = new PDO($dsn, $username, $password);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo json_encode(['success' => false]);
  exit;
}

// Prepare and execute the SQL statement to delete the menu option
$query = 'DELETE FROM menu_option WHERE option_id = :optionId';
$stmt = $db->prepare($query);
$stmt->bindParam(':optionId', $optionId);

try {
  $stmt->execute();
  echo json_encode(['success' => true]);
} catch (PDOException $e) {
  echo json_encode(['success' => false]);
}
?>
