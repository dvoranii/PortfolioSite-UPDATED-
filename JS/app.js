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
// obs.observe(contactSection);

// const instance = basicScroll.create({
//   elem: document.querySelector(".skills-section"),
//   from: "top-top",
//   to: "bottom-middle",
//   props: {
//     "--opacity": {
//       from: 0.01,
//       to: 0.99,
//     },
//   },
// });

// instance.start();

// Fetch modal
let index = 0;
let htmlTemplate;
let templateArray = [];
let modalContainer = document.querySelector(".modal");

const getModal = (container, index) => {
  fetch("/models/projects.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let projArr = Object.entries(data);

      projArr.forEach((project, i) => {
        htmlTemplate = `
        <h2 class="project-title mobile">${project[1].title}</h2>
        <div class="modal-img-wrapper">
            <img src="${project[1].images.currentImg}" alt="" class="modal-img current-img">

            <!-- use a loop to do this -->
                <div class="gallery-img-wrapper">
                    <img src="${project[1].images.imgGallery.item1}" id="gallery-item" alt="">
                    <img src="${project[1].images.imgGallery.item2}" id="gallery-item" alt="">
                    <img src="${project[1].images.imgGallery.item3}" id="gallery-item" alt="">
                    <img src="${project[1].images.imgGallery.item4}" id="gallery-item" alt="">
                </div>
            </div>
        <div class="project-details">
            <div class="project-header">
                <h2 class="project-title desktop">${project[1].title}</h2>
            </div>
            <p class="modal-paragraph">${project[1].description}</p>

            <!-- use a loop to do this -->
                <div class="tech-icons">
                    <ul class="tech-icons-list">
                        <li class="tech-item tech-item-1"><img src="${project[1].techIcons.icon1}" alt=""></li>
                        <li class="tech-item tech-item-1"><img src="${project[1].techIcons.icon2}" alt=""></li>
                        <li class="tech-item tech-item-1"><img src="${project[1].techIcons.icon3}" alt=""></li>
                        <li class="tech-item tech-item-1"><img src="${project[1].techIcons.icon4}" alt=""></li>
                        <li class="tech-item tech-item-1"><img src="${project[1].techIcons.icon5}" alt=""></li>
                        <li class="tech-item tech-item-1"><img src="${project[1].techIcons.icon6}" alt=""></li>
                    </ul>
                </div>

                <div class="modal-btns">
                    <a href ="${project[1].btnLinks.liveSite}" target="_blank"">
                        <button class="live-demo-btn">
                        <div class="icon-wrapper">
                            <img src="/assets/modal-img/laptop-outline.svg" alt="" id="modal-laptop-icon">
                            <span class="live-demo-text">Live Website</span>
                        </div>
                    </button>
                    </a>

                    <a href="${project[1].btnLinks.repo}" target="_blank">
                        <button class="gh-btn">
                            <div class="icon-wrapper">
                                <img src="/assets/modal-img//logo-github (1).svg" alt="" id="modal-gh-icon">
                                <span class="gh-text">Repository</span>
                            </div>
                        </button>
                    </a>
                 </div>
                 </div>`;

        //
        if (i + 1 == index) {
          container.insertAdjacentHTML("afterbegin", htmlTemplate);
        }
      });
    });
};

// getModal(modalContainer, "OG Creations Recording Studio Website");

const textBox = document.querySelectorAll(".textbox");
const item = document.querySelectorAll(".item");
const imgBox = document.querySelector(".image-box");

const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");

let closeBtn = document.querySelector(".close-btn");

function chooseProject(item) {
  item.forEach((item) => {
    item.addEventListener("click", (e) => {
      modalContainer.insertAdjacentElement("afterbegin", closeBtn);
      getIndex(e);
    });
  });
}

chooseProject(textBox);
chooseProject(item);

// get index of target element then get modal with said index, then show modal
function getIndex(e) {
  e.preventDefault();
  index = e.currentTarget.classList[1].slice(-1);
  getModal(modalContainer, index);
  showModal();
}

function showModal() {
  modalBg.classList.add("active");
  modalBg.style.visibility = "visible";
  modalBg.style.opacity = 1;

  modal.classList.add("active");
  modal.style.visibility = "visible";
  modal.style.opacity = 1;
}

let closeBtnChild;

function clearContainer() {
  let lc = modalContainer.firstChild;

  while (lc.nextSibling) {
    modalContainer.removeChild(lc.nextSibling);
  }
}

// clearContainer();

closeBtn.addEventListener("click", () => {
  modalBg.classList.remove("active");
  modalBg.style.visibility = "hidden";
  modalBg.style.opacity = 0;

  modal.classList.remove("active");
  modal.style.visibility = "hidden";
  modal.style.opacity = 0;

  clearContainer();
});

// image swapping for modal
// might use flickity here
// Look into making videos for projects

// Turn this into a function and call it when clicking on an item
let galleryItem = document.querySelectorAll("#gallery-item");
let currentImg = document.querySelector(".current-img");

let placeholder;

galleryItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    placeholder = e.currentTarget.src;
    e.currentTarget.src = currentImg.src;
    currentImg.src = placeholder;
  });
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
    // messageSuccess.classList.add("active");
    // setTimeout(() => {
    //   messageSuccess.classList.remove("active");
    //   form.reset();
    // }, 3000);

    valid = true;
    form.reset();
  }
}
