
import Header from "../components/header"
import { Toaster } from "@/components/ui/toaster"
import { ExpenseForm } from "../components/form"
import { createClient } from "@/utils/supabase/server"


export default async function ExpensePage(){
    const supabase = createClient()

    const { data, error } = await supabase
        .from('accounts')
        .select()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const accounts = data?.map((account) => ({ id: account.id, name: account.name, account_no: account.account_no }))

    return(
        <main>
            <Header title={"Expense Form"} name={user?.user_metadata.display_name} />
            <ExpenseForm accounts={accounts} />
            <Toaster />
        </main>
    )
}