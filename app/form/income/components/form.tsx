'use client'

import { Input } from "@/components/ui/input";

function toggleNumberFormat(amount: string){
    return  amount.replace(/[^0-9.-]+/g,"");
}

function toggleMoneyFormat(amount: string){
    if(isNaN(Number(amount))){
        return '0'
    }
    return new Intl.NumberFormat().format(Number(amount))
}

export default function AmountInput() {
    return (

        <Input name="amount" type="text" placeholder={'0'} onFocus={(e) => e.target.value = toggleNumberFormat(e.target.value)} onBlur={(e) => (e.target.value = toggleMoneyFormat(e.target.value))} />

    )
}