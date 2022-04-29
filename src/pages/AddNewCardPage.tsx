import React from 'react';
import withTitle from '../decorators/withTitle';
import NewAccountForm from '../components/NewAccountForm/NewAccountForm';

const AddNewCardPage: React.FC<any> = ({ handleSubmit }) => (
    <div>
        <NewAccountForm handleSubmit={handleSubmit} />
    </div>
);

export default withTitle(() => 'Добавить карту')(AddNewCardPage);
