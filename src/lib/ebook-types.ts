export interface Ebook {
  id?: string;

  title: string;
  slug: string;
  author: string;
  description: string;
  category: string;

  price: number;

  coverImage: string;

  previewImages: string[];

  driveLink: string;

  active: boolean;

  featured: boolean;

  totalSales: number;

  createdAt: number;
}
