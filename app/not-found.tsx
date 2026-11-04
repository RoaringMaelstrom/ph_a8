
import Link from "next/link";
import { MoveLeft } from "lucide-react";

const NotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-12">

            <div className="w-full max-w-lg rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm sm:p-10">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                    Error 404
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-base-content sm:text-5xl">
                    Page not found
                </h1>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-base-content/65 sm:text-base">
                    {`Sorry, the page you're looking for doesn't exist
                    or may have been moved.`}
                </p>
                <Link
                    href="/"
                    className="btn btn-primary mt-8 inline-flex border-none px-6 font-semibold"
                >
                    <MoveLeft size={18} />
                    Return to home
                </Link>

            </div>
        </main>
    );
};

export default NotFound;
