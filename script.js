//Defining UI costants
const form = document.querySelector('.todo-form');
const taskList = document.querySelector('.todos');
const addTask = document.querySelector('.button');
const inputTask = document.querySelector('.input-item');
const filterOption =  document.querySelector('.filter-todo');
const totalTasks = document.querySelector(".total-tasks");
const completedTasks = document.querySelector(".completed-tasks span");
const remainingTasks = document.querySelector(".remaining-tasks span");

// Add event listener to each 
document.addEventListener('DOMContentLoaded', getTodos); 
addTask.addEventListener('click', addTodo);
taskList.addEventListener('click', checkTodos);
filterOption.addEventListener('click', filterTodo);

//functions
//Add task
 function addTodo(event){
    //To prevent form from submitting
        event.preventDefault();
    //Include div from clicking add button
    const listDiv = document.createElement('div');
    listDiv.classList.add('todo');
    //include Li to the ul
    const newTodo = document.createElement('li');
    newTodo.innerText = inputTask.value;
    newTodo.classList.add('todo-list');
    listDiv.appendChild(newTodo);
    //to add Todo to LocalStorage
    saveLocalTodos(inputTask.value);
    //Make a check mark button
    const completedButton = document.createElement('btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    listDiv.appendChild(completedButton);
    //Make a trash button
    const trashButton = document.createElement('btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    listDiv.appendChild(trashButton);
    //Append To List
    taskList.appendChild(listDiv);
    //Make Trash button
    inputTask.value = "";

}
//
function checkTodos(e){
    const item = e.target;
    //Delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
         removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
        todo.remove();
        });
}
    //check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
         todo.classList.toggle("completed");
    } 
}

    //Filter todo
    function filterTodo(e) {
        const todos = taskList.childNodes;
        todos.forEach(function(todo){
          switch(e.target.value)  {
              case "all":
                  todo.style.display = "flex";
              break;
              case "completed":
               if(todo.classList.contains("completed")) {
                   todo.style.display = "flex";
               } else {
                   todo.style.display = "none";
               }
               break;
               case "uncompleted":
               if(!todo.classList.contains("completed")) {
                   todo.style.display = "flex";
               } else {
                   todo.style.display = "none";
               }
   
               break; 
          }
        });
    }


  //set up local storage
  //Storage
  function saveLocalTodos(todo){
      //to check if i already have a thing in there?
     let todos;
     if(localStorage.getItem("todos") === null) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem("todos"));

     }
     todos.push(todo);
     localStorage.setItem("todos", JSON.stringify(todos));
     
 }
  
function getTodos(){
     //to check if i already have a thing in there?
     let todos;
     if(localStorage.getItem("todos") === null) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem("todos"));
      }   
} 
todos.forEach(function(todo){
    //Todo Div
const listDiv = document.createElement("div");
listDiv.classList.add("todo");
//Create Li
const newTodo = document.createElement('li');
newTodo.innerText = todo;
newTodo.classList.add('todo-item');
listDiv.appendChild(newTodo); 
//Make a check mark button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add('complete-btn');
listDiv.appendChild(completedButton);
//Make a trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add('trash-btn');
listDiv.appendChild(trashButton);
//Append To List
taskList.appendChild(listDiv);
  });

  function removeLocalTodos(todo){
    //Check if there is something in there?
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
     }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem("todos", JSON.stringify(todos));
}

//To create a counter

 
function countTasks() {

  totalTasks.textContent = todos.length;
  const completedTasksArray = todos.filter((todo) => todo.isCompleted === true);
  completedTasks.textContent = completedTasksArray.length;
  remainingTasks.textContent = todos.length - completedTasksArray.length;
}
