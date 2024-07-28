
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import AmountInput from "./components/form"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react"
export default function IncomePage(){
    return(
        <main>
            <Header />
            <IncomeForm />
        </main>
    )
}

function Header(){
    return(
        <div className="py-4 border-b">
            <div className="mx-4 lg:mx-auto max-w-3xl flex justify-between items-center">
                <a href="/" className="border rounded p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </a>

                <h1 className="font-medium">Income Form</h1>
                
                <div className="border rounded p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
            </div>
        </div>
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

    fetch('https://api.baserow.io/api/database/rows/table/329805/?user_field_names=true', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': BASEROW_AUTH
        },
        body: JSON.stringify({ ...data }),
    })
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


function toggleNumberFormat(amount: string){
    return  amount.replace(/[^0-9.-]+/g,"");
}

function toggleMoneyFormat(amount: string){
    if(isNaN(Number(amount))){
        return '0'
    }
    return new Intl.NumberFormat().format(Number(amount))
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
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}