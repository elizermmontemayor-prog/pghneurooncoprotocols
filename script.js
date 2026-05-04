const PASSWORD = "CI101";

const guides = {
  stupp: {
    title: "Stupp Protocol",
    image: "assets/stupp-guide.png",
    alt: "QR code guide for Stupp Protocol",
  },
  stupp12: {
    title: "Stupp12 Protocol",
    image: "assets/stupp12-guide.png",
    alt: "QR code guide for Stupp12 Protocol",
  },
  pcv: {
    title: "PCV Protocol",
    image: "assets/pcv-guide.png",
    alt: "QR code guide for PCV Protocol",
  },
  metronomic: {
    title: "Metronomic TMZ Protocol",
    image: "assets/metronomic-tmz-guide.png",
    alt: "QR code guide for Metronomic TMZ Protocol",
  },
};

const authScreen = document.querySelector("#authScreen");
const dashboard = document.querySelector("#dashboard");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#passwordInput");
const errorMessage = document.querySelector("#errorMessage");
const lockButton = document.querySelector("#lockButton");
const guideTitle = document.querySelector("#guideTitle");
const guideDescription = document.querySelector("#guideDescription");
const guideImage = document.querySelector("#guideImage");
const protocolButtons = document.querySelectorAll(".protocol-button");

function unlockDashboard() {
  authScreen.classList.add("is-hidden");
  dashboard.classList.remove("is-locked");
}

function lockDashboard() {
  dashboard.classList.add("is-locked");
  authScreen.classList.remove("is-hidden");
  passwordInput.value = "";
  errorMessage.textContent = "";
  passwordInput.focus();
}

function selectGuide(key) {
  const guide = guides[key];

  if (!guide) {
    return;
  }

  guideTitle.textContent = guide.title;
  guideDescription.textContent = "Allow the patient to scan the QR code for a personalized guide to chemotherapy.";
  guideImage.src = guide.image;
  guideImage.alt = guide.alt;

  protocolButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.guide === key);
  });
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value === PASSWORD) {
    unlockDashboard();
    return;
  }

  errorMessage.textContent = "Incorrect password.";
  passwordInput.select();
});

lockButton.addEventListener("click", lockDashboard);

protocolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectGuide(button.dataset.guide);
  });
});
