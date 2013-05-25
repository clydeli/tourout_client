var tourout = tourout || {};

tourout.findtour = (function() {
	var infoWindows = [];
	
	var register = function(locationId) {
		var tourId = $('#select' + locationId + " option:selected").val();
		$.ajax({
			url: "http://cmu-tourout.appspot.com/registerTour?key=" + tourId + "&visitor=Sean"
		});
		
		// $("#headerText").html("Registered");
		$( "#popup-received").remove();
		createPopup("Registered");
		
		infoWindows.forEach(function(infoWindow) {
			infoWindow.close();
		});
	};
	
	var createPopup = function(text){
		var closebtn = '<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-btn-right">Close</a>';
        var header = '<div data-role="header"><h2 id="headerText"> '+text+' </h2></div>';
		var popup = '<div data-role="popup" style="width: 15em;" id="popup-received" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15"> '+closebtn+header+'</div>';
		$.mobile.activePage.append( popup ).trigger( "pagecreate" );
		var fallback = setTimeout(function() {
            $( "#popup-received").popup( "open" );
        }, 600);
	};
	
	var createPopupString = function(tour) {
		var contentString = "<h3>" + tour.propertyMap.companyName + "</h3><div>";
		$.ajax({
			url: "http://cmu-tourout.appspot.com/getToursByCompany?companyName=" + tour.propertyMap.companyName,
			type: 'GET',
			dataType: 'json',
			async: false,
			success: function(data) {
				contentString += "<select id='select" + tour.key.id + "'>"
				data.forEach(function(singleTour) {
					contentString += "<option value='" + singleTour.key.id + "'>";
					contentString += singleTour.propertyMap.meetingTime + "</option>";
				});
				contentString += "</select>"
			}
		})
		contentString += "<button onclick=tourout.findtour.register(" + tour.key.id + ")>Register</button></div>";
		
		return contentString;
	};
	
	var init = function() {
		// $("#headerText").html("Loading...");
		$( "#popup-received").remove();
		createPopup("Loading...");
		
		navigator.geolocation.getCurrentPosition(
			function(position) {
				var mapOptions = {
					// center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
					center: new google.maps.LatLng(37.391661, -122.081703),
			        zoom: 8,
			        mapTypeId: google.maps.MapTypeId.ROADMAP
			    };
			    var map = new google.maps.Map(document.getElementById('findTour'), mapOptions);
			    infoWindows = [];
			    
			    google.maps.event.addListener(map, 'idle', function() {
					 $('#popup-received').popup("close");
				});
			    
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
							
							// var contentString = tour.propertyMap.companyName + "<button onclick=tourout.findtour.register(" + tour.key.id + ")>Register</button>";
							var contentString = createPopupString(tour);
							
							var infowindow = new google.maps.InfoWindow({
						    	content: contentString
						    });
							
							infoWindows.push(infowindow);
							
							google.maps.event.addListener(marker, 'click', function() {
								infowindow.open(map, marker);
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
		init : init,
		register: register
	};
	
})();