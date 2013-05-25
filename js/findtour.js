var tourout = tourout || {};

tourout.findtour = (function() {
	var init = function() {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				var mapOptions = {
					// center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
					center: new google.maps.LatLng(37.391661, -122.081703),
			        zoom: 8,
			        mapTypeId: google.maps.MapTypeId.ROADMAP
			    };
			    var map = new google.maps.Map(document.getElementById('findTour'), mapOptions);
			    
			    var jsoninfo = $.ajax({
					url: "http://cmu-tourout.appspot.com/getTours",
					type: 'GET',
					dataType: 'json',
					success: function (jsondata) {
						jsondata.forEach(function(tour) {
							var tourCoords = tour.propertyMap.coordinates.split(',');
							var marker = new google.maps.Marker({
								position: new google.maps.LatLng(tourCoords[0], tourCoords[1]),
							    map: map,
							    title: tour.propertyMap.companyName
							});
						})
					}
				});
			    
				console.log('Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude);
			},
			function(error) {
				console.log('Failed to get current position');
			}
		);
	};
	
	return {
		init : init
	};
	
})();