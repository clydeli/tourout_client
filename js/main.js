function updateTitle(title) {
	$("#head-title").text(title);
}

$(document).on("pageinit", "#demo-page", function() {

	$(".innerPages").hide();
	$("#tourList").show();
	
	$(document).on("swiperight", "#demo-page", function(e) {
		if ($.mobile.activePage.jqmData("panel") !== "open") {
			if (e.type === "swiperight") {
				$("#left-panel").panel("open");
			}
		}
	});

	$(document).on("click", "#left-panel li a", function(e) {
		$(".innerPages").hide();
		$("#" + $(this).data('page')).show();
		$("#left-panel").panel("close");
		updateTitle($(this).data('page'));
		switch($(this).data('page')){
			case "nfcCheckIn":
				tourout.checkin.init();
				break;
			case "tourList":
				tourout.tourlist.init();
				break;
		}
	});
	
	function bindTourDetail() {
		$("#tourList a").on("click", function() {
			$("#right-panel").panel("open");
		});
	}
	
	// Init map
	// Initialize map
    navigator.geolocation.getCurrentPosition(
		function(position) {
			var mapOptions = {
				center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
		        zoom: 8,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		    };
		    var map = new google.maps.Map(document.getElementById('findTour'), mapOptions);
			console.log('Latitude: ' + position.coords.latitude + 'Longitude: ' + position.coords.longitude);
		},
		function(error) {
			console.log('Failed to get current position');
		}
	);
	
	bindTourDetail();
});

