//
declare global {
	interface String {
		truncateNames(): string;
	}
}

String.prototype.truncateNames = function () {
	const splitName: string[] = this.split(' ');
	const firstInitial: string = splitName[0][0] + '.';
	let lastName: string = splitName[splitName.length - 1];
	const SUFFIXES: string[] = ['jr', 'sr', 'jr.', 'sr.', 'ii', 'iii', 'iv', 'v'];
	if ([...SUFFIXES].includes(lastName.toLowerCase())) {
		lastName = splitName[splitName.length - 2] + ' ' + lastName;
	}
	if (lastName.includes('-')) {
		const splitHyphen = lastName.split('-');
		lastName = `${splitHyphen[0][0] + splitHyphen[0][1] + splitHyphen[0][2]}-${
			splitHyphen[1]
		}`;
	}
	return `${firstInitial} ${lastName}`;
};

export {};
