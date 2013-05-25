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
						  if(jsondata[i].propertyMap.isFinished) {
							  finishedTours.push('<li><a href="#" data-tour-id="' + jsondata[i].key.id + '">' + jsondata[i].propertyMap.companyName + '</a></li>');
						  } else {
							  pendingTours.push('<li><a href="#" data-tour-id="' + jsondata[i].key.id + '">' + jsondata[i].propertyMap.companyName + '</a></li>');
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