const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const loggedUser = getUserFromLocalStorage(email, password);
  if (loggedUser) {
    createUserSession(loggedUser);
    location.replace("/pages/profile/profile.html");
  }
}

function getUserFromLocalStorage(email, password) {
  const users = JSON.parse(localStorage.getItem("users"));

  if (!users) {
    alert("Email ou mot de passe incorrecte");
    return;
  }

  const currentUser = users.find((user) => {
    return user.email === email && user.password === password;
  });

  if (!currentUser) {
    form.classList.add("form-error");
    setTimeout(() => {
      form.classList.remove("form-error");
    }, 400);
    return;
  }

  return currentUser;
}

function createUserSession(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
