//function to show add class form
function showAddForm() {
  document.getElementById("addForm").classList.remove("hidden");
  document.getElementById("classList").classList.add("hidden");
  document.getElementById("searchSection").classList.add("hidden");
}
//function to show class list
function showClassList() {
  document.getElementById("addForm").classList.add("hidden");
  document.getElementById("classList").classList.remove("hidden");
  document.getElementById("searchSection").classList.add("hidden");
  Displayclasses();
}
//function to show search section
function showSearch() {
  document.getElementById("addForm").classList.add("hidden");
  document.getElementById("classList").classList.add("hidden");
  document.getElementById("searchSection").classList.remove("hidden");
}

//get values from form
function saveClass() {
  let classname = document.getElementById("className").value;
  let teachername = document.getElementById("teacherName").value;
  let time = document.getElementById("schedule").value;
  let section = document.getElementById("batch").value;

  //ensure that all fild are required.
  if ((!classname, !teachername, !time, !section)) {
    alert("required to fill all fields.");
  }

  //get existing classses from local storage or create empty eroor
  let classes = JSON.parse(localStorage.getItem("classes") || "[]");

  //add new class object
  classes.push({
    classname: classname,
    teachername: teachername,
    time: time,
    section: section,
  });

  //save updated array into localsytorage.
  localStorage.setItem("classes", JSON.stringify(classes));

  //clear form
  document.getElementById("className").value = "";
  document.getElementById("teacherName").value = "";
  document.getElementById("schedule").value = "";
  document.getElementById("batch").value = "";
}
JSON.parse(localStorage.getItem("classes"));

//view classs
function Displayclasses(index) {
  let classlist = document.getElementById("classList");

  classlist.innerHTML = "";

  let classes = JSON.parse(localStorage.getItem("classes") || "[]");

  if (classes.length === 0) {
    classlist.innerHTML = "<p>No classes added yet.</p>";
    return;
  }

  classes.forEach((c, index) => {
    let classCard = document.createElement("div");
    classCard.className = "class-card";
    classCard.innerHTML = `
            <h3>${c.classname}</h3>
            <p>Teacher: ${c.teachername}</p>
            <p>time / section: ${c.time} / ${c.section}</p>
            <button onclick="deleteClass(${index})">Delete</button>
        `;
    classlist.appendChild(classCard);
  });
}

// Delete class
function deleteClass(index) {
  let classes = JSON.parse(localStorage.getItem("classes") || "[]");
  classes.splice(index, 1);
  localStorage.setItem("classes", JSON.stringify(classes));
  Displayclasses();
}

// search class
document.getElementById("searchbtn").addEventListener("click", searchClasses);
function searchClasses() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const classes = JSON.parse(localStorage.getItem("classes") || "[]");
  const resultsContainer = document.getElementById("searchResults");
 
  resultsContainer.innerHTML = "";

  const filtered = classes.filter(
    (cls) =>
      cls.classname.toLowerCase().includes(query) ||
      cls.teachername.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>No matching classes found.</p>";
    return;
  }

  filtered.forEach((cls) => {
    const div = document.createElement("div");
    div.classList.add("class-card");
    div.innerHTML = `
      <h3>${cls.classname}</h3>
      <p><strong>Teacher:</strong> ${cls.teachername}</p>
      <p><strong>Time / Section:</strong> ${cls.time} / ${cls.section}</p>
    `;
    resultsContainer.appendChild(div);
  });
}

