import { ressources } from "../../shared/card-ressources.js";
window.addEventListener("DOMContentLoaded", initUserProfile);

const user = JSON.parse(localStorage.getItem("user"));

const usernameHeading = document.querySelector(".header-username");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const gridScreenshot = document.getElementById("screenshot");

/* ======================================================== */
/* ========== FILL PROFILE WITH USER INFORMATION ========== */
/* ======================================================== */
function initUserProfile() {
  usernameHeading.innerText = user.username;
  usernameInput.value = user.username;
  emailInput.value = user.email;

  populateMamoryNameList();
  initImg();
  populateSizeList(user.preferences.name);
  fillHistoryTable();
}

const memorySelectList = document.getElementById("memory-name");

/* =========================================================== */
/* ========== FILL SELECT LIST WITH AVAIBLE OPTIONS ========== */
/* =========================================================== */
function populateMamoryNameList() {
  ressources.forEach((ressource) => {
    const newOption = document.createElement("option");
    newOption.value = ressource.name;
    newOption.innerText = ressource.name;
    newOption.selected = ressource.name === user.preferences.name;
    memorySelectList.append(newOption);
  });
}

const sizeSelectList = document.getElementById("memory-size");

function populateSizeList(gridName) {
  sizeSelectList.innerHTML = "";
  const selectedList = ressources.find((el) => {
    return el.name === gridName;
  });
  let maxSize = Math.floor((selectedList.imgPath.length * 2) / 4);

  for (let i = 3; i <= maxSize; i++) {
    const option = document.createElement("option");
    option.value = `4*${i}`;
    option.innerText = `4*${i}`;
    option.selected = user.preferences.size == option.value;
    sizeSelectList.append(option);
  }
}

/* ================================================================ */
/* ========== DISPLAY THE CORRECT IMG IN USE PREFERENCES ========== */
/* ================================================================ */
function initImg() {
  const userPreferences = user.preferences.name;
  const userPreferedList = ressources.find((ressource) => {
    return ressource.name === userPreferences;
  });

  gridScreenshot.src = userPreferedList.screenshot;
}

/* =============================================================== */
/* ========== BIND IMG  & SIZE LIST DATA WITH SELECTION ========== */
/* =============================================================== */
memorySelectList.addEventListener("change", toggleImg);
memorySelectList.addEventListener("change", toggleSize);

function toggleImg(e) {
  const selectedGrid = e.target.value;
  const userPreferedList = ressources.find((ressource) => {
    return ressource.name === selectedGrid;
  });

  gridScreenshot.src = userPreferedList.screenshot;
}

function toggleSize(e) {
  const selectedGrid = e.target.value;
  populateSizeList(selectedGrid);
}

/* =========================================== */
/* ========== DISPLAY SCORE HISTORY ========== */
/* =========================================== */
const tableContent = document.querySelector(".history-content");
function fillHistoryTable() {
  const userScores = user.score;
  userScores.forEach((score) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${score.score}</td>
      <td>${score.memory.size}</td>
      <td>${score.memory.name}</td>
      <td>${score.date}</td>
  `;
    tableContent.append(row);
  });
}

/* ====================================== */
/* ========== SAVE PREFERENCES ========== */
/* ====================================== */
const saveBtn = document.querySelector(".save-btn");

saveBtn.addEventListener("click", handleSave);

function handleSave() {
  const selectedOption = memorySelectList.value;
  user.preferences.name = selectedOption;
  const selectedSize = sizeSelectList.value;
  user.preferences.size = selectedSize;
  saveChangesInLocalStorage();

  alert("Préférences modifiées ! ");
}

function saveChangesInLocalStorage() {
  const userList = JSON.parse(localStorage.getItem("users"));
  const updatedList = userList.map((curr) => {
    return curr.email === user.email ? user : curr;
  });

  localStorage.setItem("users", JSON.stringify(updatedList));
  localStorage.setItem("user", JSON.stringify(user));
}
