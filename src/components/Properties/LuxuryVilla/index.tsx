"use client";

import PropertyCard from "@/components/Home/Properties/Card/Card";
import { useEffect, useState } from "react";

interface Property {
  name: string;
  slug: string;
  location: string;
  rate: string;
  beds: number;
  baths: number;
  area: number;
  images: { src: string }[];
  category?: string;
}

const LuxuryVillas: React.FC = () => {
  const [propertyHomes, setPropertyHomes] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/propertyhomes");

        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data: Property[] = await res.json();

        // ✅ FILTER ONLY LUXURY VILLAS
        const luxuryVillas = data.filter(
          (item) =>
            item.category?.toLowerCase() === "villa" ||
            item.category?.toLowerCase() === "luxury home" ||
            item.category?.toLowerCase() === "luxury villa"
        );

        setPropertyHomes(luxuryVillas);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <section className="pt-0">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {propertyHomes.map((item, index) => (
            <PropertyCard key={index} item={item} />
          ))}
        </div>

        {propertyHomes.length === 0 && (
          <p className="text-center mt-10 text-dark/50">
            No luxury villas available yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default LuxuryVillas;
