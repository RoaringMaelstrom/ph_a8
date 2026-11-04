import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
    const uri = process.env.BETTER_AUTH_DB_URL;

    if (!uri) {
        return NextResponse.json(
            { message: "MongoDB URL is missing" },
            { status: 500 }
        );
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await client.db("admin").command({ ping: 1 });

        return NextResponse.json({
            message: "MongoDB connection successful",
        });
    } catch (error) {
        console.error("MongoDB connection test failed:", error);

        return NextResponse.json(
            { message: "MongoDB connection failed. Check server logs." },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}
// THIS IS AI GENERATED TO CHECK FOR VERIFYING DATABASE CONNECTION, NOT FOR ANY OTHER OTHER FUNCTIONALITY RELATED TO THE SITE.