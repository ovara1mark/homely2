import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";
import { PropertyHomes } from '@/types/properyHomes'

export const config = { api: { bodyParser: false } };

type PropertyHome = PropertyHomes;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const dataFile = path.join(process.cwd(), "data/propertyHomes.json");
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]));

  const form = formidable({ multiples: true, uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files: { images?: File | File[] }) => {
    if (err) return res.status(500).json({ error: "File upload failed" });

    // Validate required fields
    const required = ["name", "location", "rate", "beds", "baths", "area"];
    for (const field of required) {
      if (!fields[field]) return res.status(400).json({ error: `${field} is required` });
    }

    // Handle images
    let imagesArray: { src: string }[] = [];
    if (files.images) {
      const uploadedFiles = Array.isArray(files.images) ? files.images : [files.images];
      uploadedFiles.forEach(file => {
        if (file) imagesArray.push({ src: "/uploads/" + path.basename(file.filepath) });
      });
    } else {
      return res.status(400).json({ error: "At least one image is required" });
    }

    // Generate slug
    const slug = (fields.name as string).toLowerCase().replace(/\s+/g, "-");

    const newProperty: PropertyHome = {
      name: fields.name as string,
      slug,
      location: fields.location as string,
      rate: fields.rate as string,
      beds: Number(fields.beds),
      baths: Number(fields.baths),
      area: Number(fields.area),
      images: imagesArray,
    };

    // Save to JSON
    let existing: PropertyHome[] = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    existing.push(newProperty);
    fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));

    return res.status(201).json(newProperty);
  });
}
