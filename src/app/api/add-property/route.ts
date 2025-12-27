import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { PropertyHomes } from "@/types/properyHomes";

export const config = {
  runtime: "node", // needed to use fs
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

    // Handle uploaded images
    const imagesArray: { src: string }[] = [];
    const files = formData.getAll("images") as File[];

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filename = Date.now() + "-" + file.name;
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      imagesArray.push({ src: "/uploads/" + filename });
    }

    // Generate slug
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const newProperty: PropertyHomes = {
      name,
      slug,
      location,
      rate,
      beds,
      baths,
      area,
      images: imagesArray,
      category,
    };

    // Save to JSON
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

    const dataFile = path.join(dataDir, "propertyHomes.json");
    if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]));

    const existing: PropertyHomes[] = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    existing.push(newProperty);
    fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
