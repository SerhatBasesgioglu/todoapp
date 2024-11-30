const inputField = document.getElementById("input-area")
const submitButton = document.getElementById("submit-btn")
const todoList = document.getElementById("todo-list")
const todoForm = document.getElementById("todo-form")

const getAllTasks = async() => {
    try{
        const response = await fetch("http://localhost:3000", {method: "GET"}) 
        if(!response.ok){
            throw new error("Failed to fetch data!")
        }   
        const data = await response.json()
        data.forEach(row => {
            renderTask(row.id, row.title, row.content, row.status)
        })
    } catch(error){
        console.error("Error fetching data: ", error)
    }

   
}

const addTask = async (title, content, status) => {
        const data = {title, content, status}
        const jsonData = JSON.stringify(data)
    try{
        const response = await fetch("http://localhost:3000",
             {method:"POST", headers:{"Content-Type":"application/json"}, body: jsonData})
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const {id, title, content, status} = await response.json()
        renderTask(id, title, content, status)
    } catch(error){
        console.error("Error: ", error)
    }
}

const deleteTask = async (id, todoItem) => {
    try{
        const response = await fetch(`http://localhost:3000/${id}`, {method: "DELETE"})
        if(!response.ok){
            throw new Error("Failed to delete the task")
        }
        todoList.removeChild(todoItem)
    } catch(error){
        console.error("Error deleting task: ", error)
    }
}

const renderTask = (id, title, content, status) =>{
    const todoItem = document.createElement("div")
    todoItem.classList.add("todo-item")
    todoItem.setAttribute("data-id", id)

    const todoTitle = document.createElement("h3")
    todoTitle.textContent = title
    todoTitle.classList.add("todo-title")
    
    const todoContent = document.createElement("p")
    todoContent.textContent = content

    const todoStatus = document.createElement("p")
    todoStatus.textContent = status

    const editButton = document.createElement("button")
    editButton.textContent = "Edit"
    editButton.classList.add("btn-edit")
    editButton.onclick = () => editTask(id, todoItem)

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "delete"
    deleteButton.classList.add("btn-delete")
    deleteButton.onclick = () => deleteTask(id, todoItem)

    todoItem.appendChild(todoTitle)
    todoItem.appendChild(todoContent)
    todoItem.appendChild(todoStatus)
    todoItem.appendChild(editButton)
    todoItem.appendChild(deleteButton)
    todoList.appendChild(todoItem)

}

todoForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    const title = document.getElementById("todo-title").value
    const content = document.getElementById("todo-content").value
    const status = document.getElementById("todo-status").value
    addTask(title, content, status)
})

getAllTasks()
