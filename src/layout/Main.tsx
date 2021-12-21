import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { PurchaseCartBadge } from "../components/Purchase/CartBadge";
import { useNavigate } from "react-router-dom";

export interface MainLayoutProps {
  children?: JSX.Element|JSX.Element[];
}

export const MainLayout: React.FunctionComponent<MainLayoutProps> = ({
  ...props
}) => {
  const navigate = useNavigate();

  const onClickShoppingCart = () => {
    navigate("/shopping-cart");
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Basic Shopping Brand
          </Typography>
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={onClickShoppingCart}
            color="inherit"
          >
            <PurchaseCartBadge />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Shadow Toolbar */}
      <Toolbar />
      <Container>{props.children || <></>}</Container>
    </>
  );
};

export default Toolbar;
