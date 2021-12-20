import { render } from "@testing-library/react";
import { ProductOptions, ProductOptionsProps } from "./Options";
import Products from "./../../data/Products.json";
import { ProductsData } from "../../interface/data/ProductData";
import { OptionsColor } from "../../enum/OptionsColor";

describe("Product > Options", () => {
  const productData: ProductsData = Products as ProductsData;

  const props: ProductOptionsProps = {
    color: productData.items[0].options[0].color as keyof OptionsColor,
  };

  it("should load the component", () => {
    const view = render(<ProductOptions {...props} />);
    expect(view).toBeTruthy();
  });

	it('should show the Options based on the given color');
});
