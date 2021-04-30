const form = document.getElementById('form-section');
const taskInput = document.getElementById('input');
const taskList = document.getElementById('task-list');
const Button = document.getElementById('clear-btn');
const filter = document.getElementById('filter-input')
LoadEventListeners()

function LoadEventListeners(){
    form.addEventListener('submit', storeItems)
    taskList.addEventListener('click', removeItems)
    Button.addEventListener('click', clearTasks)
    filter.addEventListener('keyup', filterTasks)
    document.addEventListener('DOMContentLoaded', getTasks)
}

// Add Items

function storeItems(e){
    e.preventDefault();
    if(taskInput.value === ''){
        alert('Please add a Task')
        return;
    }

        //Create Li
    const list = document.createElement('li');
    list.className = 'list-group-item';
    list.appendChild(document.createTextNode(taskInput.value))

    // Create Link
    const link = document.createElement('a')
    link.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right', 'text-white', 'delete')
    link.appendChild(document.createTextNode('X'))

    list.appendChild(link)

    //Append child to ul
    taskList.appendChild(list)

    storeTaskInLocalStorage(taskInput.value)

    taskInput.value = ''

}

function storeTaskInLocalStorage(task){
    let tasks;
    
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks));    
} 



 function getTasks(){
    let tasks;
    
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    
    tasks.forEach((task) => {
        const list = document.createElement('li');
        list.className = 'list-group-item';
        list.appendChild(document.createTextNode(task))
    
        // Create Link
        const link = document.createElement('a')
        link.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right', 'text-white', 'delete')
        link.appendChild(document.createTextNode('X'))
    
        list.appendChild(link)
    
        //Append child to ul
        taskList.appendChild(list) 
    })

 }


//Filter Tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    const lists = document.querySelectorAll(".list-group-item")
    lists.forEach((list) => {
        const content = list.firstChild.textContent
        if(content.toLowerCase().indexOf(text)!= -1){
            list.style.display = 'block'
        }else{
            list.style.display = 'none'
        }
    })
}


// Remove Items

function removeItems(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            e.target.parentElement.remove()
            removeTaskFromLocalStorage(e.target.parentElement)
        }
    }
}


function removeTaskFromLocalStorage(tasklist){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task, index) => {
        if(tasklist.textContent===task){
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}


// Clear Task

function clearTasks(){
    taskList.innerHTML = '';
    clearTaskfromLocalStorage()
}


function clearTaskfromLocalStorage(){
    localStorage.clear()
}