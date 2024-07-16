let input = document.querySelector(".input");
let submit = document.querySelector(".add ");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];
if(localStorage.getItem("tasks"))
{
	arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// click on delete 

getDataFromLocalStorage();

submit.onclick = function ( )
{
	if (input.value !== "")
	{
		
   addTaskToArray(input.value);
     input.value = "";
	}
};
tasksDiv.addEventListener("click" , (e) =>{
	//delete button 
	if (e.target.classList.contains("del")){
		//remove task from local storage
		deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
		//remove element from page
		e.target.parentElement.remove();
		
	}
	if(e.target.classList.contains("task"))
	{
		toggleStatusTaskWith(e.target.getAttribute("data-id"))
		e.target.classList.toggle("done");
	}
});
function addTaskToArray(taskText)
{
 const task = {
	id: Date.now(),
	title: taskText,
	completed: false,
 };
 
 arrayOfTasks.push(task);
 //add tasks to page
 addElementsTopagefrom(arrayOfTasks);
 ///addDataToLocalSroragefrom(arrayOfTasks);
 addDataToLocalStoragefrom(arrayOfTasks);

}
function addElementsTopagefrom(arrayOfTasks)
{
	//empty tasks div
	tasksDiv.innerHTML = "";
	//looping on array of tasks
	arrayOfTasks.forEach((task) => {
		//creat main div
		let div = document.createElement("div");
		div.className = "task";
		if (task.completed) {
			div.className = "task done";
		}
		div.setAttribute("data-id", task.id);
		div.appendChild(document.createTextNode(task.title));
		//creat delete button
		let span = document.createElement("span");
		span.className = 'del';
		span.appendChild(document.createTextNode("Delete"));
		// append Button to main div
		div.appendChild(span);
		// add task div 
		tasksDiv.appendChild(div);
	});
}
function addDataToLocalStoragefrom(arrayOfTasks)
{
window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage()
{
	let data = window.localStorage.getItem("tasks");
	if(data)
	{
		let tasks =JSON.parse(data);
		addElementsTopagefrom(tasks);
	}
}
function deleteTaskWith(taskId)
{
//for (let i = 0 ; i < arrayOfTasks.length;i++ )
arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
addDataToLocalStoragefrom(arrayOfTasks);
}
function toggleStatusTaskWith(taskId)
{
for(let i = 0 ; i < arrayOfTasks.length;i++ )
{
	if(arrayOfTasks[i].id == taskId)
	{
		arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true):(arrayOfTasks[i].completed = false);
	}
}
addDataToLocalStoragefrom(arrayOfTasks)
}