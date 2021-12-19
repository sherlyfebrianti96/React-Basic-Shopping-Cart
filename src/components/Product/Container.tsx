import { Preview } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { OptionsColor } from "../../enum/OptionsColor";
import { Product } from "../../interface/Product";
import { ProductOptions } from "./Options";

export interface ProductContainerProps {
  item: Product;
}

export const ProductContainer: React.FunctionComponent<ProductContainerProps> =
  ({ item, ...props }) => {
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

    return (
      <Card>
        <CardHeader title={item.name} subheader={item.brand} />
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="body1">
                NOK <strong>{priceFormat(item.price)}</strong>,- per piece
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="overline">{item.weight} kg</Typography>
            </Grid>
            <Grid item>
              <Typography>{options}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <Button startIcon={<Preview />}>Product Detail</Button>
        </CardActions>
      </Card>
    );
  };

export default Toolbar;
