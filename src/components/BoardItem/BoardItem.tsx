import React from 'react';
import cn from 'classnames';

import styles from './BoardItem.module.css';
import Money, {currencySign} from "../Money/Money";

const BoardItem: React.FC<any> = ({ type, title, customTitle, amount, currency }) => {
	return (
		<div className={styles.item}>
			<div className={cn(styles.logo, styles[`logo_${type}`])}>{
				type === "debit" || type === "credit" ? currencySign[currency] : undefined
			}</div>
			<div className={styles.itemInfo}>
				<div className={styles.title}>{customTitle ? customTitle : title}</div>
				<p className={styles.money}>{
					type !== "external" ? <Money value={amount} currency={currency}/> : undefined
				}</p>
			</div>
		</div>
	);
};

export default BoardItem;
