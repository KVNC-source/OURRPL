<?php
session_start();
include('../db/config.php'); // Include the database configuration

// Login logic
if (isset($_POST['login_submit'])) {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['pass'];

    $query = "SELECT * FROM users WHERE email = :email";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            header("Location: home.php");
            exit();
        } else {
            $login_error = "Incorrect password!";
        }
    } else {
        $login_error = "No user found with that email!";
    }
}

// Registration logic
if (isset($_POST['register_submit'])) {
    $username = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['pass'];
    $confirm_password = $_POST['c_pass'];
    $gender = $_POST['gender'];
    $age = $_POST['age'];

    if ($password !== $confirm_password) {
        $register_error = "Passwords do not match!";
    } else {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email OR username = :username");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $register_error = "User already exists!";
        } else {
            $stmt = $conn->prepare("INSERT INTO users (username, email, password, gender, age) VALUES (:username, :email, :password, :gender, :age)");
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hashed_password);
            $stmt->bindParam(':gender', $gender);
            $stmt->bindParam(':age', $age);

            if ($stmt->execute()) {
                $register_success = "Registration successful! You can now log in.";
            } else {
                $register_error = "Registration failed!";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Register</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css">
    <link rel="stylesheet" href="../css/log_reg.css" />
    <script>
        function showForm(form) {
            document.getElementById('login-form').style.display = form === 'login' ? 'block' : 'none';
            document.getElementById('register-form').style.display = form === 'register' ? 'block' : 'none';
        }
    </script>
</head>
<body onload="showForm('login')">
<section class="form-container">

    <!-- Login Form -->
    <form id="login-form" action="" method="post" style="display:none;">
        <h3>Login Now</h3>
        <p>Your email <span>*</span></p>
        <input type="email" name="email" placeholder="Enter your email" required maxlength="50" class="box">
        <p>Your password <span>*</span></p>
        <input type="password" name="pass" placeholder="Enter your password" required maxlength="20" class="box">
        <input type="submit" value="Login" name="login_submit" class="btn">
        <?php if (isset($login_error)) echo "<p style='color: red;'>$login_error</p>"; ?>
        
        <div class="form-toggle-log">
            <button onclick="showForm('login')">Login</button>
            <button onclick="showForm('register')">Register</button>
        </div>
    </form>

    <!-- Register Form -->
    <form id="register-form" action="" method="post" style="display:none;" enctype="multipart/form-data">
        <h3>Register Now</h3>
        <p>Your name <span>*</span></p>
        <input type="text" name="name" placeholder="Enter your name" required maxlength="50" class="box">
        <p>Your email <span>*</span></p>
        <input type="email" name="email" placeholder="Enter your email" required maxlength="50" class="box">
        <p>Your password <span>*</span></p>
        <input type="password" name="pass" placeholder="Enter your password" required maxlength="20" class="box">
        <p>Confirm password <span>*</span></p>
        <input type="password" name="c_pass" placeholder="Confirm your password" required maxlength="20" class="box">
        <p>Gender <span>*</span></p>
        <select name="gender" required class="box">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </select>
        <p>Age <span>*</span></p>
        <input type="number" name="age" placeholder="Enter your age" required min="0" class="box">
        <input type="submit" value="Register New" name="register_submit" class="btn">
        <?php
        if (isset($register_error)) echo "<p style='color: red;'>$register_error</p>";
        if (isset($register_success)) echo "<p style='color: green;'>$register_success</p>";
        ?>
        <div class="form-toggle-log">
            <button onclick="showForm('login')">Login</button>
            <button onclick="showForm('register')">Register</button>
        </div>
    </form>
</section>

<script src="../js/script.js"></script>
</body>
</html>
