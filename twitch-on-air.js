window.onload = init;

var ON  = 1;
var OFF = 0;
var SIGN = $('#sign');

function init() {

	// Event listeners
	$("#search-btn").click(searchHandler);
}

function searchHandler() {
	powerSign();
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
