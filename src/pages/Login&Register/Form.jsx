"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import envConfig from "@/configs/env.configs";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

const loginSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" })
});

const registerSchema = z.object({
    username: z.string().min(5, { message: "Username must be at least 5 characters minimum" }).max(20, { message: "Username must be at maxmimum 20 characters" }),
    email: z.string().email({ message: "Please Input a valid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters minimum" }).max(15, { message: "Password must be at maxmimum 15 characters" }).refine((password) => {
        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(password)) {
            return false;
        }
        const lowercaseRegex = /[a-z]/;
        if (!lowercaseRegex.test(password)) {
            return false;
        }
        const digitRegex = /\d/;
        if (!digitRegex.test(password)) {
            return false;
        }
        const specialCharRegex = /[@$!%*?&]/;
        if (!specialCharRegex.test(password)) {
            return false;
        }

        return true;
    }, () => ({ message: "Password should include 1 uppercase,1 lowercase, 1 digit and 1 special chracters" })),
    avatar: z.any().refine(val => {
        if (!val) {
            return false;
        }
        return true;
    }, { message: "Avatar file is required" }).refine((val) => {
        if (!['png', 'jpg', 'jpeg'].includes(val?.type?.split('/')[1])) {
            return false;
        }
        return true;
    }, { message: "Please give valid file for your avatar" })
});

const PROVIDERS = ['github'];

export function LoginRegisterForm({ fields, callback, type }) {
    const session = useSession();
    const router = useRouter();
    let [isPending, startTransition] = useTransition();

    const values = {};
    fields.forEach(each => {
        values[each.name] = "";
    });

    const form = useForm({
        resolver: zodResolver(type === 'register' ? registerSchema : loginSchema),
        defaultValues: values,

    });
    async function onSubmit(values) {
        if (type === 'register') {
            const formData = new FormData();

            formData.append("image", values.avatar);

            const { data: { data: { url } } } = await axios.post(`https://api.imgbb.com/1/upload?key=${envConfig.imgbbApi}`, formData);
            values.avatar = url;
            startTransition(async () => {

                toast.promise(callback(values), {
                    loading: "Signin Up",
                    success: async (data) => {
                        await signIn("credentials", { redirect: false, username: values.username, password: values.password, callbackUrl: "/" });
                        return data.message;
                    },
                    error: (err) => {
                        return err.message;
                    },

                });
            });
        } else {

            toast.promise(signIn("credentials", {
                redirect: false,
                username: values.username,
                password: values.password,
                callbackUrl: "/"
            }), {
                loading: "Signing In...",
                success: (_) => {
                    return 'Successfully signed in';
                },
                error: (_) => {
                    return "Invalid login credentials";
                }
            });

        }
    }


    useEffect(() => {
        if (session.status === 'authenticated') {
            router.push("/");
        }
    }, [session]);
    if (session.status === 'loading') {
        return "Loading...";
    }
    return (
        <div className="w-full flex justify-center">


            <div className="w-4/5  md:w-[600px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {fields.map(each => {
                            return each.name !== "avatar" ? <FormField
                                key={each.name}
                                control={form.control}
                                name={each.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><span className="capitalize">{each.name}</span></FormLabel>
                                        <FormControl>
                                            <Input {...field} autoComplete="off" type={each.type} placeholder={`Enter ${each.name}`} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            /> : <FormField
                                key={each.name}
                                control={form.control}
                                name={"avatar"}
                                render={({ field: { value, onChange, ...field } }) => {
                                    return (

                                        <FormItem>
                                            <FormLabel><span className="capitalize">{each.name}</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={value?.fileName}
                                                    onChange={(event) => {
                                                        onChange(event.target.files[0]);
                                                    }}
                                                    type="file"
                                                    id="avatar"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    );
                                }}

                            />;
                        })}


                        <Button className="w-full" variant="secondary" type="submit">Submit</Button>
                    </form>
                </Form>
                <div className="mt-4 flex gap-4">
                    {
                        PROVIDERS.map(i => <Button className="w-full flex gap-1 bg-black hover:bg-backgrounds-300 border border-backgrounds-500 hover:text-black text-white" key={i} onClick={async () => {


                            toast.promise(signIn(i, {
                                redirect: false,
                                callbackUrl: "/"
                            }), {
                                loading: "Signing In...",
                                success: (_) => {
                                    return 'Successfully signed in';
                                },
                                error: (_) => {
                                    return "Something went wrong";
                                }
                            });

                        }}>
                            <Github size={20} /> <span>Sign In with</span> <span className="capitalize">{i}</span>
                        </Button>)
                    }
                </div>
            </div>
        </div>
    );
}
