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
if (!isset($_GET['optionName'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Option Name not provided']);
    exit;
}

$optionName = $_GET['optionName'];

// Query to fetch image data for the given option name from the database
$query = 'SELECT image_data FROM menu_option WHERE option_name = :optionName';
$stmt = $db->prepare($query);
$stmt->bindParam(':optionName', $optionName);

try {
    $stmt->execute();
    $imageData = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($imageData) {
        // Set the content type header to indicate that the response is an image
        header('Content-Type: image/png'); // Adjust the content type based on the image format
        // Output the image Url
        echo "img/".$imageData['image_data'];
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Image data not found for option name: ' . $optionName]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch image data: ' . $e->getMessage()]);
}
?>
