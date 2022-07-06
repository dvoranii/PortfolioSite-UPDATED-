// Fetch modal
let index = 0;
let htmlTemplate;
let templateArray = [];
let modalContainer = document.querySelector(".modal");
let galleryTemplate;

const getModal = (container, index) => {
  fetch("/models/projects.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let projArr = Object.entries(data);
      projArr.forEach((project, i) => {
        htmlTemplate = `
       
        <div class="modal-img-wrapper">
        <h2 class="project-title mobile">${project[1].title}</h2>
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
                        <li class="tech-item tech-item-2" id="tech-icon"><img src="${project[1].techIcons.icon2}" alt=""></li>
                        <li class="tech-item tech-item-3" id="tech-icon"><img src="${project[1].techIcons.icon3}" alt=""></li>
                        <li class="tech-item tech-item-4" id="tech-icon"><img src="${project[1].techIcons.icon4}" alt=""></li>
                        <li class="tech-item tech-item-5" id="tech-icon"><img src="${project[1].techIcons.icon5}" alt=""></li>
                        <li class="tech-item tech-item-6" id="tech-icon"><img src="${project[1].techIcons.icon6}" alt=""></li>
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

      // try to make this a function
      let galleryItem = document.querySelectorAll("#gallery-item");
      let currentImg = document.querySelector(".current-img");
      let placeholder;

      swapGalleryImg(galleryItem, currentImg, placeholder);
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

function getIndex(e) {
  e.preventDefault();
  index = e.currentTarget.classList[1].slice(-1);
  getModal(modalContainer, index);
  showModal();
}

// get index of target element then get modal with said index
function showModal() {
  modalBg.classList.add("active");
  modalBg.style.visibility = "visible";
  modalBg.style.opacity = 1;

  modal.classList.add("active");
  modal.style.visibility = "visible";
  modal.style.opacity = 1;
}

// clear modal container after closing modal
function clearContainer() {
  let lc = modalContainer.firstChild;
  while (lc.nextSibling) {
    modalContainer.removeChild(lc.nextSibling);
  }
}

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

function swapGalleryImg(galleryItem, currentImg, placeholder) {
  galleryItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      placeholder = e.currentTarget.src;
      e.currentTarget.src = currentImg.src;
      currentImg.src = placeholder;
    });
  });
}
