let count = 0;
const countDisplay = document.getElementById("count");
const clickBtn = document.getElementById("btn");
const resetBtn = document.getElementById("reset");
const body = document.body;

// Function to generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++)
     {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Increase count and change background color
clickBtn.addEventListener("click", () => {
  count++;
  countDisplay.textContent = count;
  body.style.backgroundColor = getRandomColor();
});

// Reset count and background color
resetBtn.addEventListener("click", () => {
  count = 0;
  countDisplay.textContent = count;
  body.style.backgroundColor = '#89f7fe';
});
