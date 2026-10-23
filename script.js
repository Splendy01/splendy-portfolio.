// Put your design images in the "images" folder using the file names below.
// category: "birthday", "event", "business" or "social"
const works = [
  { title: "Happy Birthday (Gold & Green)", category: "birthday", label: "Birthday Design", img: "birthday-green.jpg" },
  { title: "Data Path Integrated Limited", category: "business", label: "Business Ad",      img: "data-path.jpg" },
  { title: "New Week, Make It Count",      category: "social",   label: "Social Media",     img: "new-week.jpg" },
  { title: "Eagles Gathering 2.0",         category: "event",    label: "Event Flyer",      img: "eagles-gathering.jpg" },
  { title: "Happy Birthday (Black & White)", category: "birthday", label: "Birthday Design", img: "birthday-bw.jpg" },
  { title: "Promobal",                     category: "business", label: "Business Ad",      img: "promobal.jpg" },
  { title: "Welcome to October",           category: "social",   label: "Social Media",     img: "october.jpg" },
  { title: "Happy Birthday Peller",        category: "birthday", label: "Birthday Design",  img: "peller.jpg" },
  { title: "Youth Sunday",                 category: "event",    label: "Event Flyer",      img: "youth-sunday.jpg" },
  { title: "German Class",                 category: "business", label: "Business Ad",      img: "german-class.jpg" }
];

const grid = document.getElementById("grid");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

function render(filter = "all") {
  grid.innerHTML = "";
  works
    .filter(w => filter === "all" || w.category === filter)
    .forEach(w => {
      const el = document.createElement("div");
      el.className = "item";
      el.innerHTML = `<img src="${w.img}" alt="${w.title}" loading="lazy">
        <div class="cap">${w.title}<small>${w.label}</small></div>`;
      el.addEventListener("click", () => {
        lightboxImg.src = w.img;
        lightboxImg.alt = w.title;
        lightbox.hidden = false;
      });
      grid.appendChild(el);
    });
}

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    render(chip.dataset.filter);
  });
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox || e.target.classList.contains("close")) lightbox.hidden = true;
});
document.addEventListener("keydown", e => { if (e.key === "Escape") lightbox.hidden = true; });

document.getElementById("year").textContent = new Date().getFullYear();
render();
