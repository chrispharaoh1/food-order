<?php
// Database connection
$dsn = 'mysql:host=localhost;dbname=food_store';
$username = 'root';
$password = '';

try {
  $db = new PDO($dsn, $username, $password);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
  exit;
}
?>