import { ArrowBack } from "@mui/icons-material";
import { Button, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import { ProductInformation } from "../components/Product/Information";
import { useProducts } from "../hooks/useProducts";
import { MainLayout } from "../layout/Main";
import { useEffect } from "react";

const useNavigationStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
}));

export const ProductDetailPage = () => {
  const navigationStyles = useNavigationStyles();
  const navigate = useNavigate();

  const products = useProducts();
  const { id, color } = useParams();

  const product = products?.find(
    (product) => product.id.toString() === id?.toString()
  );

  useEffect(() => {
    if (!color) {
      navigate(
        `/products/${product?.id}/${product?.options[0].color.toString()}`
      );
    }
  }, [color, navigate, product?.id, product?.options]);

  const onClickFindAnotherProduct = () => {
    navigate("/products");
  };

  return (
    <MainLayout>
      <Typography classes={navigationStyles}>
        <Button startIcon={<ArrowBack />} onClick={onClickFindAnotherProduct}>
          Find another products
        </Button>
      </Typography>
      {product ? (
        <ProductInformation item={product} color={color as string} />
      ) : (
        <h3>Product not found.</h3>
      )}
    </MainLayout>
  );
};
