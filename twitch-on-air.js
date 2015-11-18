window.onload = init;

var ON  = 1;
var OFF = 0;
var SIGN = $('#sign');

var streamUpdateInterval;

function init() {
	requestChannel('cmgtplays');

	// Event listeners
	$("#search-btn").click(searchHandler);
}

function searchHandler() {
	clearInterval(streamUpdateInterval);

	var channelName = $('#search-inp').val();
	requestChannel(channelName);
}


// CHANNEL DATA
function requestChannel(channelName) {
	$.when($.getJSON('https://api.twitch.tv/kraken/channels/' + channelName))
		.then(updateChannelInfo, requestChannelError);
}

function updateChannelInfo(data) {
	$('#channel').text(data.display_name);
	$('#views').text(data.views);
	$('#followers').text(data.followers);
	requestStream();
	streamUpdateInterval = setInterval(requestStream, 2000);
}

function requestChannelError(data) {
	var error = data.responseJSON;
	switch (error.status) {
		case 404:
			// Handle non existing channelname
			alert('Channel does not exist.');
			break;
		default:
			console.error(error.status + ' ' + error.error + ': ' + error.message);
	}
}


// STREAM DATA
function requestStream() {
	var channelName = $('#channel').text();
	console.log(channelName);
	$.when($.getJSON('https://api.twitch.tv/kraken/streams/' + channelName))
		.then(updateStreamInfo, requestChannelError);
}

function updateStreamInfo(data) {
	if(data.stream) {
		powerSign(ON);
		$('#viewers').text(data.stream.viewers);
	}
	else {
		powerSign(OFF);
		$('#viewers').text('0');
	}
}

/**
 * Acts like a toggle if no paramaters are given.
 */
function powerSign(state) {
	switch (state) {
		case 0:
			SIGN.attr('data-on-air', false);
			break;
		case 1:
			SIGN.attr('data-on-air', true);
			break;
		default:
			if (SIGN.attr('data-on-air') == 'true') {
				SIGN.attr('data-on-air', false);
			}
			else {
				SIGN.attr('data-on-air', true);
			}
	}
}
