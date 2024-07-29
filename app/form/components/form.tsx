'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";
import { toggleMoneyFormat, toggleNumberFormat } from "./util";

export function AmountInput() {
    return (

        <Input name="amount" type="text" placeholder={'0'} onFocus={(e) => e.target.value = toggleNumberFormat(e.target.value)} onBlur={(e) => (e.target.value = toggleMoneyFormat(e.target.value))} />
    )
}

export function SubmitButton(){
    const { pending } = useFormStatus()
    return(
        <Button type="submit" disabled={pending}>Submit</Button>
    )
}