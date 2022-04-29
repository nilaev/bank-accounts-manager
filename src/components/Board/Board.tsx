import React, {useMemo} from 'react';

import BoardItem from '../BoardItem/BoardItem';

import styles from './Board.module.css';
import {NavLink} from "react-router-dom";

function sortAccounts(accounts) {
    const typesOrder = ['debit', 'credit', 'external', 'saving', 'loan'];
    const currencyOrder = ['RUB', 'USD', 'EUR', 'GBP'];
    return accounts.concat().sort((a, b) => {
        const aType = typesOrder.indexOf(a.type);
        const bType = typesOrder.indexOf(b.type);
        if (aType === bType) {
            return currencyOrder.indexOf(a.currency) < currencyOrder.indexOf(b.currency) ? -1 : 1;
        } else {
            return aType < bType ? -1 : 1;
        }
    });
}

const Board: React.FC<any> = ({accounts}) => {
    const sortedAccounts: any = useMemo(() => !accounts ? null : sortAccounts(accounts), [accounts]);
    return (<div className={styles.board}>{
        sortedAccounts.map((account) =>
            <NavLink
                key={account.id}
                to={`/account/${account.id}`}
                className={styles.link}
                activeClassName={styles.activeItem}
            >
                <BoardItem key={account.id} {...account}/>
            </NavLink>)}
        <NavLink
            to="/actions/add_card"
            className={styles.link}
            activeClassName={styles.activeItem}
        >
            <div className={styles.actionItem}>Привязать карту</div>
        </NavLink>
    </div>);
}

export default Board;
