var prefix, suffix, length, random = '';

document.addEventListener( 'DOMContentLoaded', function (event) {
	prefix = document.getElementById('prefix').value;
	suffix = document.getElementById('suffix').value;
	length = parseInt( document.getElementById('length').value );
	var tooltip = new bootstrap.Tooltip(document.getElementById( 'copy' ), {
		'placement': 'top',
		'trigger': 'manual',
		'title': 'Copied'
	});

	document.getElementById( 'generate' ).addEventListener( 'click', function (e) {
		generate();
	});

	document.getElementById( 'prefix' ).addEventListener( 'input', function (e) {
		prefix = document.getElementById('prefix').value;
		update();
	});

	document.getElementById( 'suffix' ).addEventListener( 'input', function (e) {
		suffix = document.getElementById('suffix').value;
		update();
	});

	document.getElementById( 'length' ).addEventListener( 'input', function (e) {
		length = parseInt( document.getElementById('length').value );
		generate();
	});

	document.getElementById( 'numbers_only' ).addEventListener( 'change', function (e) {
		generate();
	});

	document.getElementById( 'copy' ).addEventListener( 'click', function (e) {
		document.getElementById( 'result' ).select();
		document.execCommand( 'copy' );

		tooltip.show();

		setTimeout(() => {
			tooltip.hide();
		}, 2000);
	});
});

function update() {
	document.getElementById( 'result' ).value = prefix + random + suffix;
}

function generate() {
	random = document.getElementById('numbers_only').checked ? generate_random_number( length ) : generate_random_hex( length );

	// document.getElementById( 'result_prefix' ).innerHTML = prefix;
	// document.getElementById( 'result_random' ).innerHTML = random;
	// document.getElementById( 'result_suffix' ).innerHTML = suffix;
	document.getElementById( 'result' ).value = prefix + random + suffix;
}

function generate_random_hex( length ) {
	return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

function generate_random_number( length ) {
	var add = 1, max = 12 - add; // 12 is the minimum safe number Math.random() can generate without it starting to pad the end with zeros

	if ( length > max ) {
		return generate_random_number(max) + generate_random_number(length - max);
	}

	max        = Math.pow(10, length+add);
	var min    = max/10; // Math.pow(10, length) basically
	var number = Math.floor( Math.random() * (max - min + 1) ) + min;

	return ('' + number).substring(add);
}