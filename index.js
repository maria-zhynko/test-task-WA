const readonlyCheckbox = document.querySelector("#readonlyCheckbox");

const addTagButton = document.querySelector('#add-tag-button');
const tagNameField = document.querySelector('#tag-name-field');

const saveTagListButton = document.querySelector('#save-tag-list');
const loadTagListButton = document.querySelector('#load-tag-list');

const tagField = document.querySelector('.tag-field');

let removeButtons = [];

let readonlyMode = false;

readonlyCheckbox.addEventListener('change', changeMode);
addTagButton.addEventListener('click', addTag);

saveTagListButton.addEventListener('click', saveTagList);
loadTagListButton.addEventListener('click', loadTagList);

let tagsLabels = [];

function changeMode() {
    if (readonlyCheckbox.checked) {
        readonlyMode = true;
        tagNameField.setAttribute('readonly', 'readonly');
        addTagButton.setAttribute('disabled', 'disabled');
        saveTagListButton.setAttribute('disabled', 'disabled');
        loadTagListButton.setAttribute('disabled', 'disabled');
        removeButtons.forEach(i => {
            i.setAttribute('disabled', 'disabled');
        });
        
    } else {
        readonlyMode = false;
        tagNameField.removeAttribute('readonly');
        addTagButton.removeAttribute("disabled");
        saveTagListButton.removeAttribute("disabled");
        loadTagListButton.removeAttribute("disabled");
        removeButtons.forEach(i => {
            i.removeAttribute("disabled");
        });
    }
}

function addTag() {
    if (tagNameField.value) {
        tagsLabels.push(tagNameField.value);
        addTagContent(tagNameField.value);
    }
}

function saveTagList() {
    if (tagsLabels.length) {
        if (confirm('Are you sure?')) {
            localStorage.setItem('tagList', tagsLabels);
            alert('Saved!');
        }
        
    }
    
}

function loadTagList() {
    if (confirm('Remove and load from local storage?')){
        let allTags = document.querySelectorAll('.tag');
        allTags.forEach((item, i) => {
            item.remove();

        });
        removeButtons.length = 0;
    }
    let tagListString = localStorage.getItem('tagList');
    
    tagsLabels = tagListString.split(',');
    tagsLabels.forEach(item => {
        addTagContent(item);
    });
}

function removeTag() {
    let indexOfTag = removeButtons.indexOf(this);
    tagsLabels.splice(indexOfTag, 1);
    removeButtons.splice(indexOfTag, 1);
    this.parentNode.remove();
}

function addTagContent(name) {
    let newTag = document.createElement('div');
    newTag.textContent = name;
    newTag.classList.add('tag');
    
    tagField.append(newTag);

    let removeTagButton = document.createElement('button');
    removeTagButton.textContent = '\u00D7';
    removeTagButton.className = 'remove-button';
    newTag.appendChild(removeTagButton);

    removeButtons.push(removeTagButton);
    
    removeButtons[removeButtons.length-1].addEventListener('click', removeTag);
}