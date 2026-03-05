// ---------------- SIGNUP ----------------
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.getElementById("reg-uname").value.trim();
  let email = document.getElementById("reg-email").value.trim();
  let password = document.getElementById("reg-pass").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if exists
  let exists = false;
  users.forEach(function (u) {
    if (u.username === username || u.email === email) {
      exists = true;
    }
  });

  if (exists) {
    alert("User already exists!");
    return;
  }

  users.push({ username: username, email: email, password: password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");
  document.getElementById("signup-form").reset();
});

// ---------------- LOGIN ----------------
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let uname = document.getElementById("log-uname").value.trim();
  let pass = document.getElementById("log-pass").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let found = null;

  users.forEach(function (u) {
    if (u.username === uname && u.password === pass) {
      found = u;
    }
  });

  if (!found) {
    alert("Invalid username or password!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(found));
  showDashboard();
});

// ---------------- DASHBOARD ----------------
function showDashboard() {
  document.querySelector(".main").style.display = "none";

  // Dashboard container
  let dashboard = document.createElement("div");
  dashboard.id = "dashboard";
  dashboard.style.width = "90%";
  dashboard.style.maxWidth = "800px";
  dashboard.style.margin = "40px auto";
  dashboard.style.background = "#fff";
  dashboard.style.padding = "20px";
  dashboard.style.borderRadius = "10px";
  dashboard.style.boxShadow = "0 0 20px rgba(0,0,0,0.1)";

  let logged = JSON.parse(localStorage.getItem("loggedInUser"));
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let h2 = document.createElement("h2");
  h2.innerText = "Welcome, " + logged.username;
  dashboard.appendChild(h2);

  // TABLE
  let table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  table.innerHTML = `
    <tr>
      <th>No.</th>
      <th>Username</th>
      <th>Email</th>
      <th>Password</th>
      <th>Action</th>
    </tr>
  `;

  // ---------------- ADD ROWS USING forEach ----------------
  users.forEach((u, i) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${u.username}</td>
      <td>${u.email}</td>
      <td>${u.password}</td>
      <td>
         <div class="btns">
            <button class="editBtn">E</button>
            <button class="deleteBtn">D</button>
         </div>
      </td>
    `;

    table.appendChild(row);

    let editBtn = row.querySelector(".editBtn");
    let deleteBtn = row.querySelector(".deleteBtn");

    // ---------------- PREVENT EDIT/DELETE FOR LOGGED-IN USER ----------------
    if (logged.username === u.username) {
      editBtn.disabled = true;
      deleteBtn.disabled = true;

      editBtn.style.opacity = "0.5";
      deleteBtn.style.opacity = "0.5";

      editBtn.style.cursor = "not-allowed";
      deleteBtn.style.cursor = "not-allowed";
    }

    // ------------ EDIT BUTTON (DOM Event Handling) ---------
    editBtn.addEventListener("click", function () {
      if (editBtn.disabled) return; // <-- important

      let users = JSON.parse(localStorage.getItem("users")) || [];

      let newU = prompt("New Username:", users[i].username);
      let newE = prompt("New Email:", users[i].email);
      let newP = prompt("New Password:", users[i].password);

      if (newU && newE && newP) {
        users[i] = {
          username: newU,
          email: newE,
          password: newP,
        };

        localStorage.setItem("users", JSON.stringify(users));
        alert("User updated!");
        location.reload();
      }
    });

    // ------------ DELETE BUTTON (DOM Event Handling) ---------
    deleteBtn.addEventListener("click", function () {
      if (deleteBtn.disabled) return; // <-- important

      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (confirm("Delete this user?")) {
        users.splice(i, 1);
        localStorage.setItem("users", JSON.stringify(users));
        alert("User deleted!");
        location.reload();
      }
    });
  });

  dashboard.appendChild(table);

  // ---------------- Logout Button ----------------
  let logoutBtn = document.createElement("button");
  logoutBtn.innerText = "Logout";
  logoutBtn.style.marginTop = "20px";
  logoutBtn.style.padding = "8px 18px";
  logoutBtn.style.border = "none";
  logoutBtn.style.borderRadius = "5px";
  logoutBtn.style.cursor = "pointer";
  logoutBtn.style.background = "#ff6262";
  logoutBtn.style.color = "#fff";

  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    location.reload();
  });

  dashboard.appendChild(logoutBtn);

  document.body.appendChild(dashboard);
}

// ---------------- AUTO LOGIN ----------------
if (localStorage.getItem("loggedInUser")) {
  showDashboard();
}
