var tourout = tourout || {};

tourout.tourlist = (function() {
	var
		init = function(){
			console.log("here!");
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
		init : init
	};
	
})();