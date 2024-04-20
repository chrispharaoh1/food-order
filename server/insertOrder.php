<?php

//file for inserting data into ther oder table
session_start();

// Check if the session variables are set
if (isset($_SESSION['email']) && isset($_SESSION['name']) && isset($_SESSION['customer_id']) && isset($_SESSION['phone'])) {
    // Get the session values
    $email = $_SESSION['email'];
    $customerName = $_SESSION['name'];
    $customerId = $_SESSION['customer_id'];
    $phoneNumber = $_SESSION['phone'];

    // Get the local storage values
    $orderedItem = $_POST['foodOption'];
    $orderPrice = $_POST['price'];
    $orderQty = $_POST['qty'];

    // Perform database insertion (Assuming you have a database connection)
    // Make sure to sanitize your input to prevent SQL injection

    // Assuming you have a database connection $conn
    // Example SQL query (Make sure to adjust based on your table structure)
    $sql = "INSERT INTO orders (email, customer_name, customer_id, phone_number, ordered_item, order_price, order_qty)
            VALUES ('$email', '$customerName', '$customerId', '$phoneNumber', '$orderedItem', '$orderPrice', '$orderQty')";

    // Execute the query
    if ($conn->query($sql) === TRUE) {
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
