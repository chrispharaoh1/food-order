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
  $itemDescription = $data['itemName'];

  if(!empty($itemDescription)){
    // Prepare the SQL statement to insert category into the menu table
  $query = 'INSERT INTO menu (menu_name) VALUES (:menu_name)';
  $stmt = $db->prepare($query);
  $stmt->bindParam(':menu_name', $itemDescription);

  try {
    // Execute the SQL statement
    $stmt->execute();
    echo json_encode(['message' => $itemDescription.' category added successfully']);
  } catch (PDOException $e) {
    echo json_encode(['error' => 'Error adding category: ' . $e->getMessage()]);
  } 
 

  }

  else{
    echo json_encode(['message' => 'Category empty '.$itemDescription]);
  }

  
} else {
  // Return error response if not a POST request
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
}
?>
