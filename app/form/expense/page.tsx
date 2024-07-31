import Header from "../components/header"
import { Toaster } from "@/components/ui/toaster"
import { ExpenseForm } from "../components/form"
import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export default async function ExpensePage(){

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return(
        <main>
            <Header title={"Income Form"} name={user?.user_metadata.display_name} />
            <ExpenseForm />
            <Toaster />
        </main>
    )
}