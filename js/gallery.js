const photos = document.querySelectorAll(".zoomable");

if (photos.length > 0) {
  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.innerHTML = '<button type="button" class="lightbox-close">Close</button><img alt="">';
  document.body.appendChild(dialog);

  const full = dialog.querySelector("img");
  const closeButton = dialog.querySelector(".lightbox-close");

  function openPhoto(img) {
    full.src = img.currentSrc || img.src;
    full.alt = img.alt;
    dialog.showModal();
    closeButton.focus();
  }

  photos.forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `Enlarge image: ${img.alt}`);
    img.addEventListener("click", () => openPhoto(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPhoto(img);
      }
    });
  });

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}
