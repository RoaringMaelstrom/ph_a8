import Banner from "@/components/Landing/Banner";
import FeaturedSection from "@/components/Landing/FeaturedSection";
import CategorySelection from "@/components/Landing/CategorySelection";
import HowItWorks from "@/components/Landing/HowItWorks";
import HostGuarentee from "@/components/Landing/HostGuarentee";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedSection />
      <CategorySelection />
      <HowItWorks />
      <HostGuarentee />
    </div>
  );
}