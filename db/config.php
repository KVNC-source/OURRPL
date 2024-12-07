<?php
$host = 'localhost'; 
$db = 'user_registration';
$user = 'root'; 
$pass = 'kenola20'; 
try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
}
?>