var mymodule=angular.module("calendarModule", []);
mymodule.factory('updateCalendarService',function(){
	//Map Calendar Object: title->events.tashkName,start->events.eventStart
	return {
		addEventToCalendar:function(events){
		$('#calendar').fullCalendar('renderEvent',{title:events.taskName,start:events.eventStart});
	},
		deleteEventFromCalendar:function(deleteEvent){
					$('#calendar').fullCalendar('removeEvents',function(event){
						if(event.title===deleteEvent[0].taskName)
							return true;
						
					});
			}
			//$('#calendar').fullCalendar('renderEvent',allEvents);
	};
	
	
});
