import { OptionsColor } from "../enum/OptionsColor";
import { ProductOptionType } from "../enum/ProductOptionType";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  available: boolean;
  weight: number;
  options: Array<{
    color: keyof OptionsColor | Array<keyof OptionsColor>;
    [ProductOptionType.Power]?: Array<number>;
    [ProductOptionType.Storage]?: Array<string>;
    quantity: number;
  }>;
}
