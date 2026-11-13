import { Suspense } from "react";
import { connection } from "next/server";

import StudioListing from "@/components/Client/StudioListing";
import type { Studio } from "@/components/Card/StudioCard";

import StudiosLoading from "./loading";

const StudiosPage = () => {
  return (
    <Suspense fallback={<StudiosLoading />}>
      <StudiosList />
    </Suspense>
  );
};

const StudiosList = async () => {
  let studios: Studio[] = [];
  let error = false;

  // Render at request time; the public listing must never be cached.
  await connection();

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const response = await fetch(`${apiUrl}/studios`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch studios");
    }

    studios = await response.json();
  } catch (err) {
    console.error("Error fetching studios:", err);
    error = true;
  }

  return <StudioListing studios={studios} hasError={error} />;
};

export default StudiosPage;
