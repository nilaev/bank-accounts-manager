import React from 'react';
import { mount } from 'enzyme';

import NewAccountForm from '../components/NewAccountForm/NewAccountForm';
import AddNewCardPage from './AddNewCardPage';

describe('Тест страницы AddNewCardPage', () => {
	it('Форма привязки карты есть на странице', () => {
		const component = mount(<AddNewCardPage />);

		expect(component.find(NewAccountForm).length).toBe(1);
	});
});
