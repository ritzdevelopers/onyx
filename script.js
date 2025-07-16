// --------------------------- HEADER
let lastScroll = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    header.style.transform = "translateY(-100%)"; // scroll down -> hide
  } else {
    header.style.transform = "translateY(0)"; // scroll up -> show
  }
  lastScroll = currentScroll;
});

// Mobile menu logic
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

const openMobileMenu = () => {
  mobileMenu.classList.remove("-translate-x-full");
  document.body.style.overflow = "hidden"; // Lock scroll
};

const closeMobileMenu = () => {
  mobileMenu.classList.add("-translate-x-full");
  document.body.style.overflow = ""; // Unlock scroll
};

const toggleMobileMenu = () => {
  const isOpen = !mobileMenu.classList.contains("-translate-x-full");
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
};

hamburger.addEventListener("click", toggleMobileMenu);

// Close when clicking outside menu content
mobileMenu.addEventListener("click", (e) => {
  const isClickInside = e.target.closest(".flex");
  if (!isClickInside) {
    closeMobileMenu();
  }
});

// Close when clicking on any link inside the mobile menu
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});


// Projects
