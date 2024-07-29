
export function toggleNumberFormat(amount: string){
    return  amount.replace(/[^0-9.-]+/g,"");
}

export function toggleMoneyFormat(amount: string){
    if(isNaN(Number(amount))){
        return '0'
    }
    return new Intl.NumberFormat().format(Number(amount))
}