"use client";

import { useEffect, useState } from "react";
import PropertyCard from '@/components/Home/Properties/Card/Card';

const PropertiesListing: React.FC = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/api/get-properties")
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className='pt-0!'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
          {properties.map((item: any, index: number) => (
            <PropertyCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PropertiesListing;
