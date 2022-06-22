// nav
const btnNavEl = document.querySelector(".btn-mobile-nav");
const navList = document.querySelector(".nav-list");

btnNavEl.addEventListener("click", () => {
  navList.classList.toggle("nav-active");
});
