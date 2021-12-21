import { render } from "@testing-library/react";
import { ProductContainer, ProductContainerProps } from "./Container";
import Products from "./../../data/Products.json";
import { ProductsData } from "../../interface/data/ProductData";
import { useNavigate } from "react-router-dom";

jest.mock('react-router-dom');

describe("Product > Container", () => {
  const productData: ProductsData = Products as ProductsData;

  const props: ProductContainerProps = {
    item: productData.items[0]
  };

  it("should load the component", () => {
    const view = render(<ProductContainer {...props} />);
    expect(view).toBeTruthy();
  });

	// it('should get Shopping Cart Badges based on number of product');

	// it('should show item\'s availability');
	
  // it('should redirect to Product Detail Page when the `Product Detail` button is clicked');
});
