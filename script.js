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

// heroForm
document.getElementById("heroForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form reload

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Submit to Google Apps Script endpoint
    fetch(
      "https://script.google.com/macros/s/AKfycbwFUrsuEzkLUjc07z9MXmKwKSb1zGNo8gCJrmNLI0mCqkhopIjdHYqzvT2zcTKMpqL7Xg/exec", // Replace with your actual URL
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          alert("Form submitted successfully!");
          form.reset();
          document
            .getElementById("popupOverlay")
            .classList.add("opacity-0", "pointer-events-none");
        } else {
          alert("Submission failed: " + (data.message || "Unknown error"));
        }
      })
      .catch((err) => {
        console.error("Submission Error:", err);
        alert("Submission failed. Please try again.");
      });
  });
});
