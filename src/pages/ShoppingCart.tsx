import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { ProductInformation } from "../components/Product/Information";
import { useProducts } from "../hooks/useProducts";
import { MainLayout } from "../layout/Main";
import { usePurchase } from "../hooks/usePurchase";
import { Product } from "../interface/Product";

const useNavigationStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
}));

export const ShoppingCartPage = () => {
  const navigationStyles = useNavigationStyles();

  const navigate = useNavigate();
  const purchase = usePurchase();
  const products = useProducts();

  const onClickBackForShopping = () => {
    navigate("/products");
  };

  const purchases = purchase.getAll();

	const totalSHopping = purchases.reduce((acc, item) => (acc + (parseInt(item.price) * item.quantity)), 0)

  return (
    <MainLayout>
      <Typography classes={navigationStyles}>
        <Button startIcon={<ArrowBack />} onClick={onClickBackForShopping}>
          Back for shopping
        </Button>
      </Typography>
      <h1>Shopping Cart</h1>
      {purchases.length > 0 ? (
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {/* <ProductInformation item={purchases[0]} color={color as string} /> */}
              {purchases.map((item) => {
                const product: Product | undefined = products.find(
                  (product) => product.id === item.id
                );
                return product ? (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={`cart-item-${item.id}`}
                  >
                    <Card>
                      <CardContent>
                        <ProductInformation
                          item={product}
                          color={item.color.toString()}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ) : (
                  <></>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 5, marginBottom: 2 }}>
						<Typography variant="h5">Checkout</Typography>
					</Grid>
          <Grid item xs={12} sx={{ marginBottom: 5 }}>
						<Typography variant="h6">Shopping Total : <strong>{totalSHopping.toLocaleString()}</strong></Typography>
					</Grid>
        </Grid>
      ) : (
        <h3>No items in the cart.</h3>
      )}
    </MainLayout>
  );
};
