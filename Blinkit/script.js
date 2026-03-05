//search bar me item har 3 secound me change ho aur extra items name add ho.
document.addEventListener("DOMContentLoaded", () => {
  // Search bar + automatic rotation
  const searchInput = document.querySelector(".search-input");

  // items to cycle
  const items = [
    'Search "Milk"',
    'Search "Vegitable"',
    'Search "Eggs"',
    'Search "chess"',
    'Search "Rice"',
    'Search "mask"',
    'Search "Tea"',
    'Search "Bread"',
    'Search "suger"',
  ];
  let index = 0;

  function rotateSearchItem() {
    if (searchInput.value === "") {
      searchInput.placeholder = items[index];
      index++;
      if (index >= items.length) index = 0;
    }
  }
  setInterval(rotateSearchItem, 3000);
});

// jobhi items search kre sirf vhi dikhai de aur search kra text console me dikhai de
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");

  const dairyItems = document.querySelectorAll(".item-names");
  const tabaccoItems = document.querySelectorAll(".item-namess");
  const pharmacyItems = document.querySelectorAll(".items-namess");


  const dairySection = document.querySelector(".dairy-item");
  const tabaccoSection = document.querySelector(".tabocco-item");
  const pharmacysection = document.querySelector(".pharmacy-items");


  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    // **Log the user query in console**
    console.log("User searched:", query);

    function filterItems(items, section) {
      let anyVisible = false;

      items.forEach((item) => {
        const h2 = item.querySelector("h2");
        if (!h2) return;

        const name = h2.textContent.toLowerCase();
        if (name.includes(query)) {
          item.style.display = "block";
          anyVisible = true;
        } else {
          item.style.display = "none";
        }
      });

      section.style.display = anyVisible ? "block" : "none";
    }

    filterItems(dairyItems, dairySection);
    filterItems(tabaccoItems, tabaccoSection);
    filterItems(pharmacyItems, pharmacysection);
  });
});

//search bar pe enter krte location and login hide ho jaye.
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const navDelivery = document.querySelector(".nav-delivery");
  const navRight = document.querySelector(".login");
  const navSearch = document.querySelector(".nav-search input");

  // Focus pe trigger
  searchInput.addEventListener("focus", () => {
    // Hide delivery info & login/cart
    if (navDelivery) navDelivery.style.display = "none";
    if (navRight) navRight.style.display = "none";
    //search bar se bahar click krne pe vapis purana tha vesa ho jaye navbar
    searchInput.addEventListener("blur", () => {
      if (navDelivery) navDelivery.style.display = "block";
      if (navRight) navRight.style.display = "block";
      if (navSearch) {
        navSearch.style.width = "100%";
        navSearch.style.fontSize = "1.2rem";
        navSearch.style.padding = "10px";
      }
    });
  });
});

