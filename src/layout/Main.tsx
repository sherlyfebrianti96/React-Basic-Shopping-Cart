import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";

export interface MainLayoutProps {
  children?: ReactElement | Array<ReactElement>;
}

export const MainLayout: React.FunctionComponent<MainLayoutProps> = ({
  ...props
}) => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Basic Shopping Brand
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
          >
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Shadow Toolbar */}
      <Toolbar />
      <Container sx={{ marginBottom: 8 }}>{props.children}</Container>
    </>
  );
};

export default Toolbar;
