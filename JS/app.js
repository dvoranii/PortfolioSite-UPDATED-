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
