import Header from "../components/header"
import { Toaster } from "@/components/ui/toaster"
import { TransferForm } from "../components/form"
import { createClient } from "@/utils/supabase/server"

const supabase = createClient()


export default async function TransferPage() {

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <main>
            <Header title={"Transfer Form"} name={user?.user_metadata.display_name} />
            <TransferForm />
            <Toaster />
        </main>
    )
}
