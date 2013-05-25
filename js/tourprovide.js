var createPopup = function(text) {
	var closebtn = '<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" data-shadow="false" data-iconshadow="false" class="ui-btn-right">Close</a>';
	var header = '<div data-role="header"><h2> ' + text + ' </h2></div>';
	var popup = '<div data-role="popup" style="width: 18em;" id="popup-received" data-theme="none" data-overlay-theme="a" data-corners="false" data-tolerance="15"> '
			+ closebtn + header + '</div>';
	$.mobile.activePage.append(popup).trigger("pagecreate");
	var fallback = setTimeout(function() {
		$("#popup-received").popup("open");
	}, 600);
};

var killPopup = function() {
	$("#popup-received").popup("close");
	$("#popup-received").remove();
};

$("#provide-button").click(function() {

	var data = {
		companyName : $('#provide-tour-company').find(":selected").text(),
		meetingTime : new Date().getTime() + 24 * 60 * 60,
		provider : "Jennifer",
		haveFreeLunch : $("#free-food-yes").is(":checked")
	};

	$( "#popup-received").remove();
	createPopup("Storing <br/> New Tour");
	$.ajax({
		url : "http://cmu-tourout.appspot.com/storeTour",
		type : 'POST',
		data : data,
		dataType : 'json',
		success : function() {
			killPopup();
		}
		
	})
});