<?php
// Start the session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    // Redirect to login page if not logged in
    header("Location: /Project RPL/PHP/login_register.php");
    exit();
}

// Include database configuration
include('C:/xampp/htdocs/Project RPL/db/config.php');

// Initialize variables
$message = [];
$comments = [];
$total_comments = 0;

try {
    // Get the logged-in user's ID from the session
    $user_id = $_SESSION['user_id'];

    // Fetch user details from the database
    $query = "SELECT * FROM users WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $user_name = $user['username'];
    } else {
        session_destroy();
        header("Location: /Project RPL/PHP/login_register.php");
        exit();
    }

    // Get the video ID from the URL
    $video_id = isset($_GET['video_id']) ? intval($_GET['video_id']) : 5;

    // Fetch video details from the database
    $query = "SELECT * FROM videos WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $video_id, PDO::PARAM_INT);
    $stmt->execute();
    $video = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($video) {
        $video_title = $video['title'];
        $video_description = $video['description'];
        $video_date = date('d-m-Y', strtotime($video['created_at']));
        $video_url = $video['video_url'];
        $poster_url = isset($video['thumbnail']) ? $video['thumbnail'] : '../images/default-poster.png';
    } else {
        die("Video not found.");
    }

    // Handle adding a new comment
    if (isset($_POST['add_comment'])) {
        $comment_text = htmlspecialchars(trim($_POST['comment_box']));

        if (!empty($comment_text)) {
            $stmt = $conn->prepare("INSERT INTO comments (user_id, video_id, comment) VALUES (:user_id, :video_id, :comment)");
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->bindParam(':video_id', $video_id, PDO::PARAM_INT);
            $stmt->bindParam(':comment', $comment_text, PDO::PARAM_STR);

            if ($stmt->execute()) {
                $message[] = 'Comment added successfully!';
            } else {
                $message[] = 'Failed to add comment.';
            }
        } else {
            $message[] = 'Comment cannot be empty!';
        }
    }
if ($user) {
    // Extract user details for display
    $user_name = $user['username'];
    $user_gender = $user['gender'];

      // Determine profile picture based on gender
      $profile_picture = "../images/default.png"; // Default profile picture
      if ($user_gender === "Male") {
          $profile_picture = "/Project RPL/images/male-profile.png";
      } elseif ($user_gender === "Female") {
          $profile_picture = "/Project RPL/images/female-profile.png";
      }
    } else {
      // If no user found, destroy session and redirect
      session_destroy();
      header("Location: /Project RPL/PHP/login_register.php");
      exit();
    }
    // Fetch all comments for the video
    $stmt = $conn->prepare("SELECT c.*, u.username
                            FROM comments c 
                            JOIN users u ON c.user_id = u.id 
                            WHERE c.video_id = :video_id 
                            ORDER BY c.created_at DESC");
    $stmt->bindParam(':video_id', $video_id, PDO::PARAM_INT);
    $stmt->execute();
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $total_comments = count($comments);
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
  <title><?php echo htmlspecialchars($video_title); ?></title>

  <!-- font awesome cdn link -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
  />

  <!-- custom css file link -->
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/video.css" />
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
          <a href="/PROJECT RPL/PHP/profile.php" class="btn">view profile</a>
          <div class="flex-btn">
            <a href="/PROJECT RPL/PHP/login_register.php" class="option-btn">logout</a>
          </div>
          <div class="flex-btn">
            <a href="/PROJECT RPL/PHP/update.php" class="option-btn">Update</a>
          </div>
        </div>
      </section>
    </header>


    <div class="side-bar">
    <!-- Close button inside the sidebar -->
    <div id="close-btn">
        <i class="fas fa-times"></i>
    </div>

    <div class="profile">
    <img src="<?php echo htmlspecialchars($profile_picture); ?>" class="image" alt="Profile Picture">
      <h3 class="name"><?php echo htmlspecialchars($user_name); ?></h3>
      <p class="role">studen</p>
      <a href="/Project RPL/PHP/profile.php" class="btn">view profile</a>
    </div>

    <nav class="navbar">
      <a href="/Project RPL/PHP/home.php"><i class="fas fa-home"></i><span>home</span></a>
      <a href="/Project RPL/PHP/about.php"><i class="fas fa-question"></i><span>about</span></a>
      <a href="/Project RPL/PHP/courses.php"><i class="fas fa-graduation-cap"></i><span>courses</span></a>
      <a href="/Project RPL/PHP/teachers.php"><i class="fas fa-chalkboard-user"></i><span>teachers</span></a>
      <a href="/Project RPL/PHP/contact.php"><i class="fas fa-headset"></i><span>contact us</span></a>
  </nav>
  </div>

  <section class="watch-video">
    <div class="video-container">
      <div class="video">
      <iframe 
          src="<?php echo htmlspecialchars($video_url); ?>"
          width="100%" 
          height="auto" 
          allow="autoplay; fullscreen" 
          style="border-radius: 0.5rem;">
        </iframe>
      </div>
      <h3 class="title"><?php echo htmlspecialchars($video_title); ?></h3>
      <div class="info">
        <p class="date">
          <i class="fas fa-calendar"></i>
          <span><?php echo htmlspecialchars($video_date); ?></span>
        </p>
      </div>
      <div class="tutor">
      <img src="/Project RPL/images/school.png" alt="" />
        <div>
          <h3>Ms. Annissa</h3>
        </div>
      </div>
      <form action="" method="post" class="flex">
        <a href="../playlist_BINDO.php" class="inline-btn">view playlist</a>
      </form>
      <p class="description"><?php echo htmlspecialchars($video_description); ?></p>
    </div>
  </section>


  <section class="comments">
    <h1 class="heading"><?php echo $total_comments; ?> comments</h1>

    <!-- Add Comment Form -->
    <form action="" method="post" class="add-comment">
        <h3>Add a Comment</h3>
        <textarea
            name="comment_box"
            placeholder="Enter your comment"
            required
            maxlength="1000"
            cols="30"
            rows="10"
        ></textarea>
        <input
            type="submit"
            value="Add Comment"
            class="inline-btn"
            name="add_comment"
        />
    </form>

    <!-- Display Messages -->
    <?php if (!empty($message)): ?>
        <div class="messages">
            <?php foreach ($message as $msg): ?>
                <p><?php echo htmlspecialchars($msg); ?></p>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <h1 class="heading">User Comments</h1>

    <div class="box-container">
        <?php if ($total_comments > 0): ?>
            <?php foreach ($comments as $comment): ?>
                <div class="box">
                    <div class="user">
                        <img src="<?php echo htmlspecialchars($comment['image'] ?? '../images/default-avatar.png'); ?>" alt="" />
                        <div>
                            <h3><?php echo htmlspecialchars($comment['username']); ?></h3>
                            <span><?php echo date('d-m-Y', strtotime($comment['created_at'])); ?></span>
                        </div>
                    </div>
                    <div class="comment-box"><?php echo nl2br(htmlspecialchars($comment['comment'])); ?></div>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>No comments yet. Be the first to comment!</p>
        <?php endif; ?>
    </div>
</section>

  <!-- custom js file link  -->
  <script src="/Project RPL/js/script.js"></script>

</body>
</html>
