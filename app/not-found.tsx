import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-5xl bg-base-300 p-4 rounded-xl">PAGE NOT FOUND</h1>
            <Link href="/"><button className="btn btn-error">Click here to return to home</button></Link>
            </div>
    );
};

export default NotFound;