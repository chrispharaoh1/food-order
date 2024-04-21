<?php
// Assuming you have a database connection $conn
$dsn = 'mysql:host=localhost;dbname=food_store';
$username = 'root';
$password = '';

$db = new mysqli('localhost', $username, $password, 'food_store');

// Fetch data from the "menu_option" table
$sql = "SELECT * FROM menu_option";
$result = $db -> query($sql);

// Check if there are any rows returned
if ($result->num_rows > 0) {
    // Initialize an array to store menu options
    $menuOptions = array();

    // Loop through each row
    while ($row = $result->fetch_assoc()) {
        // Add each row to the menu options array
        $menuOptions[] = $row;
    }

    // Return menu options as JSON
    echo json_encode($menuOptions);
} else {
    // No menu options found
    echo json_encode(array());
}
?>
