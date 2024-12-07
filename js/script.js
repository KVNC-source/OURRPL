let profile = document.querySelector(".header .flex .profile");

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

let sideBar = document.querySelector(".side-bar");

// Menu button click: toggle sidebar visibility
document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active"); // Toggle sidebar class
  document.body.classList.toggle("no-scroll"); // Prevent body scrolling when sidebar is active
};

// Close button click: hide sidebar
document.querySelector("#close-btn").onclick = () => {
  sideBar.classList.remove("active"); // Remove active class
  document.body.classList.remove("no-scroll"); // Restore body scrolling
};

// Close sidebar and reset styles on scroll or if window width is reduced
window.onscroll = () => {
  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active"); // Hide sidebar
    document.body.classList.remove("no-scroll"); // Restore body scrolling
  }
};

// Function to switch between login and registration forms
function showForm(form) {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (form === "login") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }

  // Highlight the active button (optional)
  document.querySelectorAll(".form-toggle button").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`.form-toggle button[onclick="showForm('${form}')"]`)
    .classList.add("active");
}
