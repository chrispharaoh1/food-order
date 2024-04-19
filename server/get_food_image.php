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

// Check if optionName parameter is provided
if (!isset($_GET['category'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Option Name not provided']);
    exit;
}

$optionName = $_GET['food'];
$menu_id = $_GET['category'];

// Query to fetch image data for the given option name from the database
$query = 'SELECT * FROM menu_option WHERE option_name = :optionName AND menu_id = :menu_id';
$stmt = $db->prepare($query);
$stmt->bindParam(':optionName', $optionName);
$stmt->bindParam(':menu_id', $menu_id);

try {
    $stmt->execute();
    $imageData = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($imageData) {
   
        // Output the image Url --> encoded in jason format
        echo json_encode(['imageUrl' => 'img/'.$imageData['image_data'], 'priceInDollars' => $imageData['price']]);

        
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Image data not found for option name: ' . $optionName]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch image data: ' . $e->getMessage()]);
}
?>
