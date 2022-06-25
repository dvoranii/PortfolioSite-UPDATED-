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

// form validation

function getAPIKey(url) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.key;
    });
}
var config = {
  apiKey: `${getAPIKey("/models/api-key.json")}`,
  authDomain: "my-portfolio-contact-bbb79.firebaseapp.com",
  databaseURL: "https://my-portfolio-contact-bbb79-default-rtdb.firebaseio.com",
  projectId: "my-portfolio-contact-bbb79",
  storageBucket: "my-portfolio-contact-bbb79.appspot.com",
  messagingSenderId: "102302868462",
  appId: "1:102302868462:web:e65e63232b2ff7fbf6a4ff",
};

// Initialize Firebase
firebase.initializeApp(config);
const messagesRef = firebase.database().ref("messages");

const form = document.getElementById("contactForm");
let errorName = document.querySelector(".errorName");
let errorEmail = document.querySelector(".errorEmail");
// const errorEmail2 = document.querySelector(".errorEmail2");

const messageSuccess = document.querySelector(".success");

const emailErrorMsg1 = "*Please enter an email address";
const emailErrorMsg2 = "*Please enter a valid email address (123@example.com)";

const mailFormat = /^\S+@\S+\.\S+$/;
let valid = false;

// firebase connection
form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  let name = getInputVal("name");
  let email = getInputVal("email");
  let message = getInputVal("message");

  validateForm(name, email);
  if (valid === true) {
    saveMessage(name, email, message);
    console.log("form submitted!!!");
  }
}

// function to get form values

function getInputVal(id) {
  return document.getElementById(id).value;
}

function saveMessage(name, email, message) {
  let newMessagesRef = messagesRef.push();
  newMessagesRef.set({
    name: name,
    email: email,
    message: message,
  });
}

function validateForm(name, email) {
  //   Nothing entered in name field
  if (name === "" || name == null) {
    errorName.classList.add("display");
    valid = false;
  }

  // entering name after nothing was entered
  if (name !== "" && errorName.classList.contains("display")) {
    errorName.classList.remove("display");
    valid = false;
  }

  // nothing entered in email field
  if (email === "" || email == null) {
    errorEmail.classList.add("display");
    valid = false;
  }
  // entering email after nothing was entered previously
  if (email !== "" && errorEmail.classList.contains("display")) {
    errorEmail.classList.remove("display");
    valid = false;
  }

  // incorrect email entered
  if (!email.match(mailFormat) && email !== "") {
    errorEmail.textContent = emailErrorMsg2;
    ("");
    errorEmail.classList.add("display");
    valid = false;
  }

  // error message removed after entering some value
  if (errorEmail.textContent === emailErrorMsg2 && email === "") {
    errorEmail.textContent = emailErrorMsg1;
    valid = false;
  }

  if (
    !errorName.classList.contains("display") &&
    !errorEmail.classList.contains("display")
  ) {
    // window.location.href = "thank-you.html";
    messageSuccess.classList.add("active");
    setTimeout(() => {
      messageSuccess.classList.remove("active");
      form.reset();
    }, 3000);

    valid = true;
  }
}
