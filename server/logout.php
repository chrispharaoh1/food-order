<?php
// Start the session
session_start();

// Unset all session variables
session_unset();

// Destroy the session
session_destroy();

// Send a response indicating successful logout
http_response_code(200);
?>
