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