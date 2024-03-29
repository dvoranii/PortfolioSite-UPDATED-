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

const burgerBtn = document.querySelector(".burger-btn");
const xBtn = document.querySelector(".x-btn");
let count = 0;

btnNavEl.addEventListener("click", () => {
  navList.classList.toggle("nav-active");
  count++;
  if (count % 2 > 0) {
    burgerBtn.classList.add("hide");
    xBtn.classList.add("active");
  }
  if (count % 2 == 0) {
    xBtn.classList.remove("active");
    burgerBtn.classList.remove("hide");
  }
});

const navLinks = document.querySelectorAll(".mobile-nav-link");
// const headerEl = document.querySelector("header");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("nav-active");
  });
});

// Sticky Nav

const sectionHeroEl = document.querySelector(".hero-section");
const contactSection = document.querySelector(".contact-section");
const footerSection = document.querySelector(".footer grid");
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

let ctaBtn = document.querySelector("#cta-btn-hero");

const obs2 = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    if (ent.isIntersecting) {
      ctaBtn.classList.add("hide");
    }
    if (!ent.isIntersecting) {
      ctaBtn.classList.remove("hide");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-350px",
  }
);

obs2.observe(contactSection);

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

// date
const dateContainer = document.querySelector(".date");
const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();
const hour = now.getHours();
const min = now.getMinutes();

dateContainer.textContent = `${year}`;

// year month day
