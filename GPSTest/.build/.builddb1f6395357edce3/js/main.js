//Initialize function
var init = function () {
    $('div[data-role="page"]:first .ui-btn-back').bind("click", function(event) {
        var currentApp = tizen.application.getCurrentApplication();
        currentApp.exit();
    });
    // TODO:: Do your initialization job
    console.log("init() called");
    
    // Initialize map
    navigator.geolocation.getCurrentPosition(
		function(position) {
			console.log(google.maps);
			console.log(google.maps.LatLng);
			var mapOptions = {
				center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
		        zoom: 8,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		    };
		    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
			console.log('Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude);
		},
		function(error) {
			console.log('Failed to get current position');
		}
	);
};	

$(document).bind('pageinit', init);