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
				[JSON.stringify(tourInfo)],
				{
					success : function(){ console.log("good sent"); },
					error : function(){ console.log("bad sent"); }
				}
			);
			var popup = '<div data-role="popup" id="popup-received" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15"> Checking... </div>';
			$.mobile.activePage.append( popup ).trigger( "pagecreate" );
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
		},
		
		nfcCallbacks = {
			onattach : function(){ 
				console.log("attached");
			},
			onreceive : function(message){ 
				console.log("received");
				console.log(message.records[0].text);
				var msg = JSON.parse(message.records[0].text);
				
			}	
		};
		
	
	return {
		init : function(){
			tourout.nfc.init(nfcCallbacks);
			sendVisitorInfo();
		},
		sendVisitorInfo : sendVisitorInfo
	};
	
})();