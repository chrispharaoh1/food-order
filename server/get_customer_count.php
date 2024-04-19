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

// Prepare and execute SQL statement to get the number of rows in the customers table
$query = 'SELECT COUNT(*) AS customerCount FROM customers';
$stmt = $db->query($query);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

// Return the customer count as JSON response
echo json_encode($result['customerCount']);
?>
