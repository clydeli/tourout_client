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
				url: "http://cmu-tourout.appspot.com/getTours",
				type: 'GET',
				dataType: 'json',
				success: function (jsondata) {
					var tourList = [];
					 
					  //$.each(jsondata, function(key, val) {
					  for(var i=0; i<jsondata.length; ++i){					
							tourList.push('<li><a href="#" data-tour-id="' + jsondata[i].key.id + '">' + jsondata[i].propertyMap.companyName + '</a></li>');
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