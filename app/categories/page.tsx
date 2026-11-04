import CategoryCard from "@/components/Card/CategoryCard";

import { ICategory } from "@/types/ICategory";

import Link from "next/link";

const getCategories = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", { cache: "force-cache" });
        const data: ICategory[] = await res.json();
        return data;

    } catch (error) {
        console.error("error fetching data,", error);
        return [];
    }
}

const CategoriesPage = async () => {
    const categories: ICategory[] = await getCategories();

    if (categories.length === 0) {
        return <div className="flex min-h-screen flex-col items-center justify-center gap-4"><h1 className="text-5xl bg-base-300 p-4 rounded-xl">FAILED TO LOAD PRODUCTS</h1>
            <Link href="/"><button className="btn btn-error">Click here to return to home</button></Link></div>;
    }
    
    return (
        <div className="px-4 md:px-12 lg:px-24 flex flex-col gap-15 py-15">
            <div className="text-5xl">Categories Available</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 ">
                {categories.map((category: ICategory) => (
                    <Link
                        key={category.id}
                        href={`/categories/${category.id}`}>
                        <CategoryCard
                            category={category}
                        />
                    </Link>
                )
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;