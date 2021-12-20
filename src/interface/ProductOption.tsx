import { OptionsColor } from "../enum/OptionsColor";
import { ProductOptionType } from "../enum/ProductOptionType";

export interface ProductOption {
	color: keyof OptionsColor | Array<keyof OptionsColor>;
	[ProductOptionType.Power]?: Array<number>;
	[ProductOptionType.Storage]?: Array<string>;
	quantity: number;
}
