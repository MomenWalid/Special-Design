//////////////////////////////

// start local storage

// for color
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);

    document.querySelectorAll(".color-list li").forEach((element) => {
        element.classList.remove("active");

        if (element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });
}

// for background
//
let backgroundOption = true;
let backgroundControl;
let backgroundPic = document.querySelector(".option-box .images");
//

let background = localStorage.getItem("background-option");

document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
});

if (background !== null) {
    if (background === "true") {
        backgroundOption = true;

        backgroundPic.style.display = "none";

        document.querySelector(".random-background .yes").classList.add("active");
    } else {
        backgroundOption = false;

        backgroundPic.style.display = "block";

        document.querySelector(".random-background .no").classList.add("active");
    }
}

// end local storage for color

// start settings box
document.querySelector(".toggle-settings i").onclick = function() {
    this.classList.toggle("fa-spin");

    document.querySelector(".settings-box").classList.toggle("open");
};

// start Change color

const colorList = document.querySelectorAll(".color-list li");

colorList.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );

        // set value for a local storage
        localStorage.setItem("color-option", e.target.dataset.color);

        handelActive(e);
    });
});
// end Change color

// start Random Backgrounds

const backgroundEl = document.querySelectorAll(".random-background span");

backgroundEl.forEach((span) => {
    span.addEventListener("click", (e) => {
        handelActive(e);

        // check if rnadom back yes or no
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeBack();
            localStorage.setItem("background-option", true);

            backgroundPic.style.display = "none";
        } else {
            backgroundOption = false;
            clearInterval(backgroundControl);
            localStorage.setItem("background-option", false);

            backgroundPic.style.display = "block";
        }
    });
});

// end random background

// end settings box
// start landing page

let landingPage = document.querySelector(".landing");

let imageArr = [
    "pic1.jpeg",
    "pic2.jpeg",
    "pic3.jpeg",
    "pic4.jpeg",
    "pic5.jpeg",
    "pic6.jpeg",
    "pic7.jpeg",
    "pic8.jpg",
    "pic9.jpg",
    "pic10.jpg",
];

// use function to control the random background
function randomizeBack() {
    if (backgroundOption === true) {
        backgroundControl = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imageArr.length);

            landingPage.style.backgroundImage =
                'url("images/' + imageArr[randomNumber] + '")';
        }, 1000);
    }
}
randomizeBack();
// end landing page

// Start choose the background image

let backgroundPics = document.querySelectorAll(".option-box .images img");

backgroundPics.forEach((img) => {
    img.addEventListener("click", (e) => {
        landingPage.style.backgroundImage = "url( " + e.target.src + " )";

        landingPage.style.setProperty(
            "background-image",
            "url( " + e.target.src + " )"
        );

        localStorage.setItem("backgroundPicture", e.target.src);

        handelActive(e);
    });
});

// local storage for  chooseing

let backPic = localStorage.getItem("backgroundPicture");

if (backPic !== null) {
    landingPage.style.backgroundImage = "url( " + backPic + " )";

    landingPage.style.setProperty("background-image", backPic);

    backgroundPics.forEach((element) => {
        element.classList.remove("active");

        if (element.src === backPic) {
            element.classList.add("active");
        }
    });
}

// End choose the background image

// skill animation

let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    // skills offset top
    let skillsOffsetTop = ourSkills.offsetTop; //1041

    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight; //635

    // window height
    let windowHeight = this.innerHeight; //722

    // window scroll top
    windowScrollTop = this.pageYOffset;

    if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
        let skills = document.querySelectorAll(".skills-box .skills-progress span");

        skills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// skill progress

let skillProg = document.querySelectorAll(".skills .skills-progress span ");

skillProg.forEach((skil) => {
    skil.addEventListener("mouseover", (e) => {
        e.target.classList.add("open");
    });
});

skillProg.forEach((skil) => {
    skil.addEventListener("mouseout", (e) => {
        e.target.classList.remove("open");
    });
});

// create popup with images

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
        // create over lay element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";

        // add overlay to body

        document.body.appendChild(overlay);

        // create the popup
        let popupBox = document.createElement("div");

        popupBox.className = "popup-box";

        if (img.alt !== null) {
            // create heading
            let imgHeading = document.createElement("h3");

            // create text
            let imgText = document.createTextNode(img.alt);

            // add text to heading
            imgHeading.appendChild(imgText);

            // add heading to the popup
            popupBox.appendChild(imgHeading);
        }

        // create img
        let popupImage = document.createElement("img");

        popupImage.src = img.src;

        // add image to popup box
        popupBox.appendChild(popupImage);

        // add popup box to body
        document.body.appendChild(popupBox);

        // create the close span
        let closeButton = document.createElement("span");

        closeButton.className = "close-button";

        let closeButtonText = document.createTextNode("X");

        // add text to closebutton
        closeButton.appendChild(closeButtonText);

        popupBox.appendChild(closeButton);
    });
});

// close the popup

document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {
        // remove the current popup
        e.target.parentElement.remove();
        // document.querySelector(".popup-box").remove();

        // remove the overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// Start Dynamic Bullets
let bulletsContainer = document.querySelector(".nav-bullets");

let sections = document.querySelectorAll(".links a");

for (let i = 0; i < sections.length; i++) {
    let allBullets = document.createElement("div");
    allBullets.className = "bullets";
    allBullets.setAttribute("data-section", sections[i].dataset.section);

    let toolTip = document.createElement("div");
    toolTip.className = "tooltip";

    let toolTipText = document.createTextNode(sections[i].innerHTML);

    toolTip.appendChild(toolTipText);

    allBullets.appendChild(toolTip);

    bulletsContainer.appendChild(allBullets);
}
// End Dynamic Bullets

let allBullets = document.querySelectorAll(".nav-bullets .bullets");
let links = document.querySelectorAll(".header li a");

function scrollIntoSection(element) {
    element.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}

scrollIntoSection(allBullets);
scrollIntoSection(links);

function handelActive(ev) {
    // rmove active class for all li

    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });

    // add class avtive to the target

    ev.target.classList.add("active");
}

let bullets = document.querySelectorAll(".bullets-option span");

let bulletsLocal = localStorage.getItem("bullets-option");

if (bulletsLocal !== null) {
    bullets.forEach((element) => {
        element.classList.remove("active");
    });

    if (bulletsLocal === "show") {
        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";

        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bullets.forEach((span) => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";

            localStorage.setItem("bullets-option", "show");
        } else {
            bulletsContainer.style.display = "none";

            localStorage.setItem("bullets-option", "hide");
        }

        handelActive(e);
    });
});

document.querySelector(".reset").onclick = function() {
    // localStorage.clear();

    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");

    window.location.reload();
};

// close the menu from any where

let togglebtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links ul");

togglebtn.onclick = function(e) {
    e.stopPropagation();

    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open");
};

tLinks.onclick = function(e) {
    e.stopPropagation();
};

document.addEventListener("click", (e) => {
    if (e.target !== togglebtn && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            togglebtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");
        }
    }
});