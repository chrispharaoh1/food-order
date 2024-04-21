<?php
session_start();

// Check if the required sessions are set
if (!isset($_SESSION['name']) || !isset($_SESSION['customer_id']) || !isset($_SESSION['phone'])) {
    // Required sessions are not set, return a response indicating redirection
    http_response_code(401); // Unauthorized
    echo json_encode(array('redirect' => 'login.html'));
} else {
    // Required sessions are set, return a success response
    http_response_code(200);
    echo json_encode(array('message' => 'Sessions are set.'));
}
?>
