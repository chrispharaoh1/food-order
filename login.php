<?php
session_start();

// Database connection
$dsn = 'mysql:host=localhost;dbname=food_store';
$username = 'root';
$password = '';

try {
  $db = new PDO($dsn, $username, $password);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo 'Database connection failed: ' . $e->getMessage();
  exit;
}

// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Get the POST data
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Query to fetch the hashed password from the database
  $query = 'SELECT * FROM customers WHERE email = :email';
  $stmt = $db->prepare($query);
  $stmt->execute(array(':email' => $email));
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($user) {
    // Verify the password using password_verify()
    if (password_verify($password, $user['password'])) {
      echo json_encode(['message' => '']);

      //Creating sessions for the user
      $_SESSION['email'] = $email;
      $_SESSION['name'] = $user['name'];
      $_SESSION['customer_id'] = $user['customer_id'];
      $_SESSION['name'] = $user['name'];

    } else {
      echo json_encode(['message' => 'Invalid email or password']);
    }
  } else {
    echo json_encode(['message' => 'Invalid email or password']);
  }
} else {
  // Return error response if not a POST request
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
}
?>
