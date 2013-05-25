var tourout = tourout || {};

function bindTourDetail() {
	$("#tourList a").on("click", function() {
		var tourId = $(this).data("tour-id");
		$.ajax({
			url: "http://cmu-tourout.appspot.com/getTourDetail?id=" + tourId,
			type: 'GET',
			dataType: 'json',
			success: function(jsondata) {
				displayTourInfo(jsondata);
				$("#right-panel").panel("open");		
			}
		});
		
	});
}

tourout.tourlist = (function() {
	var
		init = function(){
			$.ajax({
				url: "http://cmu-tourout.appspot.com/myTours?visitor=Sean",
				type: 'GET',
				dataType: 'json',
				success: function (jsondata) {
					var finishedTours = [];
					var pendingTours = []; 
					 
					  for(var i=0; i<jsondata.length; ++i){
						  //var hasFood = jsondata[i].propertyMap.haveFreeLunch;
						  var tourStr = '<li><a href="#" data-tour-id="' + jsondata[i].key.id + '">' + jsondata[i].propertyMap.companyName;
						  //if(jsondata[i].propertyMap.haveFreeLunch){ tourStr += ' (Free Food)' }
						  if(jsondata[i].propertyMap.haveFreeLunch){ tourStr += '<img class="ui-li-icon" src="images/food.png" style="position: absolute; top: 3px; left: 5px; max-width:2.2em; max-height:2.2em;"> ' }
						  else{ tourStr += '<img class="ui-li-icon" src="images/blank.png" style="position: absolute; top: 3px; left: 5px; max-width:2.2em; max-height:2.2em;"> '; }
						  tourStr +=  '</a> </li>';
						  
						  if(jsondata[i].propertyMap.isFinished) {
							  finishedTours.push(tourStr);
						  } else {
							  pendingTours.push(tourStr);
						  }
					  }
					  
					  var tourList = [];
					  if(pendingTours.length > 0) {
						  tourList.push('<li data-role="list-divider" >Pending Tours</li>');
					  }
					  
					  for(var i=0; i<pendingTours.length; i++) {
						  tourList.push(pendingTours[i]);
					  }
					  
					  if(finishedTours.length > 0) {
						  tourList.push('<li data-role="list-divider" >Finished Tours</li>');
					  }
					  
					  for(var i=0; i<finishedTours.length; i++) {
						  tourList.push(finishedTours[i]);
					  }
					  
					  $('#tourListUl').html(tourList);
					  $('#tourListUl').listview('refresh');
					  bindTourDetail();
				}
			});
		};
	return {
		init : init
	};
	
})();