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
    <title>video playlist</title>

    <!-- font awesome cdn link  -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
    />

    <!-- custom css file link  -->
    <link rel="stylesheet" href="../css/style.css" />
    <link rel="stylesheet" href="../css/playlist.css" />
  </head>
  <body>
    <header class="header">
      <section class="flex">
        <a href="/Project RPL/PHP/home.php" class="logo">ZonaCerdas 
        </a>
        <div class="icons">
          <div id="menu-btn" class="fas fa-bars"></div>
          <div id="user-btn" class="fas fa-user"></div>
        </div>

        <div class="profile">
        <img src="<?php echo htmlspecialchars($profile_picture); ?>" class="image" alt="Profile Picture">
          <h3 class="name"><?php echo htmlspecialchars($user_name); ?></h3>
          <p class="role">studen</p>
          <a href="/Project RPL/PHP/profile.php" class="btn">view profile</a>
          <div class="flex-btn">
            <a href="/Project RPL/PHP/login_register.php" class="option-btn">logout</a>
          </div>
          <div class="flex-btn">
            <a href="/Project RPL/PHP/update.php" class="option-btn">Update</a>
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
        <  <h3 class="name"><?php echo htmlspecialchars($user_name); ?></h3>
        <p class="role">studen</p>
        <a href="/Project RPL/PHP/profile.php" class="btn">view profile</a>
      </div>

      <nav class="navbar">
        <a href="/Project RPL/PHP/home.php"><i class="fas fa-home"></i><span>home</span></a>
        <a href="/Project RPL/PHP/about.php"
          ><i class="fas fa-question"></i><span>about</span></a
        >
        <a href="/Project RPL/PHP/courses.php"
          ><i class="fas fa-graduation-cap"></i><span>courses</span></a
        >
        <a href="/Project RPL/PHP/teachers.php"
          ><i class="fas fa-chalkboard-user"></i><span>teachers</span></a
        >
        <a href="/Project RPL/PHP/contact.php"
          ><i class="fas fa-headset"></i><span>contact us</span></a
        >
      </nav>
    </div>

    <section class="playlist-details">
      <h1 class="heading">playlist details</h1>

      <div class="row">
        <div class="column">
          <div class="thumb">
            <img src="../images/IPAT.jpg" alt="" />
            <span>8 videos</span>
          </div>
        </div>
        <div class="column">
          <div class="tutor">
            <img src="../images/school.png" alt="" />
            <div>
              <h3>Mr. Imam</h3>
              <span>21-10-2024</span>
            </div>
          </div>

          <div class="details">
            <h3>Ilmu Pengetahuan Alam
            </h3>
            <p>
            Ilmu Pengetahuan Alam (IPA) mempelajari fenomena alam dan prinsip yang mengatur dunia di sekitar kita. 
            Halaman ini menyajikan berbagai materi tentang Ilmu Pengetahuan Alam
            yang dirancang untuk memperluas pengetahuan Anda. Dengan video pembelajaran
            terkini, Anda dapat memahami konsep sains 
            dengan cara yang menyenangkan dan aplikatif.
            </p>
            <a href="/Project RPL/PHP/teacher_profile.php" class="inline-btn">view profile</a>
          </div>
        </div>
      </div>
    </section>

    <section class="playlist-videos">
      <h1 class="heading">playlist videos</h1>

      <div class="box-container">
        <a class="box" href="IPA/watch-video10.php">
          <i class="fas fa-play"></i>
          <img src="../images/IPAT.jpg" alt="" />
          <h3>Besaran Satuan (1) Pengenalan Besaran Satuan dan Dimensi</h3>
        </a>

        <a class="box" href="IPA/watch-video11.php">
          <i class="fas fa-play"></i>
          <img src="../images/IPAT.jpg" alt="" />
          <h3>Besaran Satuan (2) Analisa Dimensi Fisika, Contoh Soal Dimensi</h3>
        </a>

        <a class="box" href="IPA/watch-video12.php">
          <i class="fas fa-play"></i>
          <img src="../images/IPAT.jpg" alt="" />
          <h3>Besaran Satuan (3) Konversi Satuan Merubah Satuan Awalan Satuan</h3>
        </a>

        <a class="box" href="IPA/watch-video13.php">
          <i class="fas fa-play"></i>
          <img src="../images/IPAT.jpg" alt="" />
          <h3>Besaran Satuan (4) Angka Penting Pembulatan Penjumlahan Angka Penting</h3>
        </a>

        <a class="box" href="IPA/watch-video14.php">
          <i class="fas fa-play"></i>
          <img src="../images/IPAT.jpg" alt="" />
          <h3>Besaran Satuan (5) Perkalian Angka Penting Pembagian Angka Penting</h3>
        </a>

        <a class="box" href="IPA/watch-video15.php">
          <i class="fas fa-play"></i>
          <img src="../images/IPAT.jpg" alt="" />
          <h3>Besaran Satuan (6) Pengukuran Panjang Jangka Sorong Mikrometer Mistar</h3>

          <a class="box" href="IPA/watch-video16.php">
          <i class="fas fa-play"></i>
          <img src="../images/IPAT.jpg" alt="" />
          <h3>Sifat Koligatif Larutan</h3>
        </a>
      </div>
    </section>

    <footer class="footer">
      &copy; copyright @ 2022 by <span>mr. web designer</span> | all rights
      reserved!
    </footer>

    <!-- custom js file link  -->
    <script src="../js/script.js"></script>
  </body>
</html>
