import envConfig from "@/configs/env.configs";
import dbConnect from "@/db";
import Article from "@/modules/articles/articles.model";
import Publisher from "@/modules/publishers/publishers.model";
import ArticleForm from "@/pagesx/AddArticle/ArticleForm";
import hydrateData from "@/utils/hydrateData";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";





const AddArticles = async () => {
    const session = await getServerSession();

    const headerList = headers();
    const currentPath = headerList.get('referer')?.split(envConfig.baseUrl)[1];

    if (!session?.user) {
        return redirect(`/login?redirect=${currentPath}`);
    }
    await dbConnect();
    const publishers = await Publisher.find({}, { name: 1 });
    const data = hydrateData(publishers);


    async function addArticle(values) {
        "use server";
        try {
            await dbConnect();

            const articleData = { ...values, authorEmail: session.user?.email };
            await Article.create(articleData);
            revalidatePath('/');
            return { message: "Successfully added the article" };
        } catch (err) {

            throw new Error(err);
        }

    }

    return (
        <div>
            <h1 className='text-3xl text-center font-bold'>Add Articles</h1>
            <ArticleForm publishers={data} callback={addArticle} />
        </div>
    );
};

export default AddArticles;