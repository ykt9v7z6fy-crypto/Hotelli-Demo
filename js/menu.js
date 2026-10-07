const menuButton = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  siteMenu.hidden = !open;
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!open);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

document.addEventListener("click", (event) => {
  if (menuButton.getAttribute("aria-expanded") !== "true") {
    return;
  }
  if (siteMenu.contains(event.target) || menuButton.contains(event.target)) {
    return;
  }
  setMenuOpen(false);
});
