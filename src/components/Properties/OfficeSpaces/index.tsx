"use client";

import { useEffect, useState } from "react";
import PropertyCard from "@/components/Home/Properties/Card/Card";

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

const OfficeSpace: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      const res = await fetch("/api/propertyhomes");
      const data: Property[] = await res.json();

      // ✅ FILTER ONLY OFFICE SPACE
      const officeProperties = data.filter(
        (item) =>
          item.category?.toLowerCase() === "office" ||
          item.category?.toLowerCase() === "office space"
      );

      setProperties(officeProperties);
    }

    fetchProperties();
  }, []);

  return (
    <section className="pt-0!">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {properties.map((item, index) => (
            <div key={index}>
              <PropertyCard item={item} />
            </div>
          ))}
        </div>

        {/* Optional empty state */}
        {properties.length === 0 && (
          <p className="text-center mt-10 text-dark/50">
            No office spaces available yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default OfficeSpace;
