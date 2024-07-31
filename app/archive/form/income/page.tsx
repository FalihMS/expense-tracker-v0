
import { IncomeForm } from "@/app/form/components/form"
import Header from "@/app/form/components/header"
import { Toaster } from "@/components/ui/toaster"


export default function IncomePage() {
    return (
        <main>
            <Header title={"Income Form"} />
            <IncomeForm />
            <Toaster />
        </main>
    )
}