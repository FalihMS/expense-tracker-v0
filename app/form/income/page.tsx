import { IncomeForm } from "../components/form"
import Header from "../components/header"
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