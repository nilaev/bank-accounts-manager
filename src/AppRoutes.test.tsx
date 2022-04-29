import React  from 'react';
import { mount } from 'enzyme';
import * as RRD from 'react-router-dom';
import {Provider} from "react-redux";

import App from './App';
import TimelinePage from './pages/TimelinePage';
import NotFoundPage from './pages/NotFoundPage';
import AddNewCardPage from './pages/AddNewCardPage';
import {waitFor} from "@testing-library/react";


import store from './redux/store/store';

describe('Проверка роутинга', () => {
	beforeEach(() => {
		jest.spyOn(RRD, 'BrowserRouter').mockImplementation(
			({ children }: any) => React.createElement('div', null, children) as any
		);
	});

	// it('Если пользователь находится на странице /actions/add_card то показываем AddNewCardPage', async () => {
	// 	const component = mount(
	// 		<RRD.MemoryRouter initialEntries={['/actions/add_card']}>
	// 			<Provider store={store}>
	// 				<App />
	// 			</Provider>
	// 		</RRD.MemoryRouter>
	// 	);
	//
	// 	await waitFor(() => {
	// 		expect(component.find(AddNewCardPage).length).toBe(component);
	// 	});
	// });

	it('Если пользователь находится на странице /some_fake_page то показываем 404', async () => {
		const component = mount(
			<RRD.MemoryRouter initialEntries={['/some_fake_page']}>
				<Provider store={store}>
					<App />
				</Provider>
			</RRD.MemoryRouter>
		);
		await waitFor(() => {
			expect(component.find(NotFoundPage).length).toBe(1);
		});
	});

	it('Если пользователь находится на странице /account/:accountId то показываем TimelinePage', async () => {
		const component = mount(
			<RRD.MemoryRouter initialEntries={['/account/1']}>
				<Provider store={store}>
					<App />
				</Provider>
			</RRD.MemoryRouter>
		);

		await waitFor(() => {
			expect(component.find(TimelinePage).length).toBe(1);
		});
	});
});
