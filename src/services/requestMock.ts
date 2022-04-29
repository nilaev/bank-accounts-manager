import accounts from '../mocks/accountsMock.json';
import operations from '../mocks/operationsMock.json';

const promiseResponse = data =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(data);
		}, 500);
	});

export const getAccounts = () => promiseResponse(accounts);

export const getOperations = accountId => {
	const accountOperations = operations[accountId] || [];

	return promiseResponse(accountOperations);
};
