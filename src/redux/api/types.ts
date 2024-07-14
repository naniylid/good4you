export type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  tags: string[];
  images: string[];
  thumbnail: string;
};

export type ProductsResponse = {
  products: Product[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchParams = {
  search: string;
  limit: number;
  q: string;
};

export interface ApiSliceState {
  items: Product[];
  status: Status;
}
