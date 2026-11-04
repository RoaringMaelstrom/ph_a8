import Link from "next/link";

import { ICategory } from "@/types/ICategory";
import { IProduct } from "@/types/IProduct";

import CategoryProducts from "@/components/client/CategoryProducts";

const getCategory = async (id: string) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/categories/${id}`, { cache: "force-cache" });
        const data: ICategory = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching category data ", error);
        return null;
    }
}

const getCategoryProducts = async (id: string) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${id}`, { cache: "force-cache" });
        const data: IProduct[] = await res.json();
        return data;

    } catch (error) {
        console.error("Error fetching category products ", error);
        return [];
    }
}

interface CategoryDetailsProps {
    params: Promise<{ id: string }>
}

const CategoryDetailsPage = async ({ params }: CategoryDetailsProps) => {
    const { id } = await params

    const category: ICategory | null = await getCategory(id);
    const products: IProduct[] | null = await getCategoryProducts(id);

    if (category === null) {
        return <div className="flex min-h-screen flex-col items-center text-center justify-center gap-4"><h1 className="text-5xl bg-base-300 p-4 rounded-xl">FAILED TO LOAD CATEGORY</h1>
            <Link href="/"><button className="btn btn-error">Click here to return to home</button></Link></div>;
    }

    if (products.length === 0) {
        return <div className="flex min-h-screen flex-col items-center justify-center gap-4"><h1 className="text-5xl bg-base-300 p-4 rounded-xl">FAILED TO LOAD PRODUCTS</h1>
            <Link href="/"><button className="btn btn-error">Click here to return to home</button></Link></div>;
    }

    return (
        <div className="px-4 md:px-12 lg:px-24 my-12">
            <div className="flex bg-base-200 p-5 rounded-xl">
                <div className="text-6xl">{category.icon}</div>
                <div>
                    <h1 className="font-bold text-3xl">{category.id}</h1>
                    <h1>{products.length} Products and their price changes</h1>
                </div>
            </div>
                <CategoryProducts products={products} />
        </div>
    );
};

export default CategoryDetailsPage;