//
declare global {
	interface Number {
		ordinalSuffix(): string | undefined;
	}
}

Number.prototype.ordinalSuffix = function () {
	const n = this.valueOf() as number;
	const enOrdinalRules = new Intl.PluralRules('en-US', {type: 'ordinal'});

	const suffixes = new Map([
		['one', 'st'],
		['two', 'nd'],
		['few', 'rd'],
		['other', 'th'],
	]);
	const rule = enOrdinalRules.select(n);
	const suffix = suffixes.get(rule);
	return suffix;
};

export {};
