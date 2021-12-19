import { Product } from "../interface/Product";
import Products from "./../data/Products.json";

interface ProductsData {
  items: Array<Product>;
}

export const useProducts = (): Array<Product> => {
  const data: ProductsData = Products as ProductsData;

  return data.items;
};
