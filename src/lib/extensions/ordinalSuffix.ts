//
declare global {
	interface Number {
		ordinalSuffix(): string | undefined;
	}
}

Number.prototype.ordinalSuffix = function () {
	const n = this.valueOf() as number;
	const enOrdinalRules = new Intl.PluralRules('en-US', {type: 'ordinal'});

	/**
	 * Map containing the ordinal suffixes for different numbers.
	 * @type {Map<string, string>}
	 */
	const suffixes: Map<string, string> = new Map([
		['one', 'st'],
		['two', 'nd'],
		['few', 'rd'],
		['other', 'th'],
	]);
	const rule = enOrdinalRules.select(n);
	const suffix = suffixes.get(rule);
	return suffix as string;
};

export {};
