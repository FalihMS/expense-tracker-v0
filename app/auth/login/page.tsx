'use client'
import { Input } from "@/components/ui/input"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast"
import { useSearchParams } from "next/navigation"
import { login } from "@/app/api/auth/action"


export default function IncomePage() {
    return (
        <main>
            <LoginForm />
            <Toaster />
        </main>
    )
}

const formSchema = z.object({
    email: z.string(),
    password: z.string(),
})

function LoginForm() {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const searchParams = useSearchParams()

    useEffect(()=> {
        if(searchParams.get('error')){
            toast({
                title: "Invalid Credential",
                duration: 2000
            })
        }
    }, [searchParams])

    const submitLogin = useCallback(async (formData: FormData) => {
        await login(formData);

        if(searchParams.get('error')){
            toast({
                title: "Invalid Credential",
                duration: 2000
            })
        }

    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
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
                            <Button type="submit">Submit</Button>
                        </div>

                    </div>
                </form>
            </Form>
        </div>
    )
}