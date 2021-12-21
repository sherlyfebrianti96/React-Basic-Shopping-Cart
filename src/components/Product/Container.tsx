import { Info, Visibility } from "@material-ui/icons";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { OptionsColor } from "../../enum/OptionsColor";
import { Product } from "../../interface/Product";
import { ProductOptions } from "./Options";
import { makeStyles } from "@material-ui/core/styles";

export interface ProductContainerProps {
  item: Product;
}

const useCardStyles = makeStyles({
  root: {
    boxShadow:
      "0px 2px 3px -1px rgb(0 0 0 / 20%), 0px 1px 3px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
  },
});

const useContainerStyles = makeStyles({
  title: {
    "&:hover": {
      textDecoration: "underline",
    },
    cursor: "pointer",
  },
});

export const ProductContainer: React.FunctionComponent<ProductContainerProps> =
  ({ item, ...props }) => {
    const cardStyle = useCardStyles();
    const containerStyles = useContainerStyles();

    const navigate = useNavigate();

    const onClickDetail = () => {
      navigate(`/products/${item.id}/${item.options[0].color.toString()}`);
    };

    const options = item.options.map((option) => {
      if (typeof option.color === "object") {
        return option.color.map((optionColor: keyof OptionsColor) => (
          <ProductOptions
            key={`product-${item.id}-option-${optionColor.toString()}`}
            color={optionColor}
          />
        ));
      }
      return (
        <ProductOptions
          key={`product-${item.id}-option-${option.color.toString()}`}
          color={option.color as keyof OptionsColor}
        />
      );
    });

    const priceFormat = (price: string | number) => {
      if (typeof price === "string") {
        price = parseInt(price);
      }
      return price.toLocaleString();
    };

    const title = (
      <div className={containerStyles.title} onClick={onClickDetail}>
        {item.name}
      </div>
    );

    return (
      <Card classes={cardStyle}>
        <CardHeader title={title} subheader={item.brand} />
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              NOK <strong>{priceFormat(item.price)}</strong>,- per piece
            </Grid>
            <Grid item>
              <Typography variant="overline">{item.weight} kg</Typography>
            </Grid>
            <Grid item>
              <Typography>{options}</Typography>
            </Grid>
            {!item.available && (
              <Grid item>
                <Grid container spacing={1} style={{ opacity: 0.5 }}>
                  <Grid item>Product is unavailable</Grid>
                  <Grid item>
                    <Info fontSize="small" />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <Button startIcon={<Visibility />} onClick={onClickDetail}>
            Product Detail
          </Button>
        </CardActions>
      </Card>
    );
  };

export default Toolbar;
