import { ShoppingCart } from "@material-ui/icons";
import { Badge, Theme, Toolbar } from "@material-ui/core";
import { usePurchase } from "../../hooks/usePurchase";
import { makeStyles } from "@material-ui/styles";

export interface PurchaseCartBadgeProps {}

const useBadgeStyles = makeStyles((theme: Theme) => ({
  badge: {
    fontSize: theme.spacing(2),
    color: "white",
    border: `1px solid ${theme.palette.warning.main}`,
  },
}));

export const PurchaseCartBadge: React.FunctionComponent<PurchaseCartBadgeProps> =
  ({ ...props }) => {
    const badgeStyles = useBadgeStyles();

    const purchase = usePurchase();

    return (
      <Badge
        badgeContent={purchase.getAll()?.length}
        color="secondary"
        classes={badgeStyles}
      >
        <ShoppingCart />
      </Badge>
    );
  };

export default Toolbar;
