import React from 'react';
import { shallow } from 'enzyme';

import Timeline from './Timeline';
import TimelineItem from '../TimelineItem/TimelineItem';

const fakeOperations = [
    {
        id: 1,
        title: 'test',
        date: 123454323423,
        amount: 50,
        currency: 'RUB',
    },
    {
        id: 2,
        title: 'test 2',
        date: 123454323423,
        amount: 150,
        currency: 'USD',
    },
];

describe('Timeline', () => {
    /**
     * Компонент Timeline
     * Предназначен для отображения списка операций
     * Пример использования: <Timeline items=[operation1, operation2, ...] />
     * где operation - информация по операции { id, title, date, amount, currency }
     * Параметр: items - массив из operations
     */

    it('Нет операций => 0 TimelineItem', () => {
        const component = shallow(<Timeline items={[]} />);

        expect(component.find(TimelineItem).length).toBe(0);
    });

    it('2 операции => 2 TimelineItem', () => {
        const component = shallow(<Timeline items={fakeOperations} />);

        expect(component.find(TimelineItem).length).toBe(2);
    });

    it('В TimelineItem переданы нужные данные', () => {
        const component = shallow(<Timeline items={fakeOperations} />);
        const items = component.find(TimelineItem);

        items.forEach((item, index) => {
            expect(item.props()).toEqual(fakeOperations[index]);
        });
    });
});
