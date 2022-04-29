import React from 'react';
import { mount } from 'enzyme';

import NotFoundPage from './NotFoundPage';

describe('Тест страницы NotFoundPage', () => {
	it('Отображаем на странице текст ошибки', () => {
		const component = mount(<NotFoundPage />);

		expect(component.find('h2').text()).toBe(
			'Упс... Похоже вы забрели не туда :)'
		);
	});
});
