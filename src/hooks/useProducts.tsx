import { Product } from "../interface/Product";
import Products from "./../data/Products.json";

export const useProducts = (): Array<Product> => {
  const data: {
    items: Array<Product>;
  } = Products;

  return data.items;
};
