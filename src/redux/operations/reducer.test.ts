import {
    loadOperationsAction,
    loadOperationsFailureAction,
    loadOperationsSuccess,
} from './actions';
import reducer from './reducer';

/**
 * Переводим наше приложение на redux
 * State имеет следующую структуру { accounts: [], operations: [] }
 * Для operations необходимо реализовать редьюсер, который будет поддерживать следующие actions:
 * Загрузка аккаунтов:
 * { type: 'LOAD_OPERATIONS' }
 *
 * Ошибка при загрузке:
 * { type: 'LOAD_OPERATIONS_FAILURE' }
 *
 * Успешная загрузка:
 * { type: 'LOAD_OPERATIONS_SUCCESS', payload }
 *
 * Важно помнить, что редьюсер является чистой функцией.
 * Также в нем запрещено мутировать состояние.
 */

const operationsState = [
    {
        title: 'АТАК',
        date: 1554572477021,
        amount: -2000,
        currency: 'RUB',
        id: 1,
    },
    {
        title: 'Фастфуд',
        date: 1554572470000,
        amount: -300,
        currency: 'RUB',
        id: 2,
    },
    {
        title: 'Салон красоты',
        date: 1554512470000,
        amount: -300,
        currency: 'RUB',
        id: 3,
    },
];

describe('accounts reducer', () => {
    it('Дефолтное состояние = []', () => {
        expect(reducer(undefined, { type: 'INIT' })).toEqual([]);
    });

    it('При загрузке аккаунтов сбрасываем состояние до null', () => {
        expect(reducer(operationsState, loadOperationsAction())).toBe(null);
    });

    it('Если при загрузке произошла ошибка, то возвращаем null', () => {
        expect(reducer(operationsState, loadOperationsFailureAction())).toBe(null);
    });

    it('Успешная загрузка данных, записываем в state загруженные данные', () => {
        expect(reducer([], loadOperationsSuccess(operationsState))).toEqual(
            operationsState
        );
    });
});
