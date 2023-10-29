//
declare global {
	interface String {
		contrastTextColor(): 'light' | 'dark';
	}
}

String.prototype.contrastTextColor = function () {
	const color = this as string | any;

	let r, g, b;

	if (color.match(/^rgb/)) {
		// If RGB
		[r, g, b] = color
			.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)
			.slice(1, 4);
	} else {
		// If Hex
		const hex = color.slice(1).replace(color.length < 5 && /./g, '$&$&');
		[r, g, b] = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((c) =>
			parseInt(c, 16)
		);
	}

	// HSP from http://alienryderflex.com/hsp.html
	const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

	return hsp > 127.5 ? 'light' : 'dark';
};

export {};
