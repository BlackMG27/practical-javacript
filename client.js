var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
   // Get number of completed todos.
     for (var i = 0; i < totalTodos; i++) {
       if (this.todos[i].completed === true) {
        completedTodos++;
        }
     }
    
    this.todos.forEach(function(todo){
        //Case 1: If everything’s true, make everything false.
      if(completedTodos === totalTodos){
        todo.completed = false;
        //case 2: Otherwise, make everything true. 
      }else{
        todo.completed = true;
      }
    });
  }
};

//Refractored code => made it simpler to understand
//gives the HTML more of a description

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

//gets the addTodos to show up on webpage
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
       } else {
         todoTextWithCompletion = '( ) ' + todo.todoText;
       }
      //creates an id based on the second forEach argument, position
       todoLi.id = position;
      //updates the todo if it's done
       todoLi.textContent = todoTextWithCompletion;
       //adds delete button to each todo
       todoLi.appendChild(this.createDeleteButton());
       todosUl.appendChild(todoLi);
      //this refers to the view object
    }, this);
    
  },

  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
    
  }, 
  
//   createToggleButton: function(){
//     var toggleButton = document.createElement('button');
//     toggleButton.textContent = ;
//   },
  
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event){
  
    //get the element that was clicked on
    var elementClicked = event.target;
      //checks to see if the deleteButton was clicked
      if(elementClicked.className === 'deleteButton'){
        //activates the deleteTodo function for the paticular button
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

//call the function to make the delete function work
view.setUpEventListeners();










