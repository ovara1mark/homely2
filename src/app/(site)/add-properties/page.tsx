"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

const AMENITIES = [
  { key: "smartHome", label: "Smart Home Integration" },
  { key: "spacious", label: "Spacious Living Areas" },
  { key: "energy", label: "Energy Efficiency" },
  { key: "light", label: "Natural Light" },
  { key: "security", label: "Security Systems" },
  { key: "outdoor", label: "Outdoor Spaces" },
];

export default function AddPropertyPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/signin"); // redirect if not logged in
      } else {
        setUser(data.session.user); // user is logged in
      }
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return; // safeguard

    const form = e.currentTarget;
    const formData = new FormData(form);

    const images = formData.getAll("images") as File[];
    if (images.length > 4) {
      alert("You can upload a maximum of 4 images.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/add-property", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setSuccess(true);
      form.reset();
      setDescriptions([""]);
    } else {
      const data = await res.json();
      alert(data.error || "Failed to add property");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>

      {!user && (
        <p className="text-red-600 mb-4">
          Please sign in to add a property.
        </p>
      )}

      {success && (
        <p className="text-green-600 mb-4">Property added successfully!</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Name"
          required
          className="border p-2"
          disabled={!user}
        />
        <input
          name="location"
          placeholder="Location"
          required
          className="border p-2"
          disabled={!user}
        />
        <input
          name="rate"
          placeholder="Rate"
          required
          className="border p-2"
          disabled={!user}
        />
        <input
          type="number"
          name="beds"
          placeholder="Beds"
          required
          className="border p-2"
          disabled={!user}
        />
        <input
          type="number"
          name="baths"
          placeholder="Baths"
          required
          className="border p-2"
          disabled={!user}
        />
        <input
          type="number"
          name="area"
          placeholder="Area (m²)"
          required
          className="border p-2"
          disabled={!user}
        />

        <select name="category" required className="border p-2" disabled={!user}>
          <option value="">Select Category</option>
          <option value="Office">Office</option>
          <option value="Luxury Home">Luxury Home</option>
          <option value="Villa">Villa</option>
          <option value="Apartment">Apartment</option>
        </select>

        <h3 className="font-semibold mt-4">Property Highlights</h3>
        <textarea
          name="detail_property"
          placeholder="Property details"
          className="border p-2"
          required
          disabled={!user}
        />
        <textarea
          name="detail_smart"
          placeholder="Smart home access"
          className="border p-2"
          required
          disabled={!user}
        />
        <textarea
          name="detail_energy"
          placeholder="Energy efficiency"
          className="border p-2"
          required
          disabled={!user}
        />

        <h3 className="font-semibold mt-4">Description</h3>
        {descriptions.map((desc, index) => (
          <textarea
            key={index}
            name="description"
            value={desc}
            onChange={(e) => {
              const updated = [...descriptions];
              updated[index] = e.target.value;
              setDescriptions(updated);
            }}
            placeholder={`Paragraph ${index + 1}`}
            className="border p-2"
            disabled={!user}
          />
        ))}

        <button
          type="button"
          onClick={() => setDescriptions([...descriptions, ""])}
          className="text-sm text-blue-600"
          disabled={!user}
        >
          + Add another paragraph
        </button>

        <h3 className="font-semibold mt-4">Amenities</h3>
        <div className="grid grid-cols-2 gap-2">
          {AMENITIES.map((a) => (
            <label key={a.key} className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="amenities"
                value={a.key}
                disabled={!user}
              />
              {a.label}
            </label>
          ))}
        </div>

        <h3 className="font-semibold mt-4">Images (Max 4)</h3>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          required
          className="border p-2"
          disabled={!user}
        />

        <button
          type="submit"
          disabled={!user || loading}
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
}
