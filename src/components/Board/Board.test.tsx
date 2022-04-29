import React from 'react';
import { shallow, mount } from 'enzyme';
import {Provider} from "react-redux";
import { NavLink, MemoryRouter } from 'react-router-dom';

import Board from './Board';
import BoardItem from '../BoardItem/BoardItem';

import store from '../../redux/store/store';

const getId = (() => {
    let counter = 0;

    return () => counter++;
})();

const account = ({ type, currency }: any) => ({
    id: getId(),
    title: 'test',
    type,
    amount: 100,
    currency,
});

const accounts = [
    account({ type: 'credit', currency: 'USD' }),
    account({ type: 'debit', currency: 'USD' }),
    account({ type: 'loan', currency: 'RUB' }),
    account({ type: 'debit', currency: 'RUB' }),
    account({ type: 'external' }),
    account({ type: 'credit', currency: 'RUB' }),
    account({ type: 'saving', currency: 'RUB' }),
    account({ type: 'loan', currency: 'USD' }),
    account({ type: 'debit', currency: 'EUR' }),
    account({ type: 'saving', currency: 'USD' }),
    account({ type: 'debit', currency: 'GBP' }),
];

describe('Board', () => {
    /**
     Необходимо реализовать возможность переключения между аккаунтами.
     Используй для этого компонент NavLink.

     Также необходимо добавить ссылку для перехода на страницу привязки карты стороннего банка
     */

    let component;

    beforeAll(() => {
        component = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <Board accounts={accounts} />
                </Provider>
            </MemoryRouter>
        );
    });

    it('Если аккаунтов нет, то ничего не рендерим', () => {
        const comp = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <Board accounts={[]} />
                </Provider>
            </MemoryRouter>
        );

        expect(comp.find(BoardItem).length).toBe(0);
    });

    it('Проверяем рендеринг всех возможных продуктов', () => {
        const boardItems = component.find(BoardItem);

        // отредерилось 11 аккаунтов
        expect(boardItems.length).toBe(11);

        const rightOrder = [
            { type: 'debit', currency: 'RUB' },
            { type: 'debit', currency: 'USD' },
            { type: 'debit', currency: 'EUR' },
            { type: 'debit', currency: 'GBP' },
            { type: 'credit', currency: 'RUB' },
            { type: 'credit', currency: 'USD' },
            { type: 'external' },
            { type: 'saving', currency: 'RUB' },
            { type: 'saving', currency: 'USD' },
            { type: 'loan', currency: 'RUB' },
            { type: 'loan', currency: 'USD' },
        ];

        // аккаунты отрендерились в правильном порядке
        rightOrder.forEach((item, index) => {
            const props = boardItems.get(index).props;

            expect(props.type).toEqual(item.type);
            expect(props.currency).toEqual(item.currency);
        });
    });

    it('Должно быть 12 ссылок в Board', () => {
        const navLinks = component.find(NavLink);

        // отрендерилось 12 ссылок, 11 ведут на странцы операций по аккаунтам, а
        // последняя ссылка ведет на страницу привязки карты стороннего банка
        expect(navLinks.length).toBe(12);
    });

    it('Проверка первой ссылки', () => {
        const firstLink = component.find(NavLink).get(0);

        expect(firstLink.props.className).toBe('link');
        expect(firstLink.props.activeClassName).toBe('activeItem');
        expect(firstLink.props.to).toBe('/account/3');
    });

    it('Проверка последней ссылки', () => {
        const lastLink = component.find(NavLink).get(11);

        expect(lastLink.props.className).toBe('link');
        expect(lastLink.props.activeClassName).toBe('activeItem');
        expect(lastLink.props.to).toBe('/actions/add_card');
    });
});
