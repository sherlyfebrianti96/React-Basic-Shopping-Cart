import { ProductsData } from "../interface/data/ProductData";
import { Product } from "../interface/Product";
import Products from "./../data/Products.json";

export const useProducts = (): Array<Product> => {
  const data: ProductsData = Products as ProductsData;

  return data.items;
};
