"use client";

import { useState } from "react";

export default function AddPropertyPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Replace your old handleSubmit with this:
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement; // cast to HTMLFormElement
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(form);

    const res = await fetch("/api/add-property", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setSuccess(true);
      form.reset(); // now safe
    } else {
      const data = await res.json();
      alert(data.error || "Failed to add property");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      {success && <p className="text-green-600 mb-2">Property added successfully!</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Name" required className="border p-2" />
        <input type="text" name="location" placeholder="Location" required className="border p-2" />
        <input type="text" name="rate" placeholder="Rate" required className="border p-2" />
        <input type="number" name="beds" placeholder="Beds" required className="border p-2" />
        <input type="number" name="baths" placeholder="Baths" required className="border p-2" />
        <input type="number" name="area" placeholder="Area" required className="border p-2" />
        <select name="category" required className="border p-2">
  <option value="">Select Category</option>
  <option value="Office">Office</option>
  <option value="Luxury Home">Luxury Home</option>
  <option value="Villa">Villa</option>
  <option value="Apartment">Apartment</option>
</select>

        <input type="file" name="images" multiple required className="border p-2" />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
}
