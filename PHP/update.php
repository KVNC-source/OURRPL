<?php
// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    // Redirect to login page if not logged in
    header("Location: login_register.php");
    exit();
}

// Include database configuration
include('../db/config.php');

try {
    // Get the logged-in user's ID from the session
    $user_id = $_SESSION['user_id'];

    // Fetch user details from the database
    $query = "SELECT * FROM users WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    // Fetch user record
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Extract the username for display
        $user_name = $user['username'];
        $user_age = $user['age'];
        $user_gender = $user['gender'];

        // Determine profile picture based on gender
        $profile_picture = "../images/default.png"; // Default profile picture
        if ($user_gender === "Male") {
            $profile_picture = "../images/male-profile.png";
        } elseif ($user_gender === "Female") {
            $profile_picture = "../images/female-profile.png";
        }

    } else {
        // If no user found, destroy session and redirect
        session_destroy();
        header("Location: login_register.php");
        exit();
    }

    // Handle form submission
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get input values
        $new_name = $_POST['name'] ?? '';
        $new_email = $_POST['email'] ?? '';
        $age = $_POST['age'] ?? '';
        $gender = $_POST['gender'] ?? '';
        $old_pass = $_POST['old_pass'] ?? '';
        $new_pass = $_POST['new_pass'] ?? '';
        $c_pass = $_POST['c_pass'] ?? '';

        // Validate the old password
        if (!password_verify($old_pass, $user['password'])) {
            echo "<script>alert('Old password is incorrect!');</script>";
        } else if (!empty($new_pass) && $new_pass !== $c_pass) {
            echo "<script>alert('New passwords do not match!');</script>";
        } else {
            // Prepare the update values
            $final_name = !empty($new_name) ? $new_name : $user['username'];
            $final_email = !empty($new_email) ? $new_email : $user['email'];
            $final_age = !empty($age) ? $age : $user['age'];
            $final_gender = !empty($gender) ? $gender : $user['gender'];

            // Update query
            $update_query = "UPDATE users SET username = :username, email = :email, age = :age, gender = :gender";
            if (!empty($new_pass)) {
                $update_query .= ", password = :password";
            }
            $update_query .= " WHERE id = :id";

            // Prepare the statement
            $update_stmt = $conn->prepare($update_query);
            $update_stmt->bindParam(':username', $final_name, PDO::PARAM_STR);
            $update_stmt->bindParam(':email', $final_email, PDO::PARAM_STR);
            $update_stmt->bindParam(':age', $final_age, PDO::PARAM_INT);
            $update_stmt->bindParam(':gender', $final_gender, PDO::PARAM_STR);
            if (!empty($new_pass)) {
                $hashed_pass = password_hash($new_pass, PASSWORD_DEFAULT);
                $update_stmt->bindParam(':password', $hashed_pass, PDO::PARAM_STR);
            }
            $update_stmt->bindParam(':id', $user_id, PDO::PARAM_INT);

            // Execute the update query
            if ($update_stmt->execute()) {
                echo "<script>alert('Profile updated successfully!');</script>";
                // Reload the page to reflect the updates
                header("Refresh:0");
            } else {
                echo "<script>alert('Failed to update profile. Please try again.');</script>";
            }
        }
    }
} catch (PDOException $e) {
    die("Database error: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Update Profile</title>

    <!-- font awesome cdn link  -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
    />

    <!-- custom css file link  -->
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="stylesheet" href="../css/update.css" />
  </head>
  <body>
    <header class="header">
      <section class="flex">
        <a href="home.php" class="logo">ZonaCerdas</a>


        <div class="icons">
          <div id="menu-btn" class="fas fa-bars"></div>
          <div id="user-btn" class="fas fa-user"></div>
        </div>

        <div class="profile">
          <img src="<?php echo htmlspecialchars($profile_picture); ?>" class="image" alt="Profile Picture">
          <h3 class="name"><?php echo htmlspecialchars($user_name); ?></h3>
          <p class="role">Student</p>
          <a href="profile.php" class="btn">View Profile</a>
        </div>
      </section>
    </header>

    <div class="side-bar">
      <div id="close-btn">
        <i class="fas fa-times"></i>
      </div>

      <div class="profile">
      <img src="<?php echo htmlspecialchars($profile_picture); ?>" class="image" alt="Profile Picture">
        <h3 class="name"><?php echo htmlspecialchars($user_name); ?></h3>
        <p class="role">Student</p>
        <a href="profile.php" class="btn">View Profile</a>
      </div>

      <nav class="navbar">
        <a href="home.php"><i class="fas fa-home"></i><span>Home</span></a>
        <a href="about.php"><i class="fas fa-question"></i><span>About</span></a>
        <a href="courses.php"><i class="fas fa-graduation-cap"></i><span>Courses</span></a>
        <a href="teachers.php"><i class="fas fa-chalkboard-user"></i><span>Teachers</span></a>
        <a href="contact.php"><i class="fas fa-headset"></i><span>Contact Us</span></a>
      </nav>
    </div>

    <section class="form-container">
      <form action="" method="post" enctype="multipart/form-data">
        <h3>Update Profile</h3>
        <p>Update Name</p>
        <input
          type="text"
          name="name"
          placeholder="New Username"
          maxlength="50"
          class="box"
        />
        <p>Update Email</p>
        <input
          type="email"
          name="email"
          placeholder="******@gmail.com"
          maxlength="50"
          class="box"
        />
        <p>Update Age</p>
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          min="1"
          max="120"
          class="box"
          value="<?php echo htmlspecialchars($user_age); ?>"
        />
        <p>Update Gender</p>
        <select name="gender" class="box">
          <option value="male" <?php echo $user_gender == 'male' ? 'selected' : ''; ?>>Male</option>
          <option value="female" <?php echo $user_gender == 'female' ? 'selected' : ''; ?>>Female</option>
          <option value="other" <?php echo $user_gender == 'other' ? 'selected' : ''; ?>>Other</option>
        </select>
        <p>Previous Password</p>
        <input
          type="password"
          name="old_pass"
          placeholder="Enter your old password"
          maxlength="20"
          class="box"
        />
        <p>New Password</p>
        <input
          type="password"
          name="new_pass"
          placeholder="Enter your new password"
          maxlength="20"
          class="box"
        />
        <p>Confirm Password</p>
        <input
          type="password"
          name="c_pass"
          placeholder="Confirm your new password"
          maxlength="20"
          class="box"
        />
        <input type="submit" value="Update Profile" name="submit" class="btn" />
      </form>
    </section>

    <footer class="footer">
      &copy; copyright @ 2022 by <span>mr. web designer</span> | all rights reserved!
    </footer>

    <!-- custom js file link  -->
    <script src="../js/script.js"></script>
  </body>
</html>
