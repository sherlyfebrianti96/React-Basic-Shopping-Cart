import { cleanup, render, screen } from "@testing-library/react";
import { ProductDetailPage } from "./ProductDetail";
import * as router from "react-router-dom";
import Products from "./../data/Products.json";
import { ProductsData } from "../interface/data/ProductData";

const productList = (Products as ProductsData).items;

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: "1", color: "white" }),
}));

describe("Pages > ProductDetail", () => {
  afterEach(() => {
		cleanup();
	})

  it("should load the component", () => {
    const view = render(<ProductDetailPage />);
    expect(view).toBeTruthy();
  });

  describe("should load the Product Detail informations", () => {
    it("should not showing the `product not found` message when there is available product", () => {
      const view = render(<ProductDetailPage />);
      expect(view).toBeTruthy();

      const productUnavailableMessage = screen.queryByTestId(
        "product-not-found-message"
      );
      expect(productUnavailableMessage).toBeNull();
    });
  });

  // it('should show `Product not found` when the Product Detail is not exist');

  // it('should redirect to / using the default color when the Product Color is not found');

  // it('should be able to go to Product List when the `Find another products` is clicked');
});
