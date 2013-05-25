var displayTourInfo = function(tour) {
	
	$('#tour-info-provider').text(tour['propertyMap']['provider'])
	initMap(tour['propertyMap']['coordinates'].split(',')[0], tour['propertyMap']['coordinates'].split(',')[1]);
}

var initMap = function(latitude, longitude) {

	// Initialize map
	var mapOptions = {
		center: new google.maps.LatLng(latitude, longitude),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var placeLatlng = new google.maps.LatLng(latitude, longitude);
	var map = new google.maps.Map(document.getElementById('tourinfo-map'), mapOptions);
	var marker = new google.maps.Marker({
	      position: placeLatlng,
	      map: map,
	      title: 'Company'
	  });
};

initMap();