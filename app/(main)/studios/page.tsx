import StudioListing from "@/components/Client/StudioListing";
import type { Studio } from "@/components/Card/StudioCard";

const StudiosPage = async () => {
  let studios: Studio[] = [];
  let error = false;

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