import { cleanup, render, screen } from "@testing-library/react";
import { ProductDetailPage } from "./ProductDetail";
import * as router from "react-router-dom";
import Products from "./../data/Products.json";
import { ProductsData } from "../interface/data/ProductData";

const productList = (Products as ProductsData).items;

jest.mock("react-router-dom", () => ({
	useNavigate: () => jest.fn(),
  useParams: () => ({ id: "random-id" }),
}));

describe("Pages > ProductDetail", () => {
  it("should load the component", () => {
    const view = render(<ProductDetailPage />);
    expect(view).toBeTruthy();
  });

  it("should show the `product not found` message when the product is unavailable", () => {
    const view = render(<ProductDetailPage />);
    expect(view).toBeTruthy();

    const productUnavailableMessage = screen.getByTestId(
      "product-not-found-message"
    );
    expect(productUnavailableMessage).toBeTruthy();
  });
});
