<?php
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

// Check if menuId parameter is provided
if (!isset($_GET['menuId'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Menu ID not provided']);
    exit;
}

$menuId = $_GET['menuId'];

// Query to fetch food options for the given category from the database
$query = 'SELECT option_name FROM menu_option WHERE menu_id = :menuId';
$stmt = $db->prepare($query);
$stmt->bindParam(':menuId', $menuId);

try {
    $stmt->execute();
    $options = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Return the options as JSON response
    echo json_encode($options);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch food options: ' . $e->getMessage()]);
}
?>
