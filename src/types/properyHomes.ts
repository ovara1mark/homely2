export type PropertyHomes = {
  name: string;
  slug: string;
  location: string;
  rate: string;
  beds: number;
  baths: number;
  area: number;
  images: { src: string }[];
  category?: string; // ✅ new field
};


interface PropertyImage {
  src: string;
}
