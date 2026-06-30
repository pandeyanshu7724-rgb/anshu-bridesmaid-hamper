window.selectedBride = "";

window.chooseBride = function(name) {
  window.selectedBride = name;

  var welcomePage = document.getElementById("welcomePage");
  var hamperPage = document.getElementById("hamperPage");
  var hamperTitle = document.getElementById("hamperTitle");

  var buttons = document.querySelectorAll(".envelope-card");

  buttons.forEach(function(button) {
    if (button.textContent.includes(name)) {
      button.classList.add("opening");
    }
    button.disabled = true;
  });

  setTimeout(function() {
    welcomePage.classList.remove("active");
    hamperPage.classList.add("active");
    hamperTitle.textContent = name + "'s Hamper";
  }, 700);
};

window.finishHamper = function() {
  document.getElementById("hamperPage").classList.remove("active");
  document.getElementById("thankYouPage").classList.add("active");
  document.getElementById("thankYouTitle").textContent = "Thank you, " + window.selectedBride;
};
