<?php

//file for inserting data into ther oder table
session_start();

//include database connection file
$dsn = 'mysql:host=localhost;dbname=food_store';
$username = 'root';
$password = '';

$db = new mysqli('localhost', $username, $password, 'food_store');

// try {
//   $db = new PDO($dsn, $username, $password);
//   $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// } catch (PDOException $e) {
//   echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
//   exit;
// }


$data = json_decode(file_get_contents('php://input'), true);

// Check if the session variables are set
if (isset($_SESSION['email'])) {
    // Get the session values
    $email = $_SESSION['email'];
    $customerName = $_SESSION['name'];
    $customerId = $_SESSION['customer_id'];
    $phoneNumber = $_SESSION['phone'];

    // Get the local storage values
    $orderedItem = $data['foodOption'];
    $orderPrice = $data['price'];
    $orderQty = $data['qty'];

    $sql = "INSERT INTO oder (email, customer_name, customer_id, phone_number, ordered_item, order_price, order_qty)
            VALUES ('$email', '$customerName', '$customerId', '$phoneNumber', '$orderedItem', '$orderPrice', '$orderQty')";

    // Execute the query
    if ($db->query($sql) === TRUE) {
        // Return success message
        echo json_encode(array("success" => true));
    } else {
        // Return error message
        echo json_encode(array("success" => false, "message" => "Error: " . $sql . "<br>" . $conn->error));
    }
} else {
    // Session variables are not set
    echo json_encode(array("success" => false, "message" => "Session variables not set"));
}
?>
