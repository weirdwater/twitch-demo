window.onload = init;

function init() {

	// Event listeners
	$("#search-btn").click(searchHandler);
}

function turnSignOn() {
	$('#sign').attr('data-on-air', "true");
}

function searchHandler () {
	var value = $("#search-inp").val();

	if (value) {
		$.when($.getJSON("https://api.twitch.tv/kraken/streams/" + value))
			.then(checkLive, channelError);
	}
	else {
		alert("Please enter a freaking channel name!");
	}
}


function checkLive (streamData) {
	var value = $("#search-inp").val();

	if (streamData.stream) {

		updateStream(streamData.stream);
	}
	else {
		$("#channel").text(value);
		toggleOnAir(true);
	}
}

function channelError () {
	$("#channel").text("Channel does not exist!");
	toggleOnAir(false);
}


function updateStream (streamData) {
	toggleOnAir(true);
	console.log(streamData);
	$('#viewers').text(streamData.viewers)
	updateChannel(streamData.channel);
}

function toggleOnAir (toggle)
{
	if (toggle) {
		$("#sign").attr("data-on-air", true);
	}
	else {
		$("#sign").attr("data-on-air", false);
	}
}

function updateChannel(channelData) {
	$("#channel").text(channelData.displayName);
}


