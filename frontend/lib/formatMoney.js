const formatMoney = (amount = 0) => {
    const options = {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2,

    }

    if( amount % 100 === 0) {
        options.minimumFractionDigits = 0;
    }

    const formatter = Intl.NumberFormat('ru-RU', options)
    return formatter.format(amount/100)
}

export default formatMoney