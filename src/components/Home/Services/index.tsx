import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const Categories = () => {
  return (
    <section className="relative w-full md:pr-5">
      <div className="absolute left-0 top-0">
        <Image
          src="/images/categories/Vector.svg"
          alt="vector"
          width={800}
          height={1050}
          className="dark:hidden"
          unoptimized={true}
        />
        <Image
          src="/images/categories/Vector-dark.svg"
          alt="vector"
          width={800}
          height={1050}
          className="hidden dark:block"
          unoptimized={true}
        />
      </div>
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0 relative z-10">
        <div className="grid grid-cols-12 items-center gap-5 md:gap-10">
          <div className="lg:col-span-6 col-span-12">
            <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5">
              <Icon
                icon="ph:house-simple-fill"
                className="text-2xl text-primary "
              />
              Categories
            </p>
            <h2 className="lg:text-52  w-full pr-1 text-[35px] md:text-40 mt-4 mb-2 lg:max-w-full font-medium leading-[1.2] text-dark dark:text-white">
              Explore best properties with expert services.
            </h2>
            <p className="text-dark/50 w-full pr-1 dark:text-white/50 text-lg lg:max-w-full leading-[1.3] md:max-w-3/4">
              Discover a diverse range of premium properties, from luxurious
              apartments to spacious villas, tailored to your needs
            </p>
            <Link
              href="/properties"
              className="py-4 px-1 w-[200px] text-center md:py-4 md:px-8 bg-primary md:text-base leading-4 block md:w-fit text-white rounded-full font-semibold mt-8 hover:bg-dark duration-300"
            >
              View properties
            </Link>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/residential-homes">
                <Image
                  src="/images/categories/villas.jpg"
                  alt="villas"
                  width={680}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              <div className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 lg:top-full flex flex-col justify-between pl-10 pb-10 top-0 lg:group-hover:top-0 md:duration-500">
                <div className="flex justify-end mt-6 mr-6">
                  <Link href="/residential-homes">
                    <div className="bg-white text-dark rounded-full w-fit p-4">
                      <Icon icon="ph:arrow-right" width={24} height={24} />
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">Residential Homes</h3>
                  <p className="text-white/80 text-base leading-6">
                    Step into a residential home where elegance meets comfort,
                    designed for modern living.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/luxury-villa">
                <Image
                  src="/images/categories/luxury-villa.jpg"
                  alt="villas"
                  width={680}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              <div className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 lg:top-full flex flex-col justify-between pl-10 pb-10 top-0 lg:group-hover:top-0 md:duration-500">
                <div className="flex justify-end mt-6 mr-6">
                  <Link href="/luxury-villa">
                    <div className="bg-white text-dark rounded-full w-fit p-4">
                      <Icon icon="ph:arrow-right" width={24} height={24} />
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">Luxury villas</h3>
                  <p className="text-white/80 text-base leading-6">
                    Step into a villa that’s more than a home, a residential
                    home built for luxury, space, and sophistication.{" "}
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-6">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/appartment">
                <Image
                  src="/images/categories/appartment.jpg"
                  alt="villas"
                  width={320}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              <div className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 lg:top-full flex flex-col justify-between pl-10 pb-10 top-0 lg:group-hover:top-0 md:duration-500">
                <div className="flex justify-end mt-6 mr-6">
                  <Link href="/appartment">
                    <div className="bg-white text-dark rounded-full w-fit p-4">
                      <Icon icon="ph:arrow-right" width={24} height={24} />
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">Apartment</h3>
                  <p className="text-white/80 text-base leading-6">
                    Experience modern apartment living, a home designed for
                    comfort, style, and city life.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 col-span-6">
            <div className="relative rounded-2xl overflow-hidden group">
              <Link href="/office-spaces">
                <Image
                  src="/images/categories/office.jpg"
                  alt="office"
                  width={320}
                  height={386}
                  className="w-full"
                  unoptimized={true}
                />
              </Link>
              <div className="absolute w-full h-full bg-gradient-to-b from-black/0 to-black/80 lg:top-full flex flex-col justify-between pl-10 pb-10 top-0 lg:group-hover:top-0 md:duration-500">
                <div className="flex justify-end mt-6 mr-6">
                  <Link href="/office-spaces">
                    <div className="bg-white text-dark rounded-full w-fit p-4">
                      <Icon icon="ph:arrow-right" width={24} height={24} />
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-2xl">Office Spaces</h3>
                  <p className="text-white/80 text-base leading-6">
                    Redefine your office experience: functional, modern, and
                    with the warmth of a residential home.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
