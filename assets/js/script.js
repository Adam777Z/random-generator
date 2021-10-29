if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js');
}

var prefix = '', suffix = '', length = 8, random = '', result;

document.addEventListener( 'DOMContentLoaded', (event) => {
	prefix = document.getElementById( 'prefix' ).value;
	suffix = document.getElementById( 'suffix' ).value;
	length = parseInt( document.getElementById( 'length' ).value );
	result = document.getElementById( 'result' );
	var copy_btn = document.getElementById( 'copy' );
	var tooltip = new bootstrap.Tooltip( copy_btn,
	{
		'placement': 'top',
		'trigger': 'manual',
		'title': 'Copied'
	} );

	document.getElementById( 'generate' ).addEventListener( 'click', (e) => {
		generate();
	});

	document.getElementById( 'prefix' ).addEventListener( 'input', (e) => {
		prefix = document.getElementById( 'prefix' ).value;
		update();
	});

	document.getElementById( 'suffix' ).addEventListener( 'input', (e) => {
		suffix = document.getElementById( 'suffix' ).value;
		update();
	});

	document.getElementById( 'length' ).addEventListener( 'input', (e) => {
		length = parseInt( document.getElementById( 'length' ).value );
		generate();
	});

	document.getElementById( 'numbers_only' ).addEventListener( 'change', (e) => {
		generate();
	});

	['input', 'change'].forEach( (event) => {
		result.addEventListener( event, (event2) => {
			copy_btn.disabled = event2.target.value === '';
		});
	});

	copy_btn.addEventListener( 'click', (e) => {
		result.select();
		document.execCommand( 'copy' );

		tooltip.show();

		setTimeout( () => {
			tooltip.hide();
		}, 2000 );
	});

	result.dispatchEvent( new Event( 'change' ) );
});

function update() {
	result.value = prefix + random + suffix;
}

function generate() {
	random = document.getElementById( 'numbers_only' ).checked ? generate_random_number( length ) : generate_random_hex( length );

	// document.getElementById( 'result_prefix' ).innerHTML = prefix;
	// document.getElementById( 'result_random' ).innerHTML = random;
	// document.getElementById( 'result_suffix' ).innerHTML = suffix;
	result.value = prefix + random + suffix;
	result.dispatchEvent( new Event( 'change' ) );
}

function generate_random_hex( length ) {
	return [ ...Array( length ) ].map( () => Math.floor( Math.random() * 16 ).toString( 16 ) ).join( '' );
}

function generate_random_number( length ) {
	var add = 1, max = 12 - add; // 12 is the minimum safe number Math.random() can generate without it starting to pad the end with zeros

	if ( length > max ) {
		return generate_random_number( max ) + generate_random_number( length - max );
	}

	max        = Math.pow( 10, length + add );
	var min    = max / 10; // Math.pow( 10, length ) basically
	var number = Math.floor( Math.random() * ( max - min + 1 ) ) + min;

	return ( '' + number ).substring( add );
}