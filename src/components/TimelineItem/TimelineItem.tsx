import React from "react";

import styles from './TimelineItem.module.css';
import {toLocaleFormat} from "../../utils/date";
import Money from "../Money/Money";

const TimelineItem: React.FC<any> = ({ title, date, amount, currency }) => (
    <div className={styles.item}>
        <div>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.date}>{toLocaleFormat(date)}</div>
        </div>
        <div>
            <Money value={amount} currency={currency} />
        </div>
    </div>
);

export default TimelineItem;
