const signupBtn = document.querySelector(".nav-signup-btn");
const signinBtn = document.querySelector(".nav-signin-btn");
const profileBtn = document.querySelector(".nav-profile-btn");
const logoutBtn = document.querySelector(".nav-logout-btn");

function handleHeading() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user != undefined) {
    signinBtn.classList.add("hidden");
    signupBtn.classList.add("hidden");
    profileBtn.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
  } else {
    signinBtn.classList.remove("hidden");
    signupBtn.classList.remove("hidden");
    profileBtn.classList.add("hidden");
    logoutBtn.classList.add("hidden");
  }
}

logoutBtn.addEventListener("click", handleLogout);

function handleLogout() {
  const confirmation = confirm("Êtes vous sûr ?");

  if (confirmation) {
    localStorage.removeItem("user");
    handleHeading();
    location.replace("/index.html");
  }
}

window.addEventListener("DOMContentLoaded", handleHeading);
