import { createClient } from "@/utils/supabase/server"
import { IncomeForm } from "../components/form"
import Header from "../components/header"
import { Toaster } from "@/components/ui/toaster"

const supabase = createClient()

export default async function IncomePage() {
    const { data, error } = await supabase
        .from('accounts')
        .select()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const accounts = data?.map((account) => ({ id: account.id, name: account.name, account_no: account.account_no }))
    return (
        <main>
            <Header title={"Income Form"} name={user?.user_metadata.display_name} />
            <IncomeForm accounts={accounts} />
            <Toaster />
        </main>
    )
}