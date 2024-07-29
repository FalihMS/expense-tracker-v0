'use client'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "../components/header"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toggleMoneyFormat, toggleNumberFormat } from "../components/util"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"


export default function IncomePage() {
    return (
        <main>
            <Header title={"Transfer Form"} />
            <TransferForm />
            <Toaster />

        </main>
    )
}

const formSchema = z.object({
    date: z.string().min(2, {
        message: "Username cannot be empty",
    }),
    time: z.string(),
    amount: z.string(),
    fee: z.string(),
    fromAccount: z.string().min(1, {
        message: "Account Must be Selected",
    }),
    toAccount: z.string().min(1, {
        message: "Account Must be Selected",
    }),
})

function TransferForm() {
    const [accounts, setAccounts] = useState([])
    const [isSubmitting, setSubmitting] = useState(false);

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: new Date().toISOString().substring(0, 10),
            time: new Date().toTimeString().substring(0, 5),
            amount: "",
            fee: "0",
            fromAccount: "",
            toAccount: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitting(true)

        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        // Post Income / In
        await fetch('/api/transaction', {
            method: 'POST',
            body: JSON.stringify({ 
                type: "Income",
                description: "Transfer In",
                amount: values.amount,
                date: values.date,
                time: values.time,
                account: values.toAccount,
                category: "Transfer In",
            }),
        }).then((res)=>{
            return res.json()
        }).then((data) => {
            toast({
                title: data.message,
            })
            setSubmitting(false)

        })

        // Post Expense / Out
        await fetch('/api/transaction', {
            method: 'POST',
            body: JSON.stringify({ 
                type: "Expense",
                description: "Transfer Out",
                amount: values.amount,
                date: values.date,
                time: values.time,
                account: values.fromAccount,
                category: "Transfer Out",
            }),
        }).then((res) => {
            return res.json()
        }).then((data) => {
            toast({
                title: data.message,
            })
            setSubmitting(false)

        })

        // Post Expense / Out
        if(values.fee !== "0"){
            await fetch('/api/transaction', {
                method: 'POST',
                body: JSON.stringify({ 
                    type: "Expense",
                    description: "Admin Transfer Fee",
                    amount: values.fee,
                    date: values.date,
                    time: values.time,
                    account: values.fromAccount,
                    category: "Fee",
                }),
            }).then((res)=>{
                return res.json()
            }).then((data) => {
                toast({
                    title: data.message,
                })
                setSubmitting(false)
    
            })
        }   
        setSubmitting(false)

    }

    useEffect(function () {
        fetch('/api/account')
            .then((res) => res.json())
            .then((data) => setAccounts(data))
    }, [])

    return (
        <div className="py-4">
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mx-4 p-4 lg:mx-auto max-w-3xl grid gap-4 border rounded">
                    <div className="grid gap-2">

                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Time</FormLabel>
                                        <FormControl>
                                            <Input type="time" placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="fromAccount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>From Account</FormLabel>
                                        <FormControl>
                                            <Select name="account" onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            accounts.map((account: { id: string; field_2419612: string }) => (
                                                                <SelectItem key={account.id} value={account.field_2419612}>{account.field_2419612}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="toAccount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>To Account</FormLabel>
                                        <FormControl>
                                            <Select name="account" onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            accounts.map((account: { id: string; field_2419612: string }) => (
                                                                <SelectItem key={account.id} value={account.field_2419612}>{account.field_2419612}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                        <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onFocus={(e) => form.setValue("amount", toggleNumberFormat(e.target.value))}
                                                onBlur={(e) => form.setValue("amount", toggleMoneyFormat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Transfer Fee</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                onFocus={(e) => form.setValue("fee", toggleNumberFormat(e.target.value))}
                                                onBlur={(e) => form.setValue("fee", toggleMoneyFormat(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                        </div>

                        <div className="grid gap-2">
                            <Button disabled={isSubmitting} type="submit">Submit</Button>
                        </div>

                    </div>
                </form>
            </Form>
        </div>
    )
}