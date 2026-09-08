const STORAGE_KEY = "signupUsers";
const COMMENTS_KEY = "signupComments";
const THEME_KEY = "signupTheme";

const form = document.getElementById("signupForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formStatus = document.getElementById("formStatus");

const tableBody = document.getElementById("userTableBody");
const emptyState = document.getElementById("emptyState");
const userCount = document.getElementById("userCount");
const themeToggle = document.getElementById("themeToggle");
const commentForm = document.getElementById("commentForm");
const commentName = document.getElementById("commentName");
const commentText = document.getElementById("commentText");
const commentStatus = document.getElementById("commentStatus");
const commentsList = document.getElementById("commentsList");
const commentsEmpty = document.getElementById("commentsEmpty");

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function clearErrors() {
  [usernameInput, emailInput, passwordInput].forEach(input => {
    input.classList.remove("invalid");
  });

  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
}

function showError(input, errorElement, message) {
  input.classList.add("invalid");
  errorElement.textContent = message;
}

function validateInputs() {
  clearErrors();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  let valid = true;

  if (username === "") {
    showError(usernameInput, usernameError, "Username cannot be empty.");
    valid = false;
  }

  // Basic email-format regex.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    showError(emailInput, emailError, "Enter a valid email address.");
    valid = false;
  }

  if (password.length < 6) {
    showError(passwordInput, passwordError, "Password must be at least 6 characters.");
    valid = false;
  }

  return { valid, username, email, password };
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

function renderUsers() {
  const users = getUsers();

  tableBody.innerHTML = "";

  users.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${escapeHTML(user.username)}</td>
      <td>${escapeHTML(user.email)}</td>
      <td class="password-cell" title="${escapeHTML(user.password)}">
        ${escapeHTML(user.password)}
      </td>
      <td>
        <button class="delete-btn" data-index="${index}" type="button">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  emptyState.style.display = users.length === 0 ? "block" : "none";
  userCount.textContent = `${users.length} ${users.length === 1 ? "user" : "users"}`;
}

function escapeHTML(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  formStatus.textContent = "";
  formStatus.className = "form-status";

  const result = validateInputs();

  if (!result.valid) {
    return;
  }

  const users = getUsers();

  // Hash the password before it ever gets written to localStorage.
  const hashedPassword = await hashPassword(result.password);

  users.push({
    username: result.username,
    email: result.email,
    password: hashedPassword
  });

  saveUsers(users);
  renderUsers();

  form.reset();
  clearErrors();

  formStatus.textContent = "Account created successfully!";
  formStatus.classList.add("success");
});

tableBody.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-btn")) {
    return;
  }

  const index = Number(event.target.dataset.index);
  const users = getUsers();

  users.splice(index, 1);
  saveUsers(users);
  renderUsers();
});

function getComments() {
  try { return JSON.parse(localStorage.getItem(COMMENTS_KEY)) || []; } catch { return []; }
}

function saveComments(comments) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

function renderComments() {
  const comments = getComments();
  commentsList.innerHTML = "";
  if (!comments.length) {
    commentsList.appendChild(commentsEmpty);
    commentsEmpty.style.display = "block";
    return;
  }
  comments.forEach((comment, index) => {
    const card = document.createElement("article");
    card.className = "comment-item";
    card.innerHTML = `<div class="comment-top"><strong>${escapeHTML(comment.name)}</strong><button class="comment-delete" data-index="${index}" type="button" aria-label="Delete comment">×</button></div><p>${escapeHTML(comment.text)}</p><time>${escapeHTML(comment.date)}</time>`;
    commentsList.appendChild(card);
  });
}

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = commentName.value.trim();
  const text = commentText.value.trim();
  commentStatus.textContent = "";
  commentStatus.className = "form-status";
  if (!name || !text) {
    commentStatus.textContent = "Add your name and a comment first.";
    commentStatus.classList.add("error-status");
    return;
  }
  const comments = getComments();
  comments.unshift({ name, text, date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) });
  saveComments(comments);
  renderComments();
  commentForm.reset();
  commentStatus.textContent = "Thanks for your review. It helps a lot <3";
  commentStatus.classList.add("success");
});

commentsList.addEventListener("click", (event) => {
  if (!event.target.classList.contains("comment-delete")) return;
  const comments = getComments();
  comments.splice(Number(event.target.dataset.index), 1);
  saveComments(comments);
  renderComments();
});

function setTheme(theme) {
  const dark = theme === "dark";
  document.body.classList.toggle("dark-mode", dark);
  localStorage.setItem(THEME_KEY, theme);
  themeToggle.querySelector(".theme-icon").textContent = dark ? "☀" : "☾";
  themeToggle.querySelector(".theme-label").textContent = dark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}

themeToggle.addEventListener("click", () => {
  setTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
});

setTheme(localStorage.getItem(THEME_KEY) || "light");
renderUsers();
renderComments();
