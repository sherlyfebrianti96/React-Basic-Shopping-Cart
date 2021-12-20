import { Grid, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OptionsColor } from "../../enum/OptionsColor";
import { ProductOptionType } from "../../enum/ProductOptionType";
import { Product } from "../../interface/Product";
import { ProductOption } from "../../interface/ProductOption";
import { ProductOptions } from "./Options";

export interface ProductInformationProps {
  item: Product;
  color?: string;
}

export const ProductInformation: React.FunctionComponent<ProductInformationProps> =
  ({ item, ...props }) => {
    const [activeOption, setActiveOption] = useState<ProductOption>(
      item.options[0]
    );

    const navigate = useNavigate();

    useEffect(() => {
      /* Set Default Color */
      if (!props.color) {
        navigate(`/products/${item.id}/${item.options[0].color.toString()}`);
      }
    }, [item.id, item.options, navigate, props.color]);

    useEffect(() => {
      /* Check the User Selected Color with the available Color */
      let colorIsProvided = false;
      let option = item.options[0];
      item.options.forEach((itemOption) => {
        if (typeof itemOption.color === "object") {
          colorIsProvided = itemOption.color[0] === props.color;
        } else {
          colorIsProvided = itemOption.color === props.color;
        }

        if (colorIsProvided) {
          option = itemOption;
        }
      });

      if (colorIsProvided) {
        setActiveOption(option);
      } else {
        navigate(`/products/${item.id}/${item.options[0].color.toString()}`);
      }
    }, [item.id, item.options, navigate, props.color]);

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
      <>
        <Typography variant="h4">{item.name || "Product Detail"}</Typography>
        <Typography variant="h6">
          <small>Provided by</small> {item.brand.toUpperCase()}
        </Typography>

        <Grid container sx={{ marginTop: 3, marginBottom: 3 }}>
          <Grid item>
            <Typography variant="h5">
              NOK <strong>{priceFormat(item.price)}</strong>,-
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">&nbsp;per piece</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="column"
          spacing={1}
          sx={{ marginTop: 3, marginBottom: 3 }}
        >
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>Available Color :</Grid>
              <Grid item>{options}</Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>Weight :</Grid>
              <Grid item>{item.weight} kg</Grid>
            </Grid>
          </Grid>
          {activeOption[ProductOptionType.Power] && (
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>Power :</Grid>
                <Grid item>
                  {activeOption[ProductOptionType.Power]
                    ?.map((power) => `${power} volt`)
                    .join(", ")}
                </Grid>
              </Grid>
            </Grid>
          )}
          {activeOption[ProductOptionType.Storage] && (
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>Storage :</Grid>
                <Grid item>
                  {activeOption[ProductOptionType.Storage]
                    ?.map((storage) => `${storage} GB`)
                    .join(", ")}
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>Item in Stock :</Grid>
              <Grid item>{activeOption.quantity} pcs</Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

export default Toolbar;
