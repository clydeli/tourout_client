function updateTitle(title) {
	$("#head-title").text(title);
}

$(document).on("pageinit", "#demo-page", function() {
	tourout.tourlist.init();
	tourout.checkin.init();

	$(".innerPages").hide();
	$("#tourList").show();
	
	$(document).on("swiperight", "#demo-page", function(e) {
		if ($.mobile.activePage.jqmData("panel") !== "open") {
			if (e.type === "swiperight") {
				$("#left-panel").panel("open");
			}
		}
	});
	
	$('#provideTour').on('click', 'input', function(){
		console.log('good');
		//$('#provideTour input').focus();
		//prompt();
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
			case "findTour":
				tourout.findtour.init();
				break;
		}
	});
});

