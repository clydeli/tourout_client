function updateTitle(title) {
	$("#head-title").text(title);
}

$(document).on("pageinit", "#demo-page", function() {

	$(".innerPages").hide();
	$("#tourList").show();
	
	$(document).on("swiperight", "#demo-page", function(e) {
		// We check if there is no open panel on the page because otherwise
		// a swipe to close the left panel would also open the right panel (and
		// v.v.).
		// We do this by checking the data that the framework stores on the page
		// element (panel: open).
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
				tourout.nfc.init();
				break;
			case "tourList":
				tourout.tourist.init();
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

