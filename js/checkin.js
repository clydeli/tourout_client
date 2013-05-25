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
			var popup = '<div data-role="popup" style="width: 18em;" id="popup-received" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15"> '+closebtn+header+'</div>';
			$.mobile.activePage.append( popup ).trigger( "pagecreate" );
			var fallback = setTimeout(function() {
	            $( "#popup-received").popup( "open" );
	        }, 600);
		},
		
		killPopup = function(){
	        $( "#popup-received").popup( "close" );
	        $( "#popup-received").remove();
		},
		
		sendVisitorInfo = function(){
			nfcCallbacks.onattach = function(){
				console.log("attached");
				tourout.nfc.sendTextNDEF(
					[JSON.stringify(tourInfo)],
					{
						success : function(){ 
							console.log("good sent");
							killPopup();
							nfcCallbacks.onattach = function(){ console.log("attached"); };
						},
						error : function(){ 
							console.log("bad sent");
						}
					}
				);
			};
			
			createPopup("Please check in <br> using NFC...");
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
				createPopup("Validating <br> Visitor...");
				console.log("received");
				console.log(message.records[0].text);
				var msg = JSON.parse(message.records[0].text);
				killPopup();
			}	
		};
		
	
	return {
		init : function(){
			tourout.nfc.init(nfcCallbacks);
			//sendVisitorInfo();
		},
		sendVisitorInfo : sendVisitorInfo
	};
	
})();