import React, {useMemo} from 'react';

export const currencySign = {
    'RUB': '₽',
    'EUR': '€',
    'USD': '$',
    'GBP': '£'
};


const Money: React.FC<any> = ({value, currency}) => {
    const [number, fractional] = useMemo(() => String(value).split('.'), [value]);

    return (
        <span>
            {<span>{number}</span>}
            {fractional ? <span>{',' + fractional}</span> : undefined}
            {typeof currency !== 'undefined' ? <span>{currencySign[currency]}</span> : undefined}
        </span>);
};

export default Money;
