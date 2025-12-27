import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dataFile = path.join(process.cwd(), "data/propertyHomes.json");

  // Make sure the JSON file exists
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }

  const properties = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  return NextResponse.json(properties);
}
