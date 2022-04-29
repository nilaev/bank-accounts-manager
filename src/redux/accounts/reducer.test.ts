import {
    loadAccountsAction,
    loadAccountsFailureAction,
    loadAccountsSuccess,
    changeAccountTitle,
    addAccount,
    removeExternalAccount,
} from './actions';
import reducer from './reducer';

/*
 * Переводим наше приложение на redux
 * State имеет следующую структуру { accounts: [], operations: [] }
 * Для accounts необходимо реализовать редьюсер, который будет поддерживать следующие actions:
 * Загрузка аккаунтов:
 * { type: 'LOAD_ACCOUNTS' }
 *
 * Ошибка при загрузке:
 * { type: 'LOAD_ACCOUNTS_FAILURE' }
 *
 * Успешная загрузка:
 * { type: 'LOAD_ACCOUNTS_SUCCESS', payload }
 *
 * Изменение названия продукта:
 * { type: 'CHANGE_ACCOUNT_TITLE', payload }
 *
 * Привязка новой карты:
 * { type: 'ADD_ACCOUNT', payload }
 *
 * Удаление привязанной карты:
 * { type: 'REMOVE_EXTERNAL_ACCOUNT', payload }
 *
 * Важно помнить, что редьюсер является чистой функцией.
 * Также в нем запрещено мутировать состояние.
 */

const accountsState = [
    {
        id: 1,
        type: 'debit',
        amount: 20000.95,
        currency: 'RUB',
        title: 'Дебетовая карта *7711',
    },
    {
        id: 2,
        type: 'debit',
        amount: 600.2,
        currency: 'EUR',
        title: 'Дебетовая карта *8862',
    },
    {
        id: 3,
        type: 'credit',
        amount: 150000.19,
        currency: 'RUB',
        title: 'Кредитная карта *5234',
        customTitle: 'Кредитка',
    },
];

describe('accounts reducer', () => {
    it('Дефолтное состояние = []', () => {
        expect(reducer(undefined, { type: 'INIT' })).toEqual([]);
    });

    it('При загрузке аккаунтов сбрасываем состояние до null', () => {
        expect(reducer(accountsState, loadAccountsAction())).toEqual(null);
    });

    it('Если при загрузке произошла ошибка, то возвращаем null', () => {
        expect(reducer(accountsState, loadAccountsFailureAction())).toEqual(null);
    });

    it('Успешная загрузка данных', () => {
        expect(reducer([], loadAccountsSuccess(accountsState))).toEqual(
            accountsState
        );
    });

    it('Название корректно изменилось, state не мутирован', () => {
        const payload = {
            id: 2,
            customTitle: 'Дебетовка',
        };

        const newState = reducer(accountsState, changeAccountTitle(payload));

        expect(newState !== accountsState).toBe(true);
        expect(newState[1] !== accountsState[1]).toBe(true);

        expect(newState).toEqual([
            {
                id: 1,
                type: 'debit',
                amount: 20000.95,
                currency: 'RUB',
                title: 'Дебетовая карта *7711',
            },
            {
                id: 2,
                type: 'debit',
                amount: 600.2,
                currency: 'EUR',
                title: 'Дебетовая карта *8862',
                customTitle: 'Дебетовка',
            },
            {
                id: 3,
                type: 'credit',
                amount: 150000.19,
                currency: 'RUB',
                title: 'Кредитная карта *5234',
                customTitle: 'Кредитка',
            },
        ]);
    });

    it('Аккаунт добавлен, state не мутирован', () => {
        const account = {
            id: 1,
            type: 'external',
            title: `Привязанная карта *1111`,
        };

        const prevState = [];
        const newState = reducer(prevState, addAccount(account));

        expect(newState !== prevState).toBe(true);
        expect(newState).toEqual([account]);
    });

    it('Аккаунт удален, state не мутирован', () => {
        const account = { id: 1 };

        const prevState = [
            { id: 2, type: 'credit' },
            { id: 1, type: 'external' },
            { id: 3, type: 'debit' },
        ];

        const newState = reducer(prevState, removeExternalAccount(account));

        expect(newState !== prevState).toBe(true);
        expect(newState).toEqual([
            { id: 2, type: 'credit' },
            { id: 3, type: 'debit' },
        ]);
    });

    it('Нельзя удалить не external карту', () => {
        const account = { id: 1 };

        const prevState = [
            { id: 1, type: 'credit' },
            { id: 2, type: 'external' },
            { id: 3, type: 'debit' },
        ];

        const newState = reducer(prevState, removeExternalAccount(account));

        expect(newState).toEqual(prevState);
    });
});
