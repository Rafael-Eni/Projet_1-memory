const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmationInput = document.getElementById("confirmation");
const submitBtn = document.querySelector(".submit-btn");

let validationGroup = {
  username: false,
  email: false,
  password: false,
  confirm: false,
};

usernameInput.addEventListener("input", checkUsername);
emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);
confirmationInput.addEventListener("input", checkConfirmation);

/* ========================================= */
/* ========== VALIDATE EACH INPUT ========== */
/* ========================================= */
function checkUsername(e) {
  const errorMessage = document.querySelector(".username-error");
  const indicator = document.querySelector(".username-img-indicator");
  const value = e.target.value;

  if (value.length < 3) {
    errorMessage.innerText =
      "Choisissez un nom contendant au moins 3 caractères";
    indicator.style.display = "block";
    validationGroup.username = false;
  } else {
    errorMessage.innerText = "";
    indicator.style.display = "none";
    validationGroup.username = true;
  }
  toggleSubmitBtn();
}

function checkEmail(e) {
  const errorMessage = document.querySelector(".email-error");
  const indicator = document.querySelector(".email-img-indicator");
  const value = e.target.value;

  if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
    errorMessage.innerText = "Renseignez un email valide";
    indicator.style.display = "block";
    validationGroup.email = false;
  } else {
    errorMessage.innerText = "";
    indicator.style.display = "none";
    validationGroup.email = true;
  }
  toggleSubmitBtn();
}

function checkPassword(e) {
  const value = e.target.value;
  const indicator = document.querySelector(".password-img-indicator");
  let strenghValue = 0;

  let indicatorBar = [
    document.querySelector(".weak"),
    document.querySelector(".medium"),
    document.querySelector(".strong"),
  ];

  indicatorBar.forEach((indicator) => {
    indicator.style.display = "none";
  });

  if (value.length >= 6) {
    strenghValue++;

    if (value.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
      strenghValue++;
    }

    if (value.match(/[0-9]/) && value.length >= 9) {
      strenghValue++;
    }
  }

  if (strenghValue === 3) {
    validationGroup.password = true;
    indicator.style.display = "none";
  } else {
    validationGroup.password = false;
    indicator.style.display = "block";
  }

  for (let i = 0; i < strenghValue; i++) {
    indicatorBar[i].style.display = "block";
  }
  toggleSubmitBtn();
}

function checkConfirmation(e) {
  const errorMessage = document.querySelector(".confirm-error");
  const passwordValue = document.getElementById("password").value;
  const indicator = document.querySelector(".confirmation-img-indicator");
  const confirmValue = e.target.value;

  if (!validationGroup.password) {
    errorMessage.innerText = "Renseignez d'abord un mot de passe valide";
    validationGroup.confirm = false;
  } else {
    if (confirmValue !== passwordValue) {
      errorMessage.innerText = "Renseignez deux mot de passe identique";
      indicator.style.display = "block";
      validationGroup.confirm = false;
    } else {
      errorMessage.innerText = "";
      indicator.style.display = "none";
      validationGroup.confirm = true;
    }
  }
  toggleSubmitBtn();
}

/* =================================== */
/* ========== HANDLE SUBMIT ========== */
/* =================================== */
function toggleSubmitBtn() {
  if (isFormValid()) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", "");
  }
}

function isFormValid() {
  let isFormValid = true;
  const formValidationValues = Object.values(validationGroup);

  formValidationValues.forEach((value) => {
    if (!value) isFormValid = false;
  });
  return isFormValid;
}

function resetForm() {
  validationGroup = {
    username: false,
    email: false,
    password: false,
    confirm: false,
  };
  let indicatorBar = [
    document.querySelector(".weak"),
    document.querySelector(".medium"),
    document.querySelector(".strong"),
  ];
  indicatorBar.forEach((indicator) => {
    indicator.style.display = "none";
  });
  toggleSubmitBtn();
}

/* =================================== */
/* ========== CANCEL BUTTON ========== */
/* =================================== */

const cancelBtn = document.querySelector(".cancel-btn");

cancelBtn.addEventListener("click", handleCancel);

function handleCancel() {
  location.replace("/index.html");
}

/* ======================================= */
/* ========== PERSIST USER DATA ========== */
/* ======================================= */
const signupForm = document.querySelector("form");
signupForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  if (isFormValid()) {
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    saveUserToLocalStorage(username, email, password);

    alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
    signupForm.reset();
    location.replace("/pages/signin/signin.html");
  } else {
    signupForm.classList.add("form-error");
    setTimeout(() => {
      signupForm.classList.remove("form-error");
    }, 400);
  }
}

function saveUserToLocalStorage(username, email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  let userExist = users.some((user) => user.email === email);

  if (userExist) {
    alert("Compte utilisateur déjà existant");
    resetForm();
    return;
  }

  const newUser = {
    username,
    email,
    password,
    score: [],
    preferences: {
      name: "Legumes",
      size: "4*3",
    },
  };

  resetForm();

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
}
