function getCookie(name) {
  const cookies = document.cookie.split(";").map(c => c.trim());
  for (let c of cookies) {
    if (c.startsWith(name + "=")) {
      return c.substring(name.length + 1);
    }
  }
  return null;
}

// --- SHOW & HIDE SECTIONS --- //
function showAdd() {
  document.getElementById("addblogs").classList.remove("hidden");
  document.getElementById("editblogs").classList.add("hidden");
  document.getElementById("viewblogs").classList.add("hidden");
}

function showEdit() {
  document.getElementById("editblogs").classList.remove("hidden");
  document.getElementById("addblogs").classList.add("hidden");
  document.getElementById("viewblogs").classList.add("hidden");
  showAllBlogsForEdit(); // This is defined below
}

function showView() {
  document.getElementById("viewblogs").classList.remove("hidden");
  document.getElementById("addblogs").classList.add("hidden");
  document.getElementById("editblogs").classList.add("hidden");
  showAllBlogs();
}

// --- SAVE BLOG --- //
function saveBlog(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const author = document.getElementById("author").value;

  if (title === "" || content === "" || author === "") {
    alert("Please fill all fields!");
    return;
  }

  let blogs = JSON.parse(decodeURIComponent(getCookie("blogs") || "[]"));
  blogs.push({
    title: title,
    content: content,
    author: author,
  });
  document.cookie ="blogs=" + encodeURIComponent(JSON.stringify(blogs)) + ";path=/";
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("author").value = "";

  alert("Blog added successfully!");
}

// --- VIEW BLOGS --- //
function showAllBlogs() {
  const viewDiv = document.getElementById("viewblogs");
  viewDiv.innerHTML = "";

  let blogs = JSON.parse(decodeURIComponent(getCookie("blogs") || "[]"));

  if (blogs.length === 0) {
    viewDiv.innerHTML = "<p>No blogs found!</p>";
    return;
  }

  blogs.forEach((blog, index) => {
    const card = document.createElement("div");
    card.classList.add("blog-card");
    card.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>
      <small><b>Author:</b> ${blog.author}</small><br>
      <button id="deleteebtn" onclick="deleteBlog(${index})">Delete</button>
    `;
    viewDiv.appendChild(card);
  });
}

// --- DELETE BLOG --- //
function deleteBlog(index) {
  let blogs = JSON.parse(decodeURIComponent(getCookie("blogs") || "[]"));
  blogs.splice(index, 1);
  document.cookie =
    "blogs=" + encodeURIComponent(JSON.stringify(blogs)) + ";path=/";
  showAllBlogs();
}

// --- SHOW BLOGS FOR EDIT --- //
function showAllBlogsForEdit() {
  const editDiv = document.getElementById("editblogs");
  editDiv.innerHTML = "";
  let blogs = JSON.parse(decodeURIComponent(getCookie("blogs") || "[]"));

  if (blogs.length === 0) {
    editDiv.innerHTML = "<p>No blogs to edit!</p>";
    return;
  }

  blogs.forEach((blog, index) => {
    const card = document.createElement("div");
    card.classList.add("blog-card");
    card.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>
      <small><b>Author:</b> ${blog.author}</small><br>
      <button id="edittbtn" onclick="editBlog(${index})">Edit</button>
    `;
    editDiv.appendChild(card);
  });
}

// --- EDIT BLOG --- //
function editBlog(index) {
  let blogs = JSON.parse(decodeURIComponent(getCookie("blogs") || "[]"));
  let blog = blogs[index];

  const newTitle = prompt("Enter new title:", blog.title);
  const newContent = prompt("Enter new content:", blog.content);
  const newAuthor = prompt("Enter new author name:", blog.author);

  if (newTitle && newContent && newAuthor) {
    blogs[index] = {
      title: newTitle,
      content: newContent,
      author: newAuthor,
    };
    document.cookie =
      "blogs=" + encodeURIComponent(JSON.stringify(blogs)) + ";path=/";
    alert("Blog updated successfully!");
    showAllBlogsForEdit();
  }
}

