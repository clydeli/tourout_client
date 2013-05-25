var tourout = tourout || {};

tourout.checkin = (function() {
	var 
		tourInfo = {
			visitorName : "visitor",
			hostName : "host",
			tourId : "randomId"
		},
		
		sendVisitorInfo = function(){
			tourout.nfc.sendTextNDEF(
				[JSON.strigify(tourInfo)],
				{
					success : function(){ console.log("good sent"); },
					error : function(){ console.log("bad sent"); }
				}
			);
		},
	
		checkInTour = function(){
			$.ajax({
				url: "http://cmu-tourout.appspot.com/getTours",
				type: 'GET',
				dataType: 'json',
				success: function (jsondata) {
					console.log(jsondata);
					// do something
				}
			});
		};
		
	
	return {
		init : function(){
			tourout.nfc.init();
		},
		sendVisitorInfo : sendVisitorInfo
	};
	
})();