import { OptionsColor } from "../enum/OptionsColor";
import { ProductOptionType } from "../enum/ProductOptionType";

export interface PurchaseItem {
  /* Product Data */
  id: number;
  name: string;
  brand: string;
  price: string;
  available: boolean;
  weight: number;

  /* Product Option Data */
  color: keyof OptionsColor | Array<keyof OptionsColor>;
  [ProductOptionType.Power]?: Array<number>;
  [ProductOptionType.Storage]?: Array<string>;

  /* Additional Data */
  quantity: number;
}
