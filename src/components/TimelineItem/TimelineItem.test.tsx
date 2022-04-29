import React from 'react';
import { shallow } from 'enzyme';

import TimelineItem from './TimelineItem';
import Money from '../Money/Money';

let component;

describe('TimelineItem', () => {
	/**
	 * Компонент TimelineItem
	 * Предназначен для отображения информации по совершенной операции
	 * Пример использования: <TimelineItem title='Кино' date={1554572477021} amount={5000.99} currency='USD' />
	 * Параметр: title - строка, название операции
	 * Параметр: date - дата, milliseconds
	 * Параметр: amount - число, расход или приход средств, может быть дробным
	 * Параметр: currency - строка, валюта в которой совершена операция ('RUB', 'EUR', 'GBP', 'USD')
	 * Особенности: для отображения даты необходимо использовать формат "DD.MM.YYYY"
	 */

	beforeAll(() => {
		component = shallow(
			<TimelineItem
				title="Кино"
				date={1554572477021}
				amount={5000.99}
				currency="USD"
			/>
		);
	});

	it('Для вывода суммы используется компонент Money', () => {
		expect(component.find(Money).length).toBe(1);
	});

	it('В Money переданы все нужные props', () => {
		expect(component.find(Money).props()).toEqual({
			value: 5000.99,
			currency: 'USD',
		});
	});

	it('Название операции отображается в h3', () => {
		expect(component.find('h3').length).toBe(1);
		expect(component.find('h3').text()).toBe('Кино');
	});

	// в тестах CSS Modules не генерируют уникальное название класса ('.TimelineItem_date__gffadf'),
	// следовательно на элемент можно ссылаться просто через .date
	it('Дата хранится в блоке .date и имеет нужный формат', () => {
		expect(component.find('.date').length).toBe(1);
		expect(component.find('.date').text()).toBe('06.04.2019');
	});
});
