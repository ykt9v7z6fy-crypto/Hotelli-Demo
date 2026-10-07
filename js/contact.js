const form = document.querySelector("#enquiry");
const success = document.querySelector("#form-success");
const roomSelect = form.querySelector("[name='room']");

const roomFromUrl = new URLSearchParams(window.location.search).get("room");
if (roomFromUrl && [...roomSelect.options].some((option) => option.value === roomFromUrl)) {
  roomSelect.value = roomFromUrl;
}

function showError(field, message) {
  const error = document.querySelector(`#${field.id}-error`);
  field.setAttribute("aria-invalid", "true");
  error.hidden = false;
  error.textContent = message;
}

function clearError(field) {
  const error = document.querySelector(`#${field.id}-error`);
  field.removeAttribute("aria-invalid");
  error.hidden = true;
  error.textContent = "";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  success.hidden = true;

  const name = form.querySelector("#name");
  const email = form.querySelector("#email");
  const message = form.querySelector("#message");
  let valid = true;

  [
    [name, "Please enter your name."],
    [message, "Please write a short message."],
  ].forEach(([field, text]) => {
    if (field.value.trim() === "") {
      showError(field, text);
      valid = false;
    } else {
      clearError(field);
    }
  });

  if (email.value.trim() === "") {
    showError(email, "Please enter your email.");
    valid = false;
  } else if (!isEmail(email.value.trim())) {
    showError(email, "Enter an email like name@example.com.");
    valid = false;
  } else {
    clearError(email);
  }

  if (!valid) {
    form.querySelector("[aria-invalid='true']").focus();
    return;
  }

  form.reset();
  if (roomFromUrl && [...roomSelect.options].some((option) => option.value === roomFromUrl)) {
    roomSelect.value = roomFromUrl;
  }
  success.hidden = false;
  success.focus();
});
