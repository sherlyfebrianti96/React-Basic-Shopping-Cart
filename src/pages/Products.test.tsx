import { render, screen } from "@testing-library/react";
import { ProductsPage } from "./Products";
import { useNavigate } from "react-router-dom";
import Products from "./../data/Products.json";
import { ProductsData } from "../interface/data/ProductData";

jest.mock('react-router-dom');

describe("Pages > Products", () => {
  it("should load the component", () => {
    const view = render(<ProductsPage />);
    expect(view).toBeTruthy();
  });

	it('should show all Product List and its availability', () => {
		const productList = (Products as ProductsData).items;
		
    const view = render(<ProductsPage />);
    expect(view).toBeTruthy();

		const productListInView = screen.getAllByTestId('product-item');
		expect(productListInView.length).toEqual(productList.length);
	});
});
