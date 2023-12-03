'use client';
import { Button } from '@/components/ui/button';
import ActionInput from '@/shared/ActionInput';
import ActionMultiSelect from '@/shared/ActionMultiSelect';
import ActionSelect from '@/shared/ActionSelect';
import React from 'react';
import ActionTextArea from '@/shared/ActionTextArea';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';


const articleSchema = z.object({
    title: z.string().min(8, { message: "Article title must be at least 8 characters long" }),
    image: z.any().refine(val => {
        if (!val) {
            return false;
        }
        return true;
    }, { message: "Article image is required" }).refine((val) => {
        if (!['png', 'jpg', 'jpeg'].includes(val?.type?.split('/')[1])) {
            return false;
        }
        return true;
    }, { message: "Please give valid file for your article image" }),
    publisher: z.string().min(1, { message: "Article publisher is required" }),
    tags: z.array(z.string()).nonempty({ message: "Article tags are required" }),
    description: z.string().min(20, { message: "Article description must be at least 20 characters long" })
});

const DEFAULT_VALUES = {
    title: "",
    image: "",
    publisher: "",
    tags: [],
    description: ""
};

const INPUTS = [{ name: "articleTitle", label: "Article Title", type: "text", placeholder: "Enter Article Title" }, { name: "articleImage", label: "Article Image", type: "file", placeholder: "" }];
const MULTI_SELECT_OPTIONS = ['Sports', 'International', 'Space', 'Hollywood', 'Trending'];



const ArticleForm = () => {
    const form = useForm({
        resolver: zodResolver(articleSchema),
        defaultValues: DEFAULT_VALUES,

    });


    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-4/5  md:w-[600px] mx-auto flex flex-col gap-4'>
                <FormField

                    control={form.control}
                    name={"title"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="title">Article Title</FormLabel>
                            <FormControl>
                                <Input {...field} autoComplete="off" name="title" id="title" type="text" placeholder={`Enter Article Title`} />
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
                <FormField

                    control={form.control}
                    name={"publisher"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="publisher">Article Publisher</FormLabel>
                            <FormControl>
                                <ActionSelect name={"publisher"} field={field} placeholder={'Select Publisher'} fields={['Prothom Alo', 'Sunrise']} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                />
                <FormField

                    control={form.control}
                    name={"tags"}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (

                            <FormItem>
                                <FormLabel>Article Image</FormLabel>
                                <FormControl>
                                    <ActionMultiSelect onChange={(e) => {
                                        const minifiedValues = e.map(i => i.value);
                                        onChange(minifiedValues);
                                    }} selectOptions={MULTI_SELECT_OPTIONS} placeholder={'Select Article Tags'} name={'tags'} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        );
                    }}

                />

                <FormField

                    control={form.control}
                    name={"description"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="title">Article Description</FormLabel>
                            <FormControl>

                                <Textarea {...field} autoComplete="off" id={'description'} name={'description'} className="resize-none h-40" placeholder={"Enter article description"} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                />
                <Button type="submit">Submit</Button>
            </form>

        </Form>

    );
};

export default ArticleForm;