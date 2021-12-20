import { render } from "@testing-library/react";
import { ProductsPage } from "./Products";

describe("Pages > Products", () => {
  it("should load the component", () => {
    const view = render(<ProductsPage />);
    expect(view).toBeTruthy();
  });

	it('should show all Product List and its availability');
});
