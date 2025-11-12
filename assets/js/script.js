'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// project modal variables
const projectItems = document.querySelectorAll("[data-project-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal content elements
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalCategory = document.querySelector("[data-modal-category]");
const modalDescription = document.querySelector("[data-modal-description]");
const modalTech = document.querySelector("[data-modal-tech]");
const modalVideoContainer = document.querySelector("[data-modal-video-container]");
const modalVideo = document.querySelector("[data-modal-video]");
const modalDemoContainer = document.querySelector("[data-modal-demo-container]");
const modalDemo = document.querySelector("[data-modal-demo]");
const modalGithub = document.querySelector("[data-modal-github]");
const modalDemoBtn = document.querySelector("[data-modal-demo-btn]");
const galleryThumbnails = document.querySelector("[data-gallery-thumbnails]");

// modal toggle function
const projectModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  
  // Clear iframe src when closing to stop loading
  if (!modalContainer.classList.contains("active")) {
    if (modalDemo) modalDemo.src = "";
    if (modalVideo) modalVideo.src = "";
  }
}

// gallery image switch function
const switchGalleryImage = function(imageSrc) {
  modalImg.src = imageSrc;
  
  // Update active thumbnail
  const thumbnails = galleryThumbnails.querySelectorAll('.gallery-thumbnail');
  thumbnails.forEach(thumb => {
    if (thumb.querySelector('img').src === imageSrc) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// add click event to all project items
for (let i = 0; i < projectItems.length; i++) {
  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();

    // Get project data from attributes
    const projectTitle = this.getAttribute("data-project-title");
    const projectCategory = this.getAttribute("data-project-category");
    const projectDescription = this.getAttribute("data-project-description");
    const projectTech = this.getAttribute("data-project-tech");
    const projectGithub = this.getAttribute("data-project-github");
    const projectVideo = this.getAttribute("data-project-video");
    const projectDemo = this.getAttribute("data-project-demo");
    const projectImages = this.getAttribute("data-project-images");
    const projectImgSrc = this.querySelector("img").src;
    const projectImgAlt = this.querySelector("img").alt;

    // Populate modal with project data
    modalImg.src = projectImgSrc;
    modalImg.alt = projectImgAlt;
    modalTitle.innerHTML = projectTitle;
    modalCategory.innerHTML = projectCategory;
    modalDescription.innerHTML = projectDescription;
    modalTech.innerHTML = projectTech;
    modalGithub.href = projectGithub;

    // Handle gallery images
    if (projectImages && projectImages.trim() !== "") {
      const imagesArray = projectImages.split(',').map(img => img.trim());
      
      if (imagesArray.length > 1) {
        // Show gallery thumbnails
        galleryThumbnails.style.display = "flex";
        galleryThumbnails.innerHTML = "";
        
        imagesArray.forEach((imageSrc, index) => {
          const thumbnail = document.createElement('div');
          thumbnail.className = 'gallery-thumbnail';
          if (index === 0) thumbnail.classList.add('active');
          
          const thumbImg = document.createElement('img');
          thumbImg.src = imageSrc;
          thumbImg.alt = `${projectTitle} ${index + 1}`;
          
          thumbnail.appendChild(thumbImg);
          thumbnail.addEventListener('click', function() {
            switchGalleryImage(imageSrc);
          });
          
          galleryThumbnails.appendChild(thumbnail);
        });
      } else {
        // Hide gallery if only one image
        galleryThumbnails.style.display = "none";
      }
    } else {
      galleryThumbnails.style.display = "none";
    }

    // Show/hide video section
    if (projectVideo && projectVideo.trim() !== "") {
      modalVideo.src = projectVideo;
      modalVideoContainer.style.display = "block";
    } else {
      modalVideo.src = "";
      modalVideoContainer.style.display = "none";
    }

    // Show/hide live demo section
    if (projectDemo && projectDemo.trim() !== "") {
      modalDemo.src = projectDemo;
      modalDemoContainer.style.display = "block";
      modalDemoBtn.style.display = "flex";
      
      // Scroll to demo section when button clicked
      modalDemoBtn.addEventListener("click", function(e) {
        e.preventDefault();
        modalDemoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      modalDemo.src = "";
      modalDemoContainer.style.display = "none";
      modalDemoBtn.style.display = "none";
    }

    projectModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", projectModalFunc);
overlay.addEventListener("click", projectModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}