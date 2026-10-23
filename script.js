// The gallery loads every image in the project automatically (see build.js).
// To add a new design later, just upload the image to GitHub.

const grid = document.getElementById("grid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

// No category filters while images are auto-loaded
const filters = document.querySelector(".filters");
if (filters) filters.remove();

function render(list) {
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML = "<p>Designs coming soon.</p>";
    return;
  }
  list.forEach((file, i) => {
    const src = encodeURI(file);
    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `<img src="${src}" alt="Splendy Gift Designs work ${i + 1}" loading="lazy">`;
    el.addEventListener("click", () => {
      lightboxImg.src = src;
      lightboxImg.alt = "Splendy Gift Designs work " + (i + 1);
      lightbox.hidden = false;
    });
    grid.appendChild(el);
  });
}

fetch("images.json")
  .then(r => r.json())
  .then(render)
  .catch(() => render([]));

lightbox.addEventListener("click", e => {
  if (e.target === lightbox || e.target.classList.contains("close")) lightbox.hidden = true;
});
document.addEventListener("keydown", e => { if (e.key === "Escape") lightbox.hidden = true; });

document.getElementById("year").textContent = new Date().getFullYear();

// Flyers stay hidden until the visitor taps "View my work" (or "Work" in the menu)
const workSection = document.getElementById("work");
function showWork() {
  workSection.hidden = false;
  setTimeout(() => workSection.scrollIntoView({ behavior: "smooth" }), 50);
}
document.querySelectorAll('a[href="#work"]').forEach(a =>
  a.addEventListener("click", e => { e.preventDefault(); showWork(); })
);

// Three-line menu (mobile)
const menuBtn = document.getElementById("menu");
const navEl = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = navEl.classList.toggle("open");
  menuBtn.innerHTML = open ? "&#10005;" : "&#9776;";
});
navEl.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navEl.classList.remove("open");
  menuBtn.innerHTML = "&#9776;";
}));
