export const monthIsValid = value => +value > 0 && +value < 13;

export const fieldIsEmpty = value => value === '' || value.includes('_');

export const cardExpired = (month, year) => {
	const now = new Date();
	const currentYear = now.getFullYear() % 100;
	const currentMonth = now.getMonth() + 1;

	if (+year < currentYear) {
		return true;
	}

	if (+year === currentYear) {
		return currentMonth > parseInt(month);
	}

	return false;
};
