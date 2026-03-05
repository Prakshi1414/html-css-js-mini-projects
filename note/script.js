const firebaseConfig = {
  apiKey: "AIzaSyAS9mAM9f4Sa-VSaNLPEfujuI-7ftf5pUI",
  authDomain: "note-app-cc784.firebaseapp.com",
  databaseURL: "https://note-app-cc784-default-rtdb.firebaseio.com/",
  projectId: "note-app-cc784",
  storageBucket: "note-app-cc784.firebasestorage.app",
  messagingSenderId: "145791945641",
  appId: "1:145791945641:web:233d6455f8381855a952b8",
  measurementId: "G-5SL72BYFZ1",
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let notescontainer = document.querySelector(".notes-container");
let createbtn = document.querySelector(".btn");

let notes = document.querySelectorAll(".input-box");

createbtn.addEventListener("click", () => {
  let inputbox = document.createElement("p");
  let img = document.createElement("img");
  inputbox.className = "input-box";
  inputbox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  inputbox.appendChild(img);
  notescontainer.appendChild(inputbox);

  inputbox.addEventListener("blur", () => {
    const noteText = inputbox.innerText.replace("", "").trim();
    if (noteText !== "") {
      const newNoteRef = database.ref("notes").push();
      newNoteRef.set({
        content: noteText,

      });
    }
  });
});

notescontainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
  }
});
