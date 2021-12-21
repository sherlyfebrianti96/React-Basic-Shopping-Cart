import { ArrowBack } from "@material-ui/icons";
import { ButtonBase, Link, Theme, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { ProductInformation } from "../components/Product/Information";
import { useProducts } from "../hooks/useProducts";
import { MainLayout } from "../layout/Main";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

const useNavigationStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
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
        <Link>
          <ButtonBase onClick={onClickFindAnotherProduct}>
            <ArrowBack /> Find another products
          </ButtonBase>
        </Link>
      </Typography>
      {product ? (
        <ProductInformation item={product} color={color as string} />
      ) : (
        <h3>Product not found.</h3>
      )}
    </MainLayout>
  );
};
