import { render } from "@testing-library/react";
import { ProductDetailPage } from "./ProductDetail";

describe("Pages > ProductDetail", () => {
  it("should load the component", () => {
    const view = render(<ProductDetailPage />);
    expect(view).toBeTruthy();
  });

	it('should load the Product Detail informations');

	it('should show `Product not found` when the Product Detail is not exist');

	it('should redirect to / using the default color when the Product Color is not found');
	
  it('should be able to go to Product List when the `Find another products` is clicked');
});
