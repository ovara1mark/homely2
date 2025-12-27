"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProperty() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    location: "",
    rate: "",
    beds: 0,
    baths: 0,
    area: 0,
  });
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "beds" || name === "baths" || name === "area" ? Number(value) : value });
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) return alert("Please select at least one image");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value.toString()));
    images.forEach(file => formData.append("images", file));

    const res = await fetch("/api/add-property", { method: "POST", body: formData });

    if (res.ok) {
      alert("Property added successfully!");
      router.push("/");
    } else {
      const data = await res.json();
      alert(data.error || "Failed to add property");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Your Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" required />
        <input name="location" placeholder="Location" onChange={handleChange} className="border p-2 w-full" required />
        <input name="rate" placeholder="Rate" onChange={handleChange} className="border p-2 w-full" required />
        <input name="beds" type="number" placeholder="Beds" onChange={handleChange} className="border p-2 w-full" required />
        <input name="baths" type="number" placeholder="Baths" onChange={handleChange} className="border p-2 w-full" required />
        <input name="area" type="number" placeholder="Area" onChange={handleChange} className="border p-2 w-full" required />
        <input type="file" multiple accept="image/*" onChange={handleFiles} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">Add Property</button>
      </form>
    </div>
  );
}
