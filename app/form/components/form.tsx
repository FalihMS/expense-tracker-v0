'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toggleMoneyFormat, toggleNumberFormat } from "./util";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { saveExpense, saveIncome, saveTransfer } from "@/app/api/transaction/action";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";

const incomeFormSchema = z.object({
    date: z.string().min(2, {
        message: "Username cannot be empty",
    }),
    time: z.string(),
    amount: z.string(),
    account: z.string().min(1, {
        message: "Account Must be Selected",
    }),
    description: z.string().min(1, {
        message: "Description Cannot be Empty",
    }),
    category: z.string().min(1, {
        message: "Category Must be Selected",
    }),
})

export function IncomeForm(props: { accounts: any[] | undefined }) {
    const { toast } = useToast()
    const searchParams = useSearchParams()

    const form = useForm<z.infer<typeof incomeFormSchema>>({
        resolver: zodResolver(incomeFormSchema),
        defaultValues: {
            date: new Date().toISOString().substring(0, 10),
            time: new Date().toTimeString().substring(0, 5),
            amount: "",
            account: "",
            description: "",
            category: "",
        },
    })

    const saveTransaction = useCallback(async (formData: FormData) => {
        await saveIncome(formData);

        if(searchParams.get('error') == "1"){
            toast({
                title: "Invalid Credential",
                duration: 2000
            })
        }

        toast({
            title: "Transaction Created",
            duration: 2000
        })

    }, [searchParams, toast]);

    return (
        <div className="py-4">
            <Form  {...form}>
                <form action={saveTransaction} className="mx-4 p-4 lg:mx-auto max-w-3xl grid gap-4 border rounded">
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
                                name="account"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account</FormLabel>
                                        <FormControl>
                                            <Select name="account" onValueChange={field.onChange} >
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        props.accounts !== undefined && props.accounts.map((account: any) => (
                                                            <SelectItem key={account.id} value={account.id.toString()}>{account.name}</SelectItem>
                                                        ))
                                                    }   
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select name="category" onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select category" {...field} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="salary">Salary</SelectItem>
                                                        <SelectItem value="gift">Gift</SelectItem>
                                                        <SelectItem value="refund">Refund</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
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
                        
                        <div className="grid gap-2">
                            <SubmitButton />
                        </div>

                    </div>
                </form>
            </Form>
        </div>
    )
}

const expenseFormSchema = z.object({
    date: z.string().min(2, {
        message: "Username cannot be empty",
    }),
    time: z.string(),
    amount: z.string(),
    account: z.string().min(1, {
        message: "Account Must be Selected",
    }),
    description: z.string().min(1, {
        message: "Description Cannot be Empty",
    }),
    category: z.string().min(1, {
        message: "Category Must be Selected",
    }),
})

export function ExpenseForm(props: { accounts: any[] | undefined }){
    const { toast } = useToast()
    const searchParams = useSearchParams()

    const form = useForm<z.infer<typeof expenseFormSchema>>({
        resolver: zodResolver(expenseFormSchema),
        defaultValues: {
            date: new Date().toISOString().substring(0, 10),
            time: new Date().toTimeString().substring(0, 5),
            amount: "",
            account: "",
            description: "",
            category: "",
        },
    })

    const saveTransaction = useCallback(async (formData: FormData) => {
        await saveExpense(formData);

        if(searchParams.get('error') == "1"){
            toast({
                title: "Invalid Credential",
                duration: 2000
            })
        }

        toast({
            title: "Transaction Created",
            duration: 2000
        })

    }, [searchParams, toast]);

    return(
        <div className="py-4">
            <Form  {...form}>
                <form action={saveTransaction} className="mx-4 p-4 lg:mx-auto max-w-3xl grid gap-4 border rounded">
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
                                name="account"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account</FormLabel>
                                        <FormControl>
                                            <Select name="account" onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            props.accounts !== undefined && props.accounts.map((account: any) => (
                                                                <SelectItem key={account.id} value={account.id.toString()}>{account.name}</SelectItem>
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

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select name="category" onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select category" {...field} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="food">Food & Beverages</SelectItem>
                                                        <SelectItem value="transport">Transport</SelectItem>
                                                        <SelectItem value="shopping">Shopping</SelectItem>
                                                        <SelectItem value="entertainment">Entertainment</SelectItem>
                                                        <SelectItem value="utilities">Home Utilities</SelectItem>
                                                        <SelectItem value="gift">Gift</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
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
                        <div className="grid gap-2">
                            <SubmitButton />
                        </div>

                    </div>
                </form>
            </Form>
        </div>
    )
}

const transferFormSchema = z.object({
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

export function TransferForm(props: { accounts: any[] | undefined }) {
    const { toast } = useToast()
    const searchParams = useSearchParams()

    const form = useForm<z.infer<typeof transferFormSchema>>({
        resolver: zodResolver(transferFormSchema),
        defaultValues: {
            date: new Date().toISOString().substring(0, 10),
            time: new Date().toTimeString().substring(0, 5),
            amount: "",
            fee: "0",
            fromAccount: "",
            toAccount: "",
        },
    })

    const saveTransaction = useCallback(async (formData: FormData) => {
        await saveTransfer(formData);

        if(searchParams.get('error') == "1"){
            toast({
                title: "Invalid Credential",
                duration: 2000
            })
        }

        toast({
            title: "Transaction Created",
            duration: 2000
        })

    }, [searchParams, toast]);

    return (
        <div className="py-4">
            <Form  {...form}>
                <form action={saveTransaction} className="mx-4 p-4 lg:mx-auto max-w-3xl grid gap-4 border rounded">
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
                                            <Select name="fromAccount" onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            props.accounts !== undefined && props.accounts.map((account: any) => (
                                                                <SelectItem key={account.id} value={account.id.toString()}>{account.name}</SelectItem>
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
                                            <Select name="toAccount" onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="">
                                                    <SelectValue placeholder="Select Account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            props.accounts !== undefined && props.accounts.map((account: any) => (
                                                                <SelectItem key={account.id} value={account.id.toString()}>{account.name}</SelectItem>
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
                            <SubmitButton />
                        </div>

                    </div>
                </form>
            </Form>
        </div>
    )
}

function SubmitButton(){
    const { pending } = useFormStatus()

    return(
        <Button disabled={pending} type="submit">Submit</Button>
    )
}