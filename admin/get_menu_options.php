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

// Fetch menu options from the database
$query = 'SELECT * FROM menu_option';
$stmt = $db->query($query);
$menuOptions = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($menuOptions);
?>
