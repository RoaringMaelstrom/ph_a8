import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";

export interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  image: string;
  rating?: number;
}

interface StudioCardProps {
  studio: Studio;
}

const StudioCard = ({ studio }: StudioCardProps) => {
  return (
    <Link
      href={`/studios/${studio._id}`}
      className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Studio image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-base-200">
        <div
          role="img"
          aria-label={studio.title}
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url("${studio.image}")` }}
        />

        <span className="absolute left-4 top-4 rounded-full bg-base-100/95 px-3 py-1.5 text-xs font-semibold text-base-content shadow-sm">
          {studio.category}
        </span>

        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-base-100/95 px-2.5 py-1.5 text-sm font-semibold text-base-content shadow-sm">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          {studio.rating?.toFixed(1) ?? "New"}
        </span>
      </div>

      {/* Studio information */}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-base-content transition-colors group-hover:text-primary">
            {studio.title}
          </h3>

          <ArrowUpRight
            size={19}
            className="shrink-0 text-base-content/40 transition-colors group-hover:text-primary"
          />
        </div>

        <p className="mb-4 flex items-center gap-1.5 text-sm text-base-content/60">
          <MapPin size={15} />
          {studio.location}
        </p>

        <div className="flex items-center justify-between border-t border-base-300 pt-4">
          <p className="text-sm text-base-content/60">Starting from</p>

          <p className="font-bold text-base-content">
            ${studio.hourlyRate}
            <span className="ml-1 text-xs font-normal text-base-content/50">
              / hour
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default StudioCard;