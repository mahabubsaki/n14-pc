'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { uploadImage } from '@/utils/uploadImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';


const publisherSchema = z.object({
    name: z.string().min(5, { message: "Publisher name must be at least 5 characters long" }),
    image: z.any().refine(val => {
        if (!val) {
            return false;
        }
        return true;
    }, { message: "Publisher is required" }).refine((val) => {
        if (!['png', 'jpg', 'jpeg'].includes(val?.type?.split('/')[1])) {
            return false;
        }
        return true;
    }, { message: "Please give valid file for your article image" })
});

const DEFAULT_VALUES = {
    name: "",
    image: "",
};

const PublisherForm = ({ callback }) => {
    const form = useForm({
        resolver: zodResolver(publisherSchema),
        defaultValues: DEFAULT_VALUES,
    });
    const router = useRouter();

    let [isPending, startTransition] = useTransition();


    const onSubmit = async (values) => {
        values.image = await uploadImage(values.image);
        startTransition(async () => {

            toast.promise(callback(values), {
                loading: "Adding publisher...",
                success: async (data) => {
                    form.reset();
                    router.push('/');
                    return data.message;
                },
                error: (err) => {
                    return err.message;
                }

            });
        });
    };
    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-4/5  md:w-[600px] mx-auto flex flex-col gap-4'>
                <FormField

                    control={form.control}
                    name={"name"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="title">Publisher Name</FormLabel>
                            <FormControl>
                                <Input {...field} autoComplete="off" name="name" id="name" type="text" placeholder={`Enter Publisher Name`} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                />
                <FormField

                    control={form.control}
                    name={"image"}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (

                            <FormItem>
                                <FormLabel htmlFor="image">Article Image</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={value?.fileName}
                                        onChange={(event) => {

                                            onChange(event.target.files[0]);
                                        }}
                                        type="file"
                                        id="image"
                                        name="image"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        );
                    }}

                />

                <Button disabled={isPending} type="submit">Add</Button>
            </form>

        </Form>
    );
};

export default PublisherForm;