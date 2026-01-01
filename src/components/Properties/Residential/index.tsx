'use client'

import { useEffect, useState } from 'react'
import PropertyCard from '@/components/Home/Properties/Card/Card'

const ResidentialList = () => {
  const [homes, setHomes] = useState<any[]>([])

  useEffect(() => {
    const fetchHomes = async () => {
      const res = await fetch('/api/propertyhomes')
      const data = await res.json()
      setHomes(data)
    }

    fetchHomes()
  }, [])

  return (
    <section className='pt-0!'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
          {homes.slice(0, 3).map((item, index) => (
            <PropertyCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResidentialList
