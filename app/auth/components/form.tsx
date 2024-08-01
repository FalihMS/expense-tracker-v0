'use client'
import { Input } from "@/components/ui/input"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { redirect, useSearchParams } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useFormStatus } from "react-dom"
import { login, signup } from "@/app/api/auth/action"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const loginFormSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export function LoginForm() {
    const [passwordVisibility, setPasswordVisibility] = useState(false);


    const submitLogin = useCallback(async (formData: FormData) => {
        const { error, message } = await login(formData);
        console.log(message)

        if(error){
            toast({
                title: "Invalid Credential",
                duration: 2000
            })
        }else{
            redirect('/home')

        }
    }, []);

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    return (
        <div className="py-4">
            <Form {...form}>
                <form action={submitLogin} className="mx-4 p-4 lg:mx-auto max-w-3xl grid gap-4 border rounded">
                    <div className="grid gap-2">
                        <div className="py-4">
                            <h2 className="block text-2xl text-center font-medium">Login Form</h2>
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="col-span-11">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type={passwordVisibility ? "text" : "password"} placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button onClick={(e)=> {e.preventDefault(); setPasswordVisibility(!passwordVisibility)}} variant={"outline"} className="self-end mb-2">
                                {
                                    passwordVisibility ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>

                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    )
                                }    
                            </Button>
                        </div>
                        <div className="grid gap-2">
                            <SubmitButton />
                        </div>
                        <LoadingDialog />
                    </div>
                </form>
            </Form>
        </div>
    )
}

const registerFormSchema = z.object({
    fullName: z.string(),
    email: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
})

export function RegisterForm() {
    const [passwordVisibility, setPasswordVisibility] = useState([false, false]);

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    })

    const submitRegister = useCallback(async (formData: FormData) => {

        const { error, message} = await signup(formData);

        if(error){
            toast({
                title: message,
                duration: 2000
            })
        }else{
            redirect('/auth/register/confirm')
        }
        
    }, []);

    return (
        <div className="py-4">
            <Form  {...form}>
                <form  action={submitRegister} className="mx-4 p-4 lg:mx-auto max-w-3xl grid gap-4 border rounded">
                    <div className="grid gap-2">
                        <div className="py-4">
                            <h2 className="block text-2xl text-center font-medium">Register Form</h2>
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="col-span-11">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type={passwordVisibility[0] ? "text" : "password"} placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button onClick={(e)=> {e.preventDefault(); setPasswordVisibility([!passwordVisibility[0], passwordVisibility[1]])}} variant={"outline"} className="self-end mb-2">
                                {
                                    passwordVisibility[0] ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>

                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    )
                                }    
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-12 gap-2">
                            <FormField
                                control={form.control}
                                name="passwordConfirm"
                                render={({ field }) => (
                                    <FormItem className="col-span-11">
                                        <FormLabel>Password Confirmation</FormLabel>
                                        <FormControl>
                                            <Input type={passwordVisibility[1] ? "text" : "password"} placeholder="" {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button onClick={(e)=> {e.preventDefault(); setPasswordVisibility([passwordVisibility[0], !passwordVisibility[1]])}} variant={"outline"} className="self-end mb-2">
                                {
                                    passwordVisibility[1] ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>

                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    )
                                }    
                            </Button>
                        </div>
                        
                        <div className="grid gap-2">
                            <Button type="submit">Submit</Button>
                        </div>

                        <LoadingDialog />

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

function LoadingDialog(){
    const { pending } = useFormStatus()

    return (
        <Dialog open={ pending }>
            <DialogContent autoFocus={false}>
                <DialogHeader>
                    <DialogTitle className="text-center">Loading</DialogTitle>
                    <DialogDescription>
                        
                    </DialogDescription>
                </DialogHeader>
                <svg className="animate-spin h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                        strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            </DialogContent>
        </Dialog>
    )
}
