var tourout = tourout || {};

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
				}
			});
		};
	return {
		init : init
	};
	
})();