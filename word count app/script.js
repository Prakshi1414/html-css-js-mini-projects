//Select the input field and buttons
const inputfield = document.querySelector("form input");
const resetbtn = document.getElementById("btn1");
const clearbtn = document.getElementById("btn2");

//Create a display area for counts
const counterdisplay = document.createElement("div");
counterdisplay.style.color = "white";
counterdisplay.style.fontSize = "24px";
counterdisplay.style.marginTop = "150px";
counterdisplay.style.textAlign = "center";
document.querySelector(".word-counter-page").appendChild(counterdisplay);

//Function to update word and character counts
function updateCounts() {
  const text = inputfield.value.trim();
  let words = 0;

  // Count words (ignore multiple spaces)
  if (text !== "") {
    words = text.split(/\s+/).length;
  }
  const characters = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, "").length; // remove all spaces

  // Show counts
  counterdisplay.innerHTML = `Total Words: ${words} <br>Total Characters: ${characters}<br> Total characters without space: ${charactersWithoutSpaces}`;
}

// update counts
inputfield.addEventListener("input", updateCounts);

// Reset button:
resetbtn.addEventListener("click", function (e) {
  e.preventDefault();
  inputfield.value = "";
  updateCounts();
  let element = document.body;
  element.classList.toggle("dark-mode");
});

//Clear button:
clearbtn.addEventListener("click", function (e) {
  e.preventDefault();
  inputfield.value = "";
  counterdisplay.innerHTML = "";
  let element = document.body;
  element.classList.toggle("light-mode")
});
