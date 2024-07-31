'use server'
import { toggleNumberFormat } from '@/app/form/components/util'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function saveIncome(formData: FormData) {
    const supabase = createClient()

    const data = {
        type: "Income",
        description: formData.get('description') as string,
        amount: toggleNumberFormat(formData.get('amount') as string) as unknown as number,
        date: new Date(formData.get('date') + ' ' + formData.get('time')).toISOString() as unknown as Date,
        account_no: formData.get('account') as string,
        category: formData.get('category') as string,
        user_id: (await supabase.auth.getUser()).data.user?.id
    }

    const { error } = await supabase
        .from('transactions')
        .insert(data)

    if (error) {
        console.log(error)
        redirect('/form/income?error=1')
    }
    redirect('/form/income?error=0')
}

export async function saveExpense(formData: FormData) {
    const supabase = createClient()

    const data = {
        type: "Expense",
        description: formData.get('description') as string,
        amount: toggleNumberFormat(formData.get('amount') as string) as unknown as number,
        date: new Date(formData.get('date') + ' ' + formData.get('time')).toISOString() as unknown as Date,
        account_no: formData.get('account') as string,
        category: formData.get('category') as string,
        user_id: (await supabase.auth.getUser()).data.user?.id
    }

    const { error } = await supabase
        .from('transactions')
        .insert(data)

    if (error) {
        console.log(error)
        redirect('/form/expense?error=1')
    }
    redirect('/form/expense?error=0')
}

export async function saveTransfer(formData: FormData) {
    const supabase = createClient()

    const data = {
        transferOut:{
            type: "Expense",
            description: "Transfer Out" as string,
            amount: toggleNumberFormat(formData.get('amount') as string) as unknown as number,
            date: new Date(formData.get('date') + ' ' + formData.get('time')).toISOString() as unknown as Date,
            account_no: formData.get('fromAccount') as string,
            category: "Transfer Out" as string,
            user_id: (await supabase.auth.getUser()).data.user?.id

        }, 
        fees:{
            type: "Expense",
            description: "Fee" as string,
            amount: toggleNumberFormat(formData.get('fee') as string) as unknown as number,
            date: new Date(formData.get('date') + ' ' + formData.get('time')).toISOString() as unknown as Date,
            account_no: formData.get('fromAccount') as string,
            category: "Fee" as string,
            user_id: (await supabase.auth.getUser()).data.user?.id

        },
        transferIn:{
            type: "Income",
            description: "Transfer In" as string,
            amount: toggleNumberFormat(formData.get('amount') as string) as unknown as number,
            date: new Date(formData.get('date') + ' ' + formData.get('time')).toISOString() as unknown as Date,
            account_no: formData.get('toAccount') as string,
            category: "Transfer In" as string,
            user_id: (await supabase.auth.getUser()).data.user?.id

        }, 
    }

    if(data.fees.amount == 0){
        const { error } = await supabase
            .from('transactions')
            .insert([data.transferOut, data.transferIn])

        if (error) {
            console.log(error)
            redirect('/form/transfer?error=1')
        }

        redirect('/form/transfer?error=0')
    }

    const { error } = await supabase
        .from('transactions')
        .insert([data.transferOut, data.transferIn, data.fees])

    if (error) {
        console.log(error)
        redirect('/form/transfer?error=1')
    }

    redirect('/form/transfer?error=0')
}