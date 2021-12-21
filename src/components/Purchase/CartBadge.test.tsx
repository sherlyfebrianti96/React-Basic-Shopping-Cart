import { render } from "@testing-library/react";
import { PurchaseCartBadge, PurchaseCartBadgeProps } from "./CartBadge";

describe("Purchase > Cart Badge", () => {
  const props: PurchaseCartBadgeProps = {};

  it("should load the component", () => {
    const view = render(<PurchaseCartBadge {...props} />);
    expect(view).toBeTruthy();
  });

	// it('should get Shopping Cart Badges based on number of product');
});
