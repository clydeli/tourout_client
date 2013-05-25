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
			case "findTour":
				tourout.findtour.init();
				break;
		}
	});
	
	function bindTourDetail() {
		$("#tourList a").on("click", function() {
			$("#right-panel").panel("open");
		});
	}
	
	bindTourDetail();
});

