export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  warrantyInformation?: string;
  shippingInformation?: string;
  thumbnail: string;
  images: string[];
}

export interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
