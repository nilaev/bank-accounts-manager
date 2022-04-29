import React, {useCallback, useReducer} from 'react';
import MaskedInput from 'react-maskedinput';
import cn from 'classnames';

import Button from '../Button/Button';

import styles from './NewAccountForm.module.css';

const initialState = {cardNumber: '', month: '', year: ''};

function reducer(state, action) {
    if (action.reset) {
        return initialState
    }
    return {...state, [action.propName]: action.newValue}
}

const NewAccountForm = ({handleSubmit}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const sendResult = useCallback((event) => {
        event.preventDefault();
        if (state.cardNumber.length === 19 && state.month.length === 2 && state.year.length === 2) {
            const cardNumberEnd = state.cardNumber.substr(15);
            dispatch({reset: true})
            handleSubmit({id: Date.now(), type: 'external', title: `Привязанная карта *${cardNumberEnd}`});
        }
    }, [handleSubmit, state.cardNumber, state.month, state.year]);

    const handleInputChange = event => {
        event.preventDefault()
        dispatch({propName: event.target.name, newValue: event.target.value})
    };

    return (
        <form onSubmit={sendResult}>
            <h2>Привязка банковской карты</h2>
            <div className={styles.cardForm}>
                <MaskedInput
                    mask="1111 1111 1111 1111"
                    name="cardNumber"
                    value={state.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Номер карты"
                    className={styles.input}
                />
                <b className={styles.ValidText}>VALID THRU</b>
                <div className={styles.dataInputPart}>
                    <MaskedInput
                        mask="11"
                        name="month"
                        value={state.month}
                        onChange={handleInputChange}
                        placeholder="MM"
                        className={cn(styles.input, styles.inputDate)}
                    />
                    <p className={styles.dividingLine}>/</p>
                    <MaskedInput
                        mask="11"
                        name="year"
                        value={state.year}
                        onChange={handleInputChange}
                        placeholder="YY"
                        className={cn(styles.input, styles.inputDate)}
                    />
                </div>
                <div className={styles.btnSection}>
                    <Button type="submit">Привязать</Button>
                </div>
            </div>
        </form>
    );

}

export default NewAccountForm;
