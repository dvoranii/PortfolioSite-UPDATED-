// Typing Effect
function typeEffect(element, speed) {
  let text = "Front-End Developer";

  let i = 0;

  let timer = setInterval(() => {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

let speed = 75;
let jobTitle = document.querySelector(".hero-job-title-text");

// nav
const btnNavEl = document.querySelector(".btn-mobile-nav");
const navList = document.querySelector(".nav-list");
let delay = jobTitle.innerHTML.length * speed + speed;

setTimeout(() => {
  typeEffect(jobTitle, speed);
}, 300);

btnNavEl.addEventListener("click", () => {
  navList.classList.toggle("nav-active");
});

// Sticky Nav

const sectionHeroEl = document.querySelector(".hero-section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
      document.body.classList.add("box-shadow");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
      document.body.classList.remove("box-shadow");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-96px",
  }
);
obs.observe(sectionHeroEl);

// const instance = basicScroll.create({
//   elem: document.querySelector(".skills-section"),
//   from: "0px",
//   to: "800px",
//   props: {
//     "--opacity": {
//       from: 0.01,
//       to: 0.99,
//     },
//   },
// });

// instance.start();

const textBox = document.querySelectorAll(".textbox");
const item = document.querySelectorAll(".item");
const imgBox = document.querySelector(".image-box");

const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");

const closeBtn = document.querySelector(".close-btn");

textBox.forEach((box) => {
  box.addEventListener("click", () => {
    showModal();
  });
});

item.forEach((item) => {
  item.addEventListener("click", () => {
    showModal();
  });
});

function showModal() {
  modalBg.classList.add("active");
  modalBg.style.visibility = "visible";
  modalBg.style.opacity = 1;

  modal.classList.add("active");
  modal.style.visibility = "visible";
  modal.style.opacity = 1;
}

closeBtn.addEventListener("click", () => {
  modalBg.classList.remove("active");
  modalBg.style.visibility = "hidden";
  modalBg.style.opacity = 0;

  modal.classList.remove("active");
  modal.style.visibility = "hidden";
  modal.style.opacity = 0;
});
