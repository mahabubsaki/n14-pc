'use client';
import { Button } from '@/components/ui/button';
import { v4 as uuid } from 'uuid';
import ActionMultiSelect from '@/shared/ActionMultiSelect';
import ActionSelect from '@/shared/ActionSelect';
import React, { useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { uploadImage } from '@/utils/uploadImage';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    }));




function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}




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

const MULTI_SELECT_OPTIONS = ['Sports', 'International', 'Space', 'Hollywood', 'Trending'];



const ArticleForm = ({ callback, publishers, article }) => {
    console.log(article);
    const form = useForm({
        resolver: zodResolver(articleSchema),
        defaultValues: DEFAULT_VALUES,

    });
    const router = useRouter();

    let [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);
    const { data } = useSession() || { data: { user: {} } };


    const onSubmit = async (values) => {
        setLoading(true);
        // values.image = await uploadImage(values.image);
        // if (!values.image) return;
        values.image = article.image;
        if (article) {
            values.articleId = article._id;
        } else {
            values.authorId = data.user._id;
        }
        startTransition(async () => {

            toast.promise(callback(values), {
                loading: article ? "Upading Article..." : "Publishing Aricle...",
                success: async (data) => {
                    form.reset();
                    article ? router.push(`/all-articles/${article._id}`) : router.push('/');
                    return data.message;
                },
                error: (err) => {
                    return err.message;
                }, finally: () => {
                    setLoading(false);
                }

            });
        });
    };
    useEffect(() => {
        if (article) {
            (async function saveDefault() {
                const url = await toDataURL(article.image);
                const file = dataURLtoFile(url, `banner-${uuid().slice(5, 20)}.jpg`);
                form.setValue('title', article.title);
                form.setValue('description', article.description);
                form.setValue('image', file);
                form.setValue('publisher', article.publisher);
                form.setValue('tags', article.tags);

            })();


        }
    }, [article]);
    console.log(form.watch());
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

                            <FormItem className="relative">
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
                                        accept=".jpg, .jpeg, .png"
                                    />
                                </FormControl>
                                <FormMessage />
                                <p className=' absolute top-[33px] left-[108px] bg-background h-5 text-sm min-w-[96px]'>{form.watch().image ? form.watch().image.name : 'No file choosen'}</p>
                            </FormItem>

                        );
                    }}

                />
                {form.watch().image ? <AspectRatio ratio={16 / 7} className="bg-muted rounded-md">
                    <Image
                        src={URL.createObjectURL(form.watch().image)}
                        alt={'article-banner'}
                        fill
                        className="rounded-md object-cover"
                    />
                </AspectRatio> : null}
                <FormField

                    control={form.control}
                    name={"publisher"}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="publisher">Article Publisher</FormLabel>
                            <FormControl>
                                <ActionSelect name={"publisher"} field={field} placeholder={'Select Publisher'} fields={publishers} />
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
                                <FormLabel>Article Tags</FormLabel>
                                <FormControl>
                                    <ActionMultiSelect defaults={article?.tags} onChange={(e) => {
                                        const minifiedValues = e?.map(i => i.value);
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
                <Button disabled={isPending || loading} type="submit">Submit</Button>
            </form>

        </Form>

    );
};

export default ArticleForm;