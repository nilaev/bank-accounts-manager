import React from 'react';
import withTitle from '../decorators/withTitle';

const NotFoundPage = () => <h2>Упс... Похоже вы забрели не туда :)</h2>;

export default withTitle(() => 'Страница не найдена')(NotFoundPage);
