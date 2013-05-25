var tourout = tourout || {};

tourout.checkin = (function() {
	var 
		tourInfo = {
			visitorName : "visitor",
			hostName : "host",
			tourId : "randomId"
		},
		
		createPopup = function(text){
			killPopup();
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
					[tourInfo.visitorName, tourInfo.hostName, tourInfo.tourId],
					{
						success : function(){ 
							console.log("good sent");
							killPopup();
							createPopup("You've checked in <br> with David Liu <br> (650) 123-4567");
							nfcCallbacks.onattach = function(){ console.log("attached"); };
							$("#right-panel").panel("close");
						},
						error : function(){ 
							console.log("bad sent");
						}
					}
				);
			};
			
			createPopup("Please check in <br> using NFC...");
		},
	
		checkInTour = function(tourId){
			$.ajax({
				url: "http://cmu-tourout.appspot.com/finishTour?key="+tourId,
				type: 'GET',
				success: function () {
					console.log("finish...");
					killPopup();
					createPopup("Success!");
					setTimeout(function(){killPopup()}, 3000);
					//console.log(jsondata);
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
				//console.log(message.records[0].text);
				//var msg = JSON.parse(message.records[2].text);
				//console.log(message.records[2].text);
				checkInTour(message.records[2].text);
			}	
		};
		
	
	return {
		init : function(){
			tourout.nfc.init(nfcCallbacks);
			//sendVisitorInfo();
		},
		setTourInfo : function(tInfo){
			tourInfo = tInfo;
		},
		sendVisitorInfo : sendVisitorInfo
	};
	
})();