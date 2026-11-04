import Link from "next/link";

import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

import { IProduct } from "@/types/IProduct";

const getProductDetails = async (id: number) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`, { cache: "force-cache" });
        const data: IProduct = await res.json();
        return data;
    } catch (error) {
        console.error("error fetching data ", error);
        return null;
    }
}

interface ProductDetailsProps {
    params: Promise<{ id: number }>
}

const ProductDetailsPage = async ({ params }: ProductDetailsProps) => {
    const { id } = await params

    const productData: IProduct | null = await getProductDetails(id);

    if (productData === null) return (<div className="flex min-h-screen flex-col items-center justify-center gap-4"><h1 className="bg-base-300 p-3 rounded-xl">Failed to fetch productData data</h1><Link href="/"><button className="btn btn-error">Return to Home</button></Link></div>);

    const minPrice: number = Math.min(...productData.markets.map(marketPrice => marketPrice.min));
    const maxPrice: number = Math.max(...productData.markets.map(marketPrice => marketPrice.max));

    const directionText = productData.change.dir === "flat" ? `is the same` : (productData.change.dir === "up" ? `increased 󠁯•󠁏 ${productData.today - productData.yesterday} taka` : `decresed 󠁯•󠁏 ${productData.yesterday - productData.today} taka`);

    return (

        <div className="md:px-12 lg:px-24 px-5 dark:bg-black ">

            {/*Detailed Product Card*/}
            <div className="breadcrumbs breadcrums-secondary text-sm  my-8">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/categories">Category</Link></li>
                    <li><Link href={`/categories/${productData.category}`}>{productData.category}</Link></li>
                    <li><span className="text-green-800">{productData.slug}</span></li>
                </ul>
            </div>

            <div className="bg-base-200  p-3 md:p-10 flex flex-col md:flex-row gap-4 rounded-xl">
                <div className="m-6 flex flex-col md:flex-row gap-4 ">
                    <div className="text-6xl bg-zinc-300 dark:bg-black py-4 mx:auto text-center rounded-xl">{productData.categoryIcon}</div>
                    <div className="text-center md:text-left">
                        <h1 className="font-bold text-3xl">{productData.slug}</h1>
                        <h6 className="opacity-60">per {productData.unit} 󠁯•󠁏 {productData.category}</h6>
                        <h2>{`Relative to yesterday, today's price ${directionText}`}</h2>
                    </div>
                </div>
                <div className="bg-zinc-300 dark:bg-black md:ml-auto p-5 rounded-xl gap-1 text-center items-center flex flex-col">
                    <h2 className="text-sm text-slate-500">{`Today's price`}</h2>
                    <h1 className="text-2xl font-bold">{productData.today}</h1>
                    <h3 className="text-sm text-slate-500">Price per {productData.unit}</h3>
                    <h2 className={`badge badge-soft bg-transparent border-none ${productData.change.dir === "flat" ? ("badge-ghost") : (productData.change.dir === "up" ? "badge-error" : "badge-success")} font-bold`}>
                        {productData.change.dir === "flat" ? ("— ") : (productData.change.dir === "up" ? <FaCaretUp /> : <FaCaretDown />)}
                        {Math.abs(productData.change.pct)} %
                    </h2>
                </div>
            </div>

            {/*Stat section*/}
            <div className="bg-base-200 p-4 md:p-5 my-4 rounded-xl">
                <h1 className="font-bold text-xl text-center md:text-left">Price Summary</h1>
                <div className="flex flex-col md:flex-row gap-4 py-4">
                    <div className="border-2 border-gray-300 w-full md:w-[30%] rounded-xl p-4 mr-auto text-center md:text-left">
                        <h2>Minimum Price</h2>
                        <h1 className="text-emerald-800 text-2xl font-bold">{minPrice} <span className="text-xl font-medium">taka</span></h1>
                        <h2>Lowest available market price</h2>
                    </div>
                    <div className="border-2 border-gray-300 w-full md:w-[30%] rounded-xl p-4 mr-auto text-center md:text-left">
                        <h2>Maximum Price</h2>
                        <h1 className="text-red-700 text-2xl font-bold">{maxPrice} <span className="text-xl font-medium">taka</span></h1>
                        <h2>Maximum available market price</h2>
                    </div>
                    <div className="border-2 border-gray-300 w-full md:w-[30%] rounded-xl p-4 mr-auto text-center md:text-left">
                        <h2>Average Price</h2>
                        <h1 className="text-emerald-800 text-2xl font-bold">{(maxPrice + minPrice) / 2} <span className="text-xl font-medium">taka</span></h1>
                        <h2>Average price per{` - ${productData.unit}`}</h2>
                    </div>
                </div>

                {/*Market Prices Section*/}
                <div className="pt-4">
                    <h1 className="font-bold text-xl">{`Today's Market Prices`}</h1>
                    <div className="my-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                        <section className="w-full rounded-2xl">
                            {/* Desktop / tablet table */}
                            <div className="hidden overflow-hidden rounded-xl border border-emerald-900/10 dark:border-white/10 md:block">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[650px] border-collapse text-left">
                                        <thead className="border-b border-emerald-900/20 text-sm text-zinc-600 dark:border-white/20 dark:text-zinc-300">
                                            <tr>
                                                <th className="px-5 py-4 font-semibold">
                                                    Market
                                                </th>
                                                <th className="px-5 py-4 font-semibold">
                                                    Divison
                                                </th>
                                                <th className="px-5 py-4 text-right font-semibold">
                                                    Minimum
                                                </th>
                                                <th className="px-5 py-4 text-right font-semibold">
                                                    Mamimum
                                                </th>
                                                <th className="px-5 py-4 text-right font-bold text-emerald-700 dark:text-emerald-400">
                                                    Average
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-emerald-900/10 dark:divide-white/10">
                                            {productData.markets.map((item, index) => (
                                                <tr
                                                    key={item.market}
                                                    className={`transition-colors hover:bg-emerald-400/80 dark:hover:bg-green-900/80 ${index % 2 === 0
                                                        ? ""
                                                        : "bg-slate-300 dark:bg-zinc-950"
                                                        }`}
                                                >
                                                    <td className="px-5 py-4 font-medium text-zinc-800 dark:text-zinc-100">
                                                        {item.market}
                                                    </td>

                                                    <td className="px-5 py-4 text-zinc-600 dark:text-zinc-400">
                                                        {item.division}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-right text-zinc-700 dark:text-zinc-300">
                                                        {item.max} taka
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-right text-zinc-700 dark:text-zinc-300">
                                                        {item.max} taka
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-right font-bold text-emerald-700 dark:text-emerald-400">
                                                        {(item.max + item.min) / 2} taka
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Mobile market cards */}
                            <div className="grid grid-cols-1 gap-3 md:hidden">
                                {productData.markets.map((item) => (
                                    <article
                                        key={item.market}
                                        className="rounded-xl border border-emerald-900/10 bg-emerald-50/40 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="break-words font-semibold text-zinc-900 dark:text-zinc-100">
                                                    {item.market}
                                                </h3>
                                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                                    {item.division}
                                                </p>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                    Average Price
                                                </p>
                                                <p className="mt-1 font-bold text-emerald-700 dark:text-emerald-400">
                                                    {(item.max + item.min) / 2} taka
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-between border-t border-emerald-900/10 pt-3 dark:border-white/10">
                                            <div>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Minimum
                                                </p>
                                                <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                    {item.min} taka
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Maximum
                                                </p>
                                                <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                                    {item.max} taka
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default ProductDetailsPage;