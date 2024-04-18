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

// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get the POST data
  $itemName = $_POST['itemName'];
  $itemCategory = $_POST['itemCategory'];
  $itemPrice = $_POST['itemPrice'];
  $itemIngredients = $_POST['itemIngredients'];

  // Prepare the SQL statement to insert item into the menu_option table
  $query = 'INSERT INTO menu_option (option_name, menu_id, category, price, ingredients) VALUES (:option_name, :menu_id, :category, :price, :ingredients)';
  $stmt = $db->prepare($query);
  $stmt->bindParam(':option_name', $itemName);
  $stmt->bindParam(':menu_id', $itemCategory);
  $stmt->bindParam(':category', $itemCategory); // Assuming category is the same as menu_id, adjust if necessary
  $stmt->bindParam(':price', $itemPrice);
  $stmt->bindParam(':ingredients', $itemIngredients);

  try {
    // Execute the SQL statement
    $stmt->execute();
    echo json_encode(['message' => 'Item added successfully']);
  } catch (PDOException $e) {
    echo json_encode(['error' => 'Error adding item: ' . $e->getMessage()]);
  }
} else {
  // Return error response if not a POST request
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
}
?>
