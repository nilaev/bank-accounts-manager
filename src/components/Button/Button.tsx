import React from 'react';

import styles from './Button.module.css';

const Button: React.FC<any> = ({type, children, onClick }) => {
    return (<button className={styles.button} type={type} onClick={onClick}>{children}</button>);
};

export default Button;
