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
        // Extract user details for display
        $user_name = $user['username'];
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
    <title>tutor profile</title>

    <!-- font awesome cdn link  -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
    />

    <!-- custom css file link  -->
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="stylesheet" href="../css/teacher.css" />

  </head>
  <body>
    <header class="header">
      <section class="flex">
        <a href="home.php" class="logo">ZonaCerdas 
        </a>

        <div class="icons">
          <div id="menu-btn" class="fas fa-bars"></div>
          <div id="user-btn" class="fas fa-user"></div>
        </div>

        <div class="profile">
        <img src="<?php echo htmlspecialchars($profile_picture); ?>" class="image" alt="Profile Picture">
        <h3 class="name"></h3>  <h3 class="name"><?php echo htmlspecialchars($user_name); ?></h3>
        <p class="role">student</p>
        <a href="../PHP/profile.php" class="btn">view profile</a>
        <div class="flex-btn">
          <a href="/Project RPL/PHP/login_register.php" class="option-btn">logout</a>
        </div>
        <div class="flex-btn">
          <a href="update.php" class="option-btn">Update</a>
        </div>
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
        <p class="role">studen</p>
        <a href="profile.php" class="btn">view profile</a>
      </div>

      <nav class="navbar">
        <a href="home.php"><i class="fas fa-home"></i><span>home</span></a>
        <a href="about.php"
          ><i class="fas fa-question"></i><span>about</span></a
        >
        <a href="courses.php"
          ><i class="fas fa-graduation-cap"></i><span>courses</span></a
        >
        <a href="teachers.php"
          ><i class="fas fa-chalkboard-user"></i><span>teachers</span></a
        >
        <a href="contact.php"
          ><i class="fas fa-headset"></i><span>contact us</span></a
        >
      </nav>
    </div>

    <section class="teacher-profile">
      <h1 class="heading">profile details</h1>

      <div class="details">
        <div class="tutor">
          <img src="../images/school.png" alt="" />
          <h3>Ms. Ratna</h3>
          <a href="mailto:tutor@example.com" class="email">tutor@example.com</a>
        <div class="flex">
          <p>total playlists : <span>1</span></p>
          <p>total videos : <span>9</span></p>
        </div>
      </div>
    </section>

    <section class="courses">
      <h1 class="heading">our courses</h1>

      <div class="box-container">
        <div class="box">
          <div class="thumb">
            <img src="../images/MathT.png" alt="" />
            <span>10 videos</span>
          </div>
          <h3 class="title">Matematika</h3>
          <a href="../Mapel/playlist_MTK.php" class="inline-btn">view playlist</a>
        </div>
      </div>
    </section>

    <!-- custom js file link  -->
    <script src="../js/script.js"></script>
  </body>
</html>
