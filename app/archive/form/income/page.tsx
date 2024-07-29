
import { AmountInput, SubmitButton } from "@/app/form/components/form"
import Header from "@/app/form/components/header"
import { toggleNumberFormat } from "@/app/form/components/util"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react"
export default function IncomePage(){
    return(
        <main>
            <Header title={"Income Form"}  />
            <IncomeForm />
        </main>
    )
}


async function saveData(e: FormData){
    'use server'
    const BASEROW_AUTH = process.env.BASEROW_AUTH + ''
    const data = {
        Type: 'Income',
        Description: e.get('description'),
        Amount: toggleNumberFormat(e.get('amount') + ''),
        Date: new Date(e.get('date') + ' ' + e.get('time')).toISOString(),
        Account: e.get('account'),
        Category: e.get('category'),

    }

    console.log('Hello')
    // fetch('https://api.baserow.io/api/database/rows/table/329805/?user_field_names=true', {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json',
    //         'Authorization': BASEROW_AUTH
    //     },
    //     body: JSON.stringify({ ...data }),
    // })
}

async function getAccounts(){
    'use server'
    const BASEROW_AUTH = process.env.BASEROW_AUTH + ''

    const res = await fetch('https://api.baserow.io/api/database/rows/table/329809/', {
        headers: {
            'Content-type': 'application/json',
            'Authorization': BASEROW_AUTH
        },
    })

    const data = await res.json()
    return data.results
}
  
async function IncomeForm(){
    const accounts = await getAccounts()
    return(
        <div className="py-4">
            <form action={saveData} className="mx-4 p-4 lg:mx-auto max-w-3xl grid gap-4 border rounded">
                <div className="grid gap-2">
                    <Label htmlFor="date">Date Transaction</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input name="date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
                        <Input name="time" type="time" defaultValue={new Date().toTimeString().substring(0,5) } />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <AmountInput />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="account">Account</Label>
                        <Select name="account" >
                            <SelectTrigger className="">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        accounts.map((account: { id: string; field_2419612: string })=>(
                                            <SelectItem key={account.id} value={account.field_2419612}>{account.field_2419612}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Short Description</Label>
                    <div className="grid gap-2">
                        <Textarea name="description" />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category">
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="salary">Salary</SelectItem>
                                <SelectItem value="gift">Gift</SelectItem>
                                <SelectItem value="refund">Refund</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
}