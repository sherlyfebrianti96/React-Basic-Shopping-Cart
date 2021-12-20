import { ShoppingCart } from "@mui/icons-material";
import { Badge, Theme, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef } from "react";
import { usePurchase } from "../../hooks/usePurchase";
import { PurchaseItem } from "../../interface/PurchaseItem";

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
        color="warning"
        classes={badgeStyles}
      >
        <ShoppingCart />
      </Badge>
    );
  };

export default Toolbar;
