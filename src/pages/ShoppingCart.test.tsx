import { render } from "@testing-library/react";
import { ShoppingCartPage } from "./ShoppingCart";
import { useNavigate } from "react-router-dom";

jest.mock('react-router-dom');

describe("Pages > ShoppingCart", () => {
  it("should load the component", () => {
    const view = render(<ShoppingCartPage />);
    expect(view).toBeTruthy();
  });

	// it('should be able to go back for shopping when `Back for shopping` button is clicked');

	// it('should show all items in the cart and its Total Amount');
	
	// it('should show `No items in the cart` when the cart is empty');
});
