const readonlyCheckbox = document.querySelector("#tag-container__readonly-checkbox");

const addTagButton = document.querySelector('#tag-container__add-tag-button');
const tagNameField = document.querySelector('#tag-container__tag-name-field');

const saveTagListButton = document.querySelector('#tag-container__save-tag-list');
const loadTagListButton = document.querySelector('#tag-container__load-tag-list');

const tagField = document.querySelector('.tag-container__tag-field');

let removeButtons = [];

let readonlyMode = false;

readonlyCheckbox.addEventListener('change', changeMode);
addTagButton.addEventListener('click', addTag);

saveTagListButton.addEventListener('click', saveTagList);
loadTagListButton.addEventListener('click', loadTagList);

tagField.addEventListener('click', removeTag);

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
            localStorage.setItem('tagList', tagsLabels.join(','));
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

function removeTag(event) {
    let indexOfTag = removeButtons.indexOf(event.target);
    tagsLabels.splice(indexOfTag, 1);
    removeButtons.splice(indexOfTag, 1);
    if(event.target !== tagField)
        event.target.parentNode.remove();
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
    
}