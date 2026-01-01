"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation"; // for redirecting
import { supabase } from "@/lib/supabase/browser";

import Image from "next/image";
import QRCode from "react-qr-code";

interface Property {
  name: string;
  slug: string;
  location: string;
  rate: string;
  beds: number;
  baths: number;
  area: number;
  images: { src: string }[];
  description?: string[];
  highlights?: {
    title: string;
    description: string;
    icon: string;
    iconWhite?: string;
  }[];
  amenities?: {
    icon: string;
    label: string;
  }[];
  map?: string;
}

export default function Details() {
  const { slug } = useParams();
  const [item, setItem] = useState<Property | null>(null);
  const [modalData, setModalData] = useState<{
    pay_address: string;
    pay_amount: number;
    pay_currency: string;
  } | null>(null);

  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function init() {
      // Fetch property data
      const res = await fetch("/api/propertyhomes");
      const data: Property[] = await res.json();
      const found = data.find((p) => p.slug === slug);
      setItem(found || null);

      // Fetch current session
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData?.session ?? null);
    }

    init();
  }, [slug]);

  if (!item) return <p>Loading...</p>;

  const handleBuyNow = async () => {
    if (!session) {
      // User not logged in → redirect to signin
      router.push("/signin");
      return;
    }

    const priceUSD = Number(item.rate.replace(/[^0-9]/g, ""));
    const payCurrency = "eth"; // or user-selected

    try {
      const res = await fetch("/api/crypto/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountUSD: priceUSD,
          orderId: item.slug,
          description: `Purchase of ${item.name}`,
          payCurrency,
        }),
      });

      const data = await res.json();

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else if (data.pay_address) {
        setModalData({
          pay_address: data.pay_address,
          pay_amount: data.pay_amount,
          pay_currency: data.pay_currency,
        });
      } else {
        console.error("Payment creation failed:", data);
        alert("Payment creation failed. Check console for details.");
      }
    } catch (err) {
      console.error("Payment request error:", err);
      alert("Payment request failed. Check console for details.");
    }
  };

  const copyToClipboard = () => {
    if (modalData) {
      navigator.clipboard.writeText(modalData.pay_address);
      alert("Address copied to clipboard!");
    }
  };

  return (
    <section className="!pt-44 pb-20 relative">
      <div className="container mx-auto max-w-8xl px-5 2xl:px-0">
        {/* Header */}
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="lg:col-span-8 col-span-12">
            <h1 className="lg:text-52 text-40 font-semibold text-dark dark:text-white">
              {item.name}
            </h1>
            <div className="flex gap-2.5">
              <Icon
                icon="ph:map-pin"
                width={24}
                height={24}
                className="text-dark/50 dark:text-white/50"
              />
              <p className="text-dark/50 dark:text-white/50 text-xm">
                {item.location}
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="flex">
              <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 pr-2 xs:pr-4 mobile:pr-8">
                <Icon icon={"solar:bed-linear"} width={20} height={20} />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {item.beds} Bedrooms
                </p>
              </div>
              <div className="flex flex-col gap-2 border-e border-black/10 dark:border-white/20 px-2 xs:px-4 mobile:px-8">
                <Icon icon={"solar:bath-linear"} width={20} height={20} />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {item.baths} Bathrooms
                </p>
              </div>
              <div className="flex flex-col gap-2 pl-2 xs:pl-4 mobile:pl-8">
                <Icon
                  icon={"lineicons:arrow-all-direction"}
                  width={20}
                  height={20}
                />
                <p className="text-sm mobile:text-base font-normal text-black dark:text-white">
                  {item.area}m<sup>2</sup>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-12 mt-8 gap-8">
          {item.images[0] && (
            <div className="col-span-12 lg:col-span-8 row-span-2">
              <Image
                src={item.images[0].src}
                alt="Main Property Image"
                width={800}
                height={540}
                className="rounded-2xl w-full h-[540px] object-cover"
                unoptimized
              />
            </div>
          )}
          {item.images[1] && (
            <div className="col-span-12 lg:col-span-4 hidden lg:block">
              <Image
                src={item.images[1].src}
                alt="Second Property Image"
                width={400}
                height={540}
                className="rounded-2xl w-full h-[270px] object-cover"
                unoptimized
              />
            </div>
          )}
          {item.images[2] && (
            <div className="col-span-6 lg:col-span-2">
              <Image
                src={item.images[2].src}
                alt="Third Property Image"
                width={400}
                height={270}
                className="rounded-2xl w-full h-[240px] object-cover"
                unoptimized
              />
            </div>
          )}
          {item.images[3] && (
            <div className="col-span-6 lg:col-span-2">
              <Image
                src={item.images[3].src}
                alt="Fourth Property Image"
                width={400}
                height={270}
                className="rounded-2xl w-full h-[240px] object-cover"
                unoptimized
              />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="grid grid-cols-12 gap-8 mt-10">
          <div className="lg:col-span-8 col-span-12">
            <h3 className="text-xl font-medium">Property details</h3>
            {item.highlights && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {item.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-6 border border-black/10 dark:border-white/20 rounded-2xl flex flex-col gap-4"
                  >
                    <Image
                      src={h.icon}
                      alt={h.title}
                      width={40}
                      height={40}
                      className="dark:hidden"
                    />
                    {h.iconWhite && (
                      <Image
                        src={h.iconWhite}
                        alt={h.title}
                        width={40}
                        height={40}
                        className="hidden dark:block"
                      />
                    )}
                    <h4 className="text-lg font-medium">{h.title}</h4>
                    <p className="text-sm text-dark/70 dark:text-white/70">
                      {h.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-5 mt-5">
              {item.description?.map((desc, i) => (
                <p key={i} className="text-dark dark:text-white text-xm">
                  {desc}
                </p>
              ))}
            </div>

            {item.amenities && (
              <div className="mt-12">
                <h3 className="text-xl font-medium mb-6">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {item.amenities.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-dark dark:text-white"
                    >
                      <Icon icon={a.icon} width={22} height={22} />
                      <span className="text-sm">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.location && (
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  item.location
                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="400"
                className="rounded-2xl mt-6"
                loading="lazy"
              />
            )}
          </div>

          {/* Buy Now */}
          <div className="lg:col-span-4 col-span-12 mt-8">
            <div className="bg-primary/10 p-8 rounded-2xl relative z-10 overflow-hidden">
              <h4 className="text-dark text-3xl font-medium dark:text-white">
                {item.rate}
              </h4>
              <p className="text-sm text-dark/50 dark:text-white">
                Discounted Price
              </p>
              <button
                onClick={handleBuyNow}
                className="py-4 px-8 bg-primary text-white rounded-full w-full block text-center hover:bg-dark duration-300 text-base mt-8"
              >
                {session ? "Buy Now" : "Login to Buy"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Crypto Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold mb-4">Send Crypto Payment</h3>
            <p className="mb-2">
              {modalData.pay_amount} {modalData.pay_currency}
            </p>
            <QRCode
              value={modalData.pay_address}
              size={180}
              className="mx-auto mb-4"
            />
            <p className="break-all mb-4">{modalData.pay_address}</p>
            <button
              onClick={copyToClipboard}
              className="bg-primary text-white px-6 py-2 rounded-full mr-2"
            >
              Copy Address
            </button>
            <button
              onClick={() => setModalData(null)}
              className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-6 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
