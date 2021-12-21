import { render } from "@testing-library/react";
import { ProductInformation, ProductInformationProps } from "./Information";
import Products from "./../../data/Products.json";
import { ProductsData } from "../../interface/data/ProductData";
import { useNavigate } from "react-router-dom";

jest.mock('react-router-dom');

describe("Product > Information", () => {
  const productData: ProductsData = Products as ProductsData;

  const props: ProductInformationProps = {
    item: productData.items[0],
    color: productData.items[0].options[0].color as string,
  };

  it("should load the component", () => {
    const view = render(<ProductInformation {...props} />);
    expect(view).toBeTruthy();
  });

	// it('should show `Add to cart` button when the product is not added yet');
	
  // it('should add the product to the cart when the `Add to cart` button is clicked');

	// describe('should show `Manage Quantity` feature when the product has been added to Cart', () => {
  //   it('should have a proper `Quantity` input');
  //   it('should have a proper `Increase Quantity` button');
  //   it('should have a proper `Decrease Quantity` button');
  //   it('should have a proper `Remove product from the cart` button');
  // });

	// it('should show `item unavailability` when the product is not available');
	
  // it('should redirect to the correct Page using the selected color');

  // it('should remove the product from the cart when the Quantity is Zero');
});
