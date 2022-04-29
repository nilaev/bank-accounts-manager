const typesOrder = {
	debit: 10,
	credit: 20,
	external: 25,
	saving: 30,
	loan: 40,
};
const currencyOrder = { RUB: 10, USD: 20, EUR: 30, GBP: 40 };

export const compareAccounts = (acc1, acc2) => {
	const typesDiff = typesOrder[acc1.type] - typesOrder[acc2.type];

	return typesDiff === 0
		? currencyOrder[acc1.currency] - currencyOrder[acc2.currency]
		: typesDiff;
};
