import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { PropertyHomes } from "@/types/properyHomes";

export const config = { runtime: "node" };

const AMENITIES_MAP = {
  smartHome: { icon: "ph:aperture", label: "Smart Home Integration" },
  spacious: { icon: "ph:chart-pie-slice", label: "Spacious Living Areas" },
  energy: { icon: "ph:television-simple", label: "Energy Efficiency" },
  light: { icon: "ph:sun", label: "Natural Light" },
  security: { icon: "ph:video-camera", label: "Security Systems" },
  outdoor: { icon: "ph:cloud", label: "Outdoor Spaces" },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const location = formData.get("location")?.toString();
    const rate = formData.get("rate")?.toString();
    const beds = Number(formData.get("beds"));
    const baths = Number(formData.get("baths"));
    const area = Number(formData.get("area"));
    const category = formData.get("category")?.toString() || "Other";

    if (!name || !location || !rate || !beds || !baths || !area) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    /* ---------- IMAGES (MAX 4) ---------- */
    const files = formData.getAll("images") as File[];
    if (files.length > 4) {
      return NextResponse.json({ error: "Maximum 4 images allowed" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const images: { src: string }[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      images.push({ src: `/uploads/${filename}` });
    }

    /* ---------- AMENITIES ---------- */
    const amenitiesRaw = formData.getAll("amenities") as string[];
    const amenities = amenitiesRaw
      .map((key) => AMENITIES_MAP[key])
      .filter(Boolean);

    /* ---------- HIGHLIGHTS ---------- */
    const highlights = [
      {
        title: "Property details",
        description: formData.get("detail_property")?.toString() || "",
        icon: "/images/SVGs/property-details.svg",
        iconWhite: "/images/SVGs/property-details-white.svg",
      },
      {
        title: "Smart home access",
        description: formData.get("detail_smart")?.toString() || "",
        icon: "/images/SVGs/smart-home-access.svg",
        iconWhite: "/images/SVGs/smart-home-access-white.svg",
      },
      {
        title: "Energy efficient",
        description: formData.get("detail_energy")?.toString() || "",
        icon: "/images/SVGs/energyefficient.svg",
        iconWhite: "/images/SVGs/energyefficient-white.svg",
      },
    ];

    /* ---------- DESCRIPTION ---------- */
    const description = formData
      .getAll("description")
      .map((d) => d.toString())
      .filter(Boolean);

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const newProperty: PropertyHomes = {
      name,
      slug,
      location,
      rate,
      beds,
      baths,
      area,
      category,
      images,
      highlights,
      description,
      amenities,
    };

    /* ---------- SAVE ---------- */
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

    const filePath = path.join(dataDir, "propertyHomes.json");
    const existing: PropertyHomes[] = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf8"))
      : [];

    existing.push(newProperty);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return NextResponse.json(newProperty, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
