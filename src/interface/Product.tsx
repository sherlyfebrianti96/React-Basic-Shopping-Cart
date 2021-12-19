import { ProductOptionType } from "../enum/ProductOptionType";

export interface Product {
  items: Array<{
    id: number;
    name: string;
    brand: string;
    price: string;
    available: boolean;
    weight: number;
    options: Array<{
      color: string | Array<string>;
      [ProductOptionType.Power]?: Array<number>;
      [ProductOptionType.Storage]?: Array<string>;
      quantity: number;
    }>;
  }>;
}
