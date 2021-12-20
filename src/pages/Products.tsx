import { Grid } from "@mui/material";
import { ProductContainer } from "../components/Product/Container";
import { useProducts } from "../hooks/useProducts";
import { MainLayout } from "../layout/Main";

export const ProductsPage = () => {
  const products = useProducts();

  return (
    <MainLayout>
      <h1>Products</h1>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`product-container-${product.id}`}
          >
            <ProductContainer item={product} />
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};
