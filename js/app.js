"use strict";

var App = angular.module("todo", ["ui.sortable", "LocalStorageModule",'calendarModule']);

App.controller("TodoCtrl", function ($scope, localStorageService,updateCalendarService) {

	$scope.init = function () {

		if (!localStorageService.get("todoList")) {
			$scope.todoList = [
				{
					name: "Your Task", list: [
						{ taskName: "event1", isDone: false, eventStart:"2015-03-01", eventEnd:"",eventCompleted:"" },
						{ taskName: "event2", isDone: true, eventStart:"2015-03-05", eventEnd:"2015-03-07",eventCompleted:"" },
						{ taskName: "event3", isDone: true, eventStart:"2015-03-09T12:30:00", eventEnd:"",eventCompleted:"" }
					]
				}
			];
		}else{
			$scope.todoList = localStorageService.get("todoList");
		}
		$scope.show = "All";
		$scope.currentShow = 0;
		$scope.completed=0;
		$scope.remaning=0;
		count();
	};

	$scope.addTodo = function  () {
		/*Should prepend to array*/
		//var allEvents = $('#calendar').fullCalendar('clientEvents',function(event){
			
			//if(event.title===$scope.newTodo)
			//	return true;
		//});
		//console.log(allEvents[0].title);
		//var eventStart=allEvents[0].start;
		//var eventEn[d=allEvents[0].end;
		//var eventCompleted="";
		
		if(datedata==null||datedata==="")
			datedata=(new Date()).toDateString();
		var eventobj={taskName: $scope.newTodo, isDone: false,eventStart:datedata,eventEnd:'', eventCompleted:'' };
		$scope.todoList[$scope.currentShow].list.splice(0, 0, eventobj);
		
		/*Reset the Field*/
		$scope.newTodo = "";
		console.log("todo called");
		//Update Full calendar
		//$('#calendar').fullCalendar('renderEvent',{title:eventobj.taskName,start:eventobj.eventStart});
		updateCalendarService.addEventToCalendar(eventobj); 

		
	};
	
	$scope.deleteTodo = function  (index) {
		var deletedItem=$scope.todoList[$scope.currentShow].list.splice(index, 1);
		count();
		updateCalendarService.deleteEventFromCalendar(deletedItem);
		
	};

	function count(){
		var listTotal=$scope.todoList[$scope.currentShow].list;
		$scope.completed=0;
		$scope.remaning=0;
		console.log($scope.todoList[$scope.currentShow].list);
		var i=0;
		var mylength=listTotal.length;
		for(;i<mylength;i++)
		{
			if(listTotal[i].isDone){
				$scope.completed+=1;
			}
			else{
				
				$scope.remaning+=1;
			}
		}
		
	}
	//count();
	
	$scope.todoSortable = {
		containment: "parent",//Dont let the user drag outside the parent
		cursor: "move",//Change the cursor icon on drag
		tolerance: "pointer"//Read http://api.jqueryui.com/sortable/#option-tolerance
	};

	$scope.changeTodo = function  (i) {
		$scope.currentShow = i;
	};

	/* Filter Function for All | Incomplete | Complete */
	$scope.showFn = function  (todo) {
		if ($scope.show === "All") {
			return true;
		}else if(todo.isDone && $scope.show === "Complete"){
			return true;
		}else if(!todo.isDone && $scope.show === "Incomplete"){
			return true;
		}else{
			return false;
		}
	};

	$scope.$watch("todoList",function  (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.add("todoList",angular.toJson(newVal));
			count();
			
		}
	},true);
	
	

});