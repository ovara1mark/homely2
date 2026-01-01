import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data/propertyHomes.json");
    const data = fs.readFileSync(filePath, "utf8");
    const properties = JSON.parse(data);

    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load properties" },
      { status: 500 }
    );
  }
}
