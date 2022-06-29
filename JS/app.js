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
const contactSection = document.querySelector(".contact-section");

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

// Basic scroll

function scrollAnimWrapper(params) {
  if (!params.elem) return;
  basicScroll.create(params).start();
}

scrollAnimWrapper({
  elem: document.querySelector(".skills-section"),
  from: "top-middle",
  to: "bottom-middle",
  props: {
    "--scroll": {
      from: 0,
      to: 0.2,
    },
  },
});
