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

// Query to fetch food categories from the database
$query = 'SELECT menu_id, menu_name FROM menu';

try {
    $stmt = $db->query($query);
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Return the categories as JSON response
    echo json_encode($categories);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch food categories: ' . $e->getMessage()]);
}
?>
