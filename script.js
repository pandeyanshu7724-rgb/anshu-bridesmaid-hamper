let selectedBride = "";

function chooseBride(name) {
  selectedBride = name;

  const buttons = document.querySelectorAll(".envelope-card");
  buttons.forEach(button => button.disabled = true);

  const chosenButton = [...buttons].find(button =>
    button.textContent.includes(name)
  );

  if (chosenButton) {
    chosenButton.classList.add("opening");
  }

  setTimeout(() => {
    document.getElementById("welcomePage").classList.remove("active");
    document.getElementById("hamperPage").classList.add("active");
    document.getElementById("hamperTitle").textContent = `${name}'s Hamper`;
  }, 750);
}

function finishHamper() {
  document.getElementById("hamperPage").classList.remove("active");
  document.getElementById("thankYouPage").classList.add("active");
  document.getElementById("thankYouTitle").textContent = `Thank you, ${selectedBride}`;
}