//LOGIN PAGE.
document.addEventListener("DOMContentLoaded", () => {
  // Login link
  const loginBtn = document.querySelector(".login");

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!document.getElementById("loginModal")) {
      const modal = document.createElement("div");
      modal.id = "loginModal";
      modal.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      `;

      // Modal content
      const modalContent = document.createElement("div");
      modalContent.style.cssText = `
        background: white;
        padding: 30px;
        background-color: lightwhite;
        border-radius: 12px;
        width: 400px;
        height:300px;
        text-align: center;
        position: relative;
      `;

      modalContent.innerHTML = `
        <h2> India's Last Minite App</h2>
        <p> LOG IN</p>
        <input type="text" placeholder="Username" style="width:80%; padding:8px; margin:10px 0; border-radius:8px; "><br>
        <input type="password" placeholder="Password" style="width:80%; padding:8px; margin:10px 0; border-radius:8px; "><br>
        <button style="padding:8px 15px; margin-top:10px;">Login</button>
        <span id="closeLogin" style="position:absolute; top:10px; right:15px; cursor:pointer; font-weight:bold;">&times;</span>
      `;

      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Close button
      document.getElementById("closeLogin").addEventListener("click", () => {
        modal.remove();
      });

      // Modal ke bahar click pe close
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.remove();
        }
      });
    }
  });
});

//location popup
const locationIcon = document.querySelector(".nav-delivery");

// Create popup dynamically 
const popup = document.createElement("div");
popup.innerHTML = `
  <div id="locationBox" style="
    position: absolute;
    top: 100%; 
    left: 0; 
    margin-top: 10px;
    background: white;
    padding: 20px 25px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    width: 400px;
    z-index: 1000;">
    <span id="closePopup" style="
      position: absolute; 
      top: 10px; 
      right: 15px; 
      font-size: 22px; 
      color: gray; 
      cursor: pointer;">&times;</span>

    <h3 style="margin-bottom: 15px; margin-top:5px; font-size: 20px;">Change Location</h3>

    <div style="display: flex; justify-content: start; align-items: center; gap: 10px;">
      <button id="detectBtn" style="
        background-color: #0C831F;
        color: white;
        border: none;
        padding: 8px 14px;
        border-radius: 8px;
        cursor: pointer;">Detect my location</button>

      <span style="font-weight: bold; color: gray;">OR</span>

      <input type="text" placeholder="search delivery location" style="
        padding: 8px;
        border-radius: 8px;
        border: 1px solid #ccc;
        width: 180px;">
    </div>
  </div>
`;
popup.style.display = "none";
popup.style.position = "absolute";
document.body.appendChild(popup);

// Show popup just below location section
locationIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  const rect = locationIcon.getBoundingClientRect();

  // Position popup below location section
  popup.style.display = "block";
  popup.style.top = rect.bottom + window.scrollY + "px";
  popup.style.left = rect.left - 150 + "px";
});

// Close popup when × clicked
document.addEventListener("click", (e) => {
  const closeBtn = document.getElementById("closePopup");
  if (e.target === closeBtn) {
    popup.style.display = "none";
  }
});

// Close popup if clicked outside
document.addEventListener("click", (e) => {
  if (!popup.contains(e.target) && e.target !== locationIcon) {
    popup.style.display = "none";
  }
});


//my cart
let cart = document.querySelector(".cart");

// Create red circle (badge) for item count ----
let badge = document.createElement("span");
badge.style.position = "absolute";
badge.style.top = "-5px";
badge.style.right = "-10px";
badge.style.backgroundColor = "red";
badge.style.color = "white";
badge.style.borderRadius = "50%";
badge.style.padding = "2px 6px";
badge.style.fontSize = "12px";
badge.style.display = "none"; // hidden when no items
badge.textContent = "0";


// Add badge inside cart
cart.style.position = "relative";
cart.appendChild(badge);

// Set starting count 
let count = 0;

// Function to update badge 
function updateBadge() {
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = "inline-block";
    cart.style.opacity = "1"; // visible
    cart.style.pointerEvents = "auto"; 
  } else {
    badge.style.display = "none";
    cart.style.opacity = "0.6"; 
    cart.style.pointerEvents = "none";
  }
}

//Functions to add & remove items
function addItem() {
  count = count + 1;
  updateBadge();
  alert("1 item added to cart!");
}

function removeItem() {
  if (count > 0) {
    count = count - 1;
    updateBadge();
    alert("1 item removed from cart!");
  } else {
    alert("No items in cart!");
  }
}

//  Cart click
cart.addEventListener("click", function() {
  if (count > 0) {
    alert("You have " + count + " item(s) in your cart.");
  }
});

// Start with empty cart 
updateBadge();


//pan corder content
const shopNowBtn = document.querySelector(".banner-content button");


shopNowBtn.addEventListener("click", () => {
  // Set a flag in localStorage to indicate Pan Corner page
  localStorage.setItem("showPanCorner", "true");
  location.reload();
});

// On page load, check if flag is set
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("showPanCorner") === "true") {
    // Hide non-Pan Corner sections
    const greenBanner = document.querySelector(".green-banner");
    const imgContainer = document.querySelector(".img-container");
    const categories = document.querySelector(".categories");
    const dairyItems = document.querySelector(".dairy-item");
    const pharmacyItems= document.querySelector(".pharmacy-items");
    
    if (greenBanner) greenBanner.style.display = "none";
    if (imgContainer) imgContainer.style.display = "none";
    if (categories) categories.style.display = "none";
    if (dairyItems) dairyItems.style.display = "none";
    if (pharmacyItems) pharmacyItems.style.display = "none";

    // Show only the tabacco-item section
    const tabaccoItems = document.querySelector(".tabocco-item");
    if (tabaccoItems) {
      tabaccoItems.style.display = "block";  
      const allItems = tabaccoItems.querySelectorAll(".item-namess");
      const gridContainer = tabaccoItems.querySelector(".itemss-grid");

      if (gridContainer) {
        gridContainer.style.display = "grid";
        gridContainer.style.gridGap = "15px";                        
        gridContainer.style.padding = "10px 0";
      }

    }

    // Remove flag so next reload shows original page
    localStorage.removeItem("showPanCorner");
  }
});


//pharmacy corder content
const shopNowBtnn = document.querySelector(".pharmacy-content button");


shopNowBtnn.addEventListener("click", () => {
  // Set a flag in localStorage to indicate Pan Corner page
  localStorage.setItem("showPharmacycorner", "true");
  location.reload();
});

// On page load, check if flag is set
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("showPharmacycorner") === "true") {
    // Hide non-Pan Corner sections
    const greenBanner = document.querySelector(".green-banner");
    const imgContainer = document.querySelector(".img-container");
    const categories = document.querySelector(".categories");
    const dairyItems = document.querySelector(".dairy-item");
    const tabaccoItems= document.querySelector(".tabocco-item");
    
    if (greenBanner) greenBanner.style.display = "none";
    if (imgContainer) imgContainer.style.display = "none";
    if (categories) categories.style.display = "none";
    if (dairyItems) dairyItems.style.display = "none";
    if (tabaccoItems) tabaccoItems.style.display = "none";

    // Show only the tabacco-item section
    const pharmacyItems = document.querySelector(".pharmacy-items");
    if (pharmacyItems) {
      pharmacyItems.style.display = "block";  
      const allItems = pharmacyItems.querySelectorAll(".items-namess");
      const gridContainer = pharmacyItems.querySelector(".itemss-gridd");

      if (gridContainer) {
        gridContainer.style.display = "grid";
        gridContainer.style.gridGap = "15px";                        
        gridContainer.style.padding = "10px 0";
      }

    }

    // Remove flag so next reload shows original page
    localStorage.removeItem("showPharmacycorner");
  }
});
