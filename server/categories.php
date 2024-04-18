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

// Query to fetch categories from the database
$query = 'SELECT DISTINCT menu_name FROM menu';
$stmt = $db->query($query);
$categories = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode($categories);
?>
