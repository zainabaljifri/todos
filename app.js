
let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(task => {
    addRow(task.done,task.id, task.title, task.priority, task.date);

  });
}

function updateLocalStorage(arr) {
  localStorage.setItem("tasks", JSON.stringify(arr));
}


// read item from user then add item to list
function readtask() {
  let newItem = document.getElementById('newlistitem').value;
  if (newItem != "") {
    if( $(".dropdown-toggle").val() != ""){
    let itemPriority = $(".dropdown-toggle").text();
    let itemDate = (new Date()).toString().split(' ').splice(1, 3).join(' ');
    let itemId = Date.now();
    // add to list
    addItem(newItem, itemPriority, itemDate, itemId);
    }else{
      alert("Please select priority");
    }
  }  else{
    alert("Please enter task");
  }
}

function addItem(task, priority, date, id) {
  let item = {
    id: id,
    done: false,
    title: task,
    priority: priority,
    date: date,
  };
  // add task to the list
  tasks.push(item);
  // add item to local storage
  updateLocalStorage(tasks);
  // add to page
  addRow(item.done,id, task, priority, date);
}


function addRow(status,itemId, newItem, itemPriority, itemDate) {
  // view item
  var table = document.getElementById("listforitems");
  // add new row
  var row = table.insertRow();
  // add new cell (checkbox)
  var cell = row.insertCell();
  var checkbox = document.createElement("INPUT");
  checkbox.classList.add('form-check-input','c9');
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "check"+itemId);
  checkbox.setAttribute("onclick", "StrikeOut("+itemId+")");
  cell.appendChild(checkbox);

  // add new cell (title)
  cell = row.insertCell();
  var title = document.createElement("INPUT");
  title.setAttribute("id", itemId);
  title.setAttribute("class", "taskTitle");
  // title.setAttribute("readonly", "readonly");
  title.setAttribute("disabled", "disabled");
  title.setAttribute("type", "text");
  title.setAttribute("value", newItem);
  // cell.innerHTML = newItem;
  if(status){
    checkbox.setAttribute("checked", "checked");
    title.style.textDecoration = 'line-through';
    title.style.color = "lightgray";
  }else{
    checkbox.removeAttribute("checked");
    title.style.textDecoration = 'none';
    title.style.color = "white";
  }
  cell.appendChild(title);


  // add new cell (priority)
  cell = row.insertCell();
  var priority = document.createElement("h6");
  priority.innerHTML = itemPriority;
  if (itemPriority === "High Priority") {
    priority.className = "badge bg-danger";
  } else if (itemPriority === "Middle Priority") {
    priority.className = "badge bg-warning";
    $(".dropdown-toggle").css('background', '#FFC107');
  } else if (itemPriority=== "Low Priority") {
    priority.className = "badge bg-success";
  }
  
  cell.appendChild(priority);

  // add new cell (icons)
  cell = row.insertCell();
  var action = document.createElement("i");
  // action.className = "icon fa-sharp fa-solid fa-pencil";
  $(action).toggleClass('icon fa-sharp fa-solid fa-pencil');
  // action.classList.toggle('icon','fa-sharp','fa-solid','fa-pencil');
  // action.setAttribute('onclick', 'editItem(' + itemId + ')');
  action.addEventListener('click',function(){
    editItem(itemId);
  });
  action.setAttribute('id', 'edit' + itemId);
  cell.appendChild(action);
  action = document.createElement("i");
  action.className = "icon fas fa-trash-alt fa-lg";
  action.setAttribute('onclick', 'removeItem(' + itemId + ')');
  action.setAttribute('id', 'remove' + itemId);
  cell.appendChild(action);

  // add new cell (date)
  cell = row.insertCell();
  var date = document.createElement("p");
  date.innerHTML = itemDate;
  cell.appendChild(date);

  // reset inputs
  document.getElementById('newlistitem').value = '';
  $(".dropdown-toggle").css('color', 'black');
  $(".dropdown-toggle").css('background', '#F8F9FA');
  $(".dropdown-toggle").text('Select Priority');
  $(".dropdown-toggle").val('');
  $("#newlistitem").focus();

}

// remove item
function removeItem(itemId) {
  let item = $("#" + itemId);
  let row = item.parent().parent();
  // remove from page
  row.remove();
  //remove from array
  console.log(itemId);
  let updatedTasks = tasks.filter((obj) => obj.id !== itemId);
  tasks = updatedTasks;
  updateLocalStorage(tasks);
}

// edit item

function editItem(itemId) {
  $("#"+itemId).removeAttr('disabled');
  document.getElementById(itemId).focus();
  $('.fa-pencil').on('click',function(){
    $("#"+itemId).removeAttr('disabled');
    document.getElementById(itemId).focus();
  });
  $("#edit"+itemId).toggleClass('icon fa-sharp fa-solid fa-pencil');

  $('.fa-check').on('click',function(){
    let editedTask = document.getElementById(itemId).value;
    tasks.forEach((element, index) => {
      if(element.id === itemId) {
        tasks[index].title = editedTask;
        if(editedTask==""){
          removeItem(itemId);       
        }
      }
  });
  updateLocalStorage(tasks);
    $("#"+itemId).attr('disabled', 'disabled');
  });
  
  $("#edit"+itemId).toggleClass('icon fa-solid fa-check');
}

// $(document).ready(function() {
//   $(".taskTitle").keyup(function(event) {
//       if (event.which === 13) {
//         console.log($(this).attr('id'));
//           editItem($(this).attr('id'));
//       }
//   });

// });

// strike through when checked

function StrikeOut(ItemId){
  var textTask=document.getElementById(ItemId);
  var checkBox=document.getElementById("check"+ItemId);
  let status ="";
  if(checkBox.checked==true){
    textTask.style.textDecoration = 'line-through';
    textTask.style.color = "lightgray";
    status=true;
  }else{
    textTask.style.textDecoration = 'none';
    textTask.style.color = "white";
    status=false;
  }
  tasks.forEach((element, index) => {
    if(element.id === ItemId) {
      tasks[index].done = status;
    }

});

  updateLocalStorage(tasks);
}

$('.dropdown-item').on('click', function () {
  var btnObj = $(this).parent().siblings('button');
  $(btnObj).text($(this).text());
  $(btnObj).val($(this).attr('at'));
  $(".dropdown-toggle").css('color', 'white');
  if ($(this).text() === "High Priority") {
    $(".dropdown-toggle").css('background', '#DC3545');
  } else if ($(this).text() === "Middle Priority") {
    $(".dropdown-toggle").css('background', '#FFC107');
  } else if ($(this).text() === "Low Priority") {
    $(".dropdown-toggle").css('background', '#198754');
  }
});
