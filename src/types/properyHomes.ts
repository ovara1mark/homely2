export interface PropertyImage {
  src: string;
}

export interface HighlightItem {
  title: string;
  description: string;
  icon: string;
  iconWhite?: string;
}

export interface AmenityItem {
  icon: string;
  label: string;
}

export interface PropertyHomes {
  name: string;
  slug: string;
  location: string;
  rate: string;
  beds: number;
  baths: number;
  area: number;

  images: PropertyImage[];

  category?: string;

  /* Highlights section */
  highlights?: HighlightItem[];

  /* Description paragraphs */
  description?: string[];

  /* Amenities */
  amenities?: AmenityItem[];
}
