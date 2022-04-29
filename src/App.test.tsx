import React from 'react';
import { mount } from 'enzyme';
import {Provider} from "react-redux";

import App from './App';
import * as request from './services/requestMock';
import accounts from './mocks/accountsMock.json';

import store from './redux/store/store';

let getAccounts;

describe('Интеграционный тест', () => {
  /*
   * Проверяем интеграцию модулей и загрузку данных
   * для загрузки данных необходимо в компоненте реализовать метод fetchAccounts, который будет
   * вызывать соответствующее API
   * */

  beforeEach(() => {
    getAccounts = jest.spyOn(request, 'getAccounts').mockReturnValue(
        Promise.resolve(accounts),
    );
  });

  it('После монтирования компонента происходит загрузка данных', () => {
    mount(
        <Provider store={store}>
          <App />
        </Provider>
    );

    expect(getAccounts).toHaveBeenCalled();
  });
});
