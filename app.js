let searchText=document.getElementById('mySearch');

function searchTask() {
    var filter, ul, li, p, i;
    filter = searchText.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      p = li[i].getElementsByTagName("p")[0];
      if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  function removeSearchText(){
    searchText.value="";
    showTasks();
  }

  let addToDoButton=document.getElementById('addToDo');
  let toDoList=document.getElementById('myMenu');
  let taskField = document.getElementById('taskField');
  let assigneeField =document.getElementById('assigneeField');
  let todoNum = document.getElementById("todoCount");
  let doneNum = document.getElementById('doneItemCount');
  let doneCount=0;
  let todoCount=0;
  showTasks();

  addToDoButton.onclick = ()=>{ 
    let taskInput = taskField.value; 
    let assigneeInput=assigneeField.value;
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){ 
      list = [];
    }else{
      list = JSON.parse(getLocalStorageData);
    }
    if(taskInput !=='' && assigneeInput !==''){
      list.push({'task':taskInput,'assignee':assigneeInput,'checked':false});
    localStorage.setItem("New Todo", JSON.stringify(list));
    } 
    showTasks(); 
   
  }
  function showTasks(){
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){
        list = [];
    }else{
        list = JSON.parse(getLocalStorageData); 
        
    }
    
    todoCount=list.filter(({checked})=>checked==false).length; 
    doneCount=list.filter(({checked})=>checked==true).length; 
    todoNum.innerHTML=todoCount;
    doneNum.innerHTML=doneCount;
    let newItem = "";
    list.forEach((element, index) => {
     if(element['checked']){
      newItem += `<li><p contenteditable="true"><span>Text: </span>${element['task']}</p>
      <p contenteditable="true"><span>Assignee: </span>${element['assignee']}</p>
      <i class="fas fa-trash deleteBtn" onclick="openDeleteBox()"></i>
      <i class="far fa-edit editBtn" onclick="editItem(${index})"></i>
      <i class="far fa-check-circle checkedBtn check" onclick="checkItem(${index})"></i>
      </li>
      <div class="confirmDeleteBox" id="confirmDeleteBox">
      <p>Are You Sure Delete This Task?</p>
      <button onclick="deleteItem(${index})">Delete</button>
      <button onclick="closeDeleteBox()">Cancel</button>
      </div>
      `;
     }
     else{
      newItem += `<li><p contenteditable="true"><span>Text: </span>${element['task']}</p>
      <p contenteditable="true"><span>Assignee: </span>${element['assignee']}</p>
      <i class="fas fa-trash deleteBtn" onclick="openDeleteBox()"></i>
      <i class="far fa-edit editBtn" onclick="editItem(${index})"></i>
      <i class="far fa-circle checkedBtn uncheck" onclick="checkItem(${index})"></i>
      </li>
      <div class="confirmDeleteBox" id="confirmDeleteBox">
      <p>Are You Sure Delete This Task?</p>
      <button onclick="deleteItem(${index})">Delete</button>
      <button onclick="closeDeleteBox()">Cancel</button>
      </div>
      `;
     }
    });
    toDoList.innerHTML = newItem; 
    taskField.value = "";
    assigneeField.value = "";
  }

  function openDeleteBox(){
    var deleteModal=document.getElementById('confirmDeleteBox');
    deleteModal.style.display="block";
  }
  function closeDeleteBox(){
    var deleteModal=document.getElementById('confirmDeleteBox');
    deleteModal.style.display="none";
  }

  function deleteItem(index){
      let getLocalStorageData = localStorage.getItem("New Todo");
      list = JSON.parse(getLocalStorageData);
      list.splice(index, 1);
      localStorage.setItem("New Todo", JSON.stringify(list));
      showTasks();
  }

  function checkItem(index){
    let getLocalStorageData = localStorage.getItem("New Todo");
    list = JSON.parse(getLocalStorageData);
    list[index]['checked']=!list[index]['checked'];
    localStorage.setItem("New Todo", JSON.stringify(list));
    showTasks();
  }

  function editItem(index){
    let getLocalStorageData = localStorage.getItem("New Todo");
    list = JSON.parse(getLocalStorageData);
    var newTaskData = document.getElementsByTagName("P").item(index).childNodes[1].nodeValue;
    var newAssigneeData = document.getElementsByTagName("P").item(index+1).childNodes[1].nodeValue;
    list[index]['task']=newTaskData;
    list[index]['assignee']=newAssigneeData;
    localStorage.setItem("New Todo", JSON.stringify(list));
    showTasks();
  }
