import { ProductOption } from "./ProductOption";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  available: boolean;
  weight: number;
  options: Array<ProductOption>;
}
