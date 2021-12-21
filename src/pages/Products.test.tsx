import { render } from "@testing-library/react";
import { ProductsPage } from "./Products";
import { useNavigate } from "react-router-dom";

jest.mock('react-router-dom');

describe("Pages > Products", () => {
  it("should load the component", () => {
    const view = render(<ProductsPage />);
    expect(view).toBeTruthy();
  });

	// it('should show all Product List and its availability');
});
