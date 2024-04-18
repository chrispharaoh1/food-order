<?php
$data = json_decode(file_get_contents('php://input'), true);
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

// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get the POST data
  $itemName = $data['itemName'];
  $itemCategory2 = $data['itemCategory2'];
  $itemPrice = $data['itemPrice'];
  $itemIngredients = $data['itemIngredients'];
  $menu_id = "2";
 

  if(!empty($itemName)){
    // Prepare the SQL statement to insert category into the menu table
  $query = 'INSERT INTO menu_option (option_name, menu_id, category, price, ingredients) VALUES (:option_name, :menu_id, :category, :price, :ingredients)';
  $stmt = $db->prepare($query);
  $stmt->bindParam(':option_name', $itemName);
  $stmt->bindParam(':menu_id', $menu_id);
  $stmt->bindParam(':category', $itemCategory2);
  $stmt->bindParam(':price', $itemPrice);
  $stmt->bindParam(':ingredients', $itemIngredients);

  // // Prepare and execute the SQL statement to insert item into the menu_option table
  // $query = 'INSERT INTO menu_option (option_name, menu_id, category, price, ingredients) VALUES (:option_name, :menu_id, :category, :price, :ingredients)';
  // $stmt = $db->prepare($query);
  // $stmt->bindParam(':option_name', $itemName);
  // $stmt->bindParam(':menu_id', '3');
  

  try {
    // Execute the SQL statement
    $stmt->execute();
    echo json_encode(['message' => $itemName.' category added successfully']);
  } catch (PDOException $e) {
    echo json_encode(['error' => 'Error adding category: ' . $e->getMessage()]);
  } 
 

  }

  else{
    echo json_encode(['message' => 'Category empty '.$itemName]);
  }

  
} else {
  // Return error response if not a POST request
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
}
?>
