<?php
// Start the session
session_start();

// Destroy all session data to log the user out
session_unset();
session_destroy();

// Redirect to the login/register page
header("Location: login_register.php");
exit();
?>
