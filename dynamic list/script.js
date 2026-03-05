let addBtn = document.getElementById("addTag");
let tagInput = document.getElementById("tagInput");
let tagArea = document.getElementById("tagArea");

let tags = []; // array of all tags

// ADD TAG
addBtn.addEventListener("click", function(e) {
    e.preventDefault();

    let value = tagInput.value.trim();

    if (value === "") {
        alert("Please enter a tag!");
        return;
    }

    if (tags.includes(value)) {
        alert("Tag already exists!");
        return;
    }

    tags.push(value);
    tags.sort(); // A → Z
    tagInput.value = "";
    showTags();
});

// SHOW TAGS
function showTags() {
    tagArea.innerHTML = "";

    tags.forEach((tag, index) => {
        let div = document.createElement("div");
        div.classList.add("tag");

        div.innerHTML = `
            ${tag}
               <span onclick="editTag(${index})" style="margin-left:10px; cursor:pointer;">✎</span>
            <span onclick="deleteTag(${index})">×</span> 
        `;  

        tagArea.appendChild(div);

    });
}

// DELETE TAG
function deleteTag(i) {
    tags.splice(i, 1);
    showTags();
}

// EDIT TAG
function editTag(i) {
    let newTag = prompt("Edit your tag:", tags[i]);

    if (newTag === null) return; // cancel click
    newTag = newTag.trim();

    if (newTag === "") {
        alert("Tag cannot be empty!");
        return;
    }

    if (tags.includes(newTag) && newTag !== tags[i]) {
        alert("Tag already exists!");
        return;
    }

    tags[i] = newTag;
    tags.sort();
    showTags();
}