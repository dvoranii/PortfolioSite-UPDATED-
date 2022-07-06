// Google Firebase Connection
let key;

function getAPIKey(url) {
  fetch(url)
    .then((res) => {
      key = key;
      return res.json();
    })
    .then((data) => {
      return data.key;
    });
}
var config = {
  apiKey: `${getAPIKey("/models/firebase-key.json")}`,
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
    sendEmail(name, email, message);
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

// form validation
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
