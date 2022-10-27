//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


var taskInput = document.getElementById("new-task");//Add a new task.
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder = document.querySelector(".app-container__incomplete");//ul of #incompleteTasks
var completedTasksHolder = document.querySelector(".app-container__completed-tasks");//completed-tasks


var createNewTaskElement = function (taskString) {

    var listItem = document.createElement("li");

    var checkBox = document.createElement("input");//checkbx
    var label = document.createElement("label");//label
    var editInput = document.createElement("input");//text
    var editButton = document.createElement("button");//edit button

    var deleteButton = document.createElement("button");//delete button
    var deleteButtonImg = document.createElement("img");//delete button image

    label.innerText = taskString;
    label.className = 'task';

    checkBox.type = "checkbox";
    editInput.type = "text";
    editInput.className = "task";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "edit";

    deleteButton.className = "delete";
    deleteButtonImg.src = './remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}


var addTask = function () {
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}

var taskCompleted = function () {
    console.log("Complete Task...");

    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function () {
    console.log("Incomplete Task...");

    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}


var ajaxRequest = function () {
    console.log("AJAX Request");
}



addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");


    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}


for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.