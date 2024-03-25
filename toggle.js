function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);

  const primaryColorDelay = 3000;
  setTimeout(() => {
    body.classList.add("hide-primary-color");
  }, primaryColorDelay);
}

function loadModePreference() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  const body = document.body;
  if (isDarkMode) {
    body.classList.add("dark-mode");
    switchInput.checked = false;
  } else {
    body.classList.remove("dark-mode");
    switchInput.checked = true;
  }
}
const switchInput = createElement("input", {
  type: "checkbox",
  id: "switchInput",
  checked: localStorage.getItem("darkMode") === "true",
});

const slider = createElement("div", {
  class: "slider",
});
slider.addEventListener("click", toggleMode);

const switchElement = createElement("label", {
  class: "switch",
});
switchElement.appendChild(switchInput);
switchElement.appendChild(slider);

document.body.appendChild(switchElement);

loadModePreference();
