import Header from "../components/header"
import { Toaster } from "@/components/ui/toaster"
import { ExpenseForm } from "../components/form"

export default async function ExpensePage(){
    return(
        <main>
            <Header title="Expense Form" />
            <ExpenseForm />
            <Toaster />
        </main>
    )
}