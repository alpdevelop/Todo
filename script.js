const form = document.querySelector("#toDoForm");
const addInput = document.querySelector("#toDo");
const toDoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInut = document.querySelector("#toDoSearch")
let todos = [];

runEvents()

function runEvents(){
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", loadedpage) //addUI added from Stroage updated values
    secCardBody.addEventListener("click", removeTodoItem)
    clearButton.addEventListener("click", evertThingsDisappears)
    filterInut.addEventListener("keyup", filter)
}

function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText == null || inputText==""){
    showAlert("warning" , " Lütfen Boş Bırakmayınız")
    }else{
        addTodoUI(inputText); //UI add
        addTodoStorage(inputText); //Storage add
        showAlert("success" , "Todo Eklendi")
    }  
    e.preventDefault()
}

function addTodoUI(todo){
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between mt-1"
    li.textContent = todo;
    const a = document.createElement("a");
    a.href = "#"
    a.className = "delete-item"

    const i = document.createElement("i");
    i.className = "fa fa-remove"
    
    a.appendChild(i);
    li.appendChild(a);
    toDoList.appendChild(li);

    addInput.value = ""
}

function filter (e){
    const filterValeu = e.target.value.toLowerCase().trim();
    const toDoListe = document.querySelectorAll(".list-group-item")

    if(toDoListe.length > 0) {
        toDoListe.forEach((todo)=>{
            if(todo.textContent.toLowerCase().trim().includes(filterValeu) ){ //* nice filter  */
                todo.setAttribute("style" , "display: block")
            }else{
                todo.setAttribute("style", "display: none !important")
            }
        })
    }else{
        showAlert("warning" , "Arama yapmak için en az 1 adet Todo olmalıdır. ")
    }
}

function addTodoStorage(todo){
    checkFromStorage(); // take all current array
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos)); //updated value returns array
}
function evertThingsDisappears(){
    const toDoList = document.querySelectorAll(".list-group-item")
    if(toDoList.length > 0 ){
        alert("Tüm ToDo listesi silenecek")
        toDoList.forEach((todo)=>{
            todo.remove();
        })
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Başarılı bir şekilde silindi")
    }else{
        showAlert("warning" , "Silmek için lütfen en az 1 tane todo oluşturunuz")
    }

}

function removeTodoItem(e){
    if(e.target.className === "fa fa-remove"){
        const todoElement = e.target.parentElement.parentElement
        todoElement.remove(); //remove to screen
        //remove from storage
        removeStorage(todoElement.textContent) // target 
        showAlert("success" , "Başarılıyla Silindi")
    }
}
function removeStorage(removeTodo){
    checkFromStorage();
    todos.forEach((todo,index)=>{
        if(removeTodo === todo){
            todos.splice(index,1) // only itself deleter
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}


function loadedpage(){
    checkFromStorage();
    todos.forEach((todo)=>{
        addTodoUI(todo);
    })
}


function checkFromStorage(){ //Control storage values
    localStorage.getItem("todos");
    if(localStorage.getItem("todos") === null ){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
}

function showAlert(type , message){ // alert box method
    const div = document.createElement("div");
    div.className = `alert alert-${type} mt-2`;
    div.textContent = message;
    firstCardBody.appendChild(div);

    setTimeout (()=>{ // remove div
        div.remove();
    },1000)
}