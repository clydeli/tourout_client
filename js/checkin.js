var tourout = tourout || {};

tourout.checkin = (function() {
	var 
		tourInfo = {
			visitorName : "visitor",
			hostName : "host",
			tourId : "randomId"
		},
		
		createPopup = function(text){
			var closebtn = '<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-btn-right">Close</a>';
	        var header = '<div data-role="header"><h2> '+text+' </h2></div>';
			var popup = '<div data-role="popup" style="width: 15em;" id="popup-received" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15"> '+closebtn+header+'</div>';
			$.mobile.activePage.append( popup ).trigger( "pagecreate" );
			var fallback = setTimeout(function() {
	            $( "#popup-received").popup( "open" );
	        }, 600);
		},
		
		sendVisitorInfo = function(){
			tourout.nfc.sendTextNDEF(
				[JSON.stringify(tourInfo)],
				{
					success : function(){ console.log("good sent"); },
					error : function(){ console.log("bad sent"); }
				}
			);
			createPopup("Checking In...");
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
				createPopup("Validating <br> Visitor...");
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