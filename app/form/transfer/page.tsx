import Header from "../components/header"
import { Toaster } from "@/components/ui/toaster"
import { TransferForm } from "../components/form"


export default function IncomePage() {
    return (
        <main>
            <Header title={"Transfer Form"} />
            <TransferForm />
            <Toaster />
        </main>
    )
}
