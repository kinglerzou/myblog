angular.module('todoApp',[])
       .controller('TodoListController',function(){
	     var todoList=this;
		 todoList.todocs=[{text:'learn angular',done:true},{text:'build an angular app',done:true}];
		 todoList.addTodo=function(){
		     todoList.todocs.push({text:todoList.todoText,done:false});
			 todoList.todoText='';
		 };
		 todoList.remaining=function(){
		    var count=0;
			angular.forEach(todoList.todocs,function(todo){
			   count+=todo.done?0:1;
			});
			return count;
		 };
		 todoList.archive=function(){
		   var oldTodocs=todoList.todocs;
		   todoList.todocs=[];
		   angular.forEach(oldTodocs,function(todo){
		      if(!todo.done) todoList.todocs.push(todo);
		   });
		 
		 };
	   });