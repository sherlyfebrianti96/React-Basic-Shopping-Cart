import { Add, AddShoppingCart, Delete, Info, Remove } from "@material-ui/icons";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OptionsColor } from "../../enum/OptionsColor";
import { ProductOptionType } from "../../enum/ProductOptionType";
import { usePurchase } from "../../hooks/usePurchase";
import { Product } from "../../interface/Product";
import { ProductOption } from "../../interface/ProductOption";
import { PurchaseItem } from "../../interface/PurchaseItem";
import { ProductOptions } from "./Options";
import { makeStyles } from "@material-ui/core/styles";

export interface ProductInformationProps {
  item: Product;
  color: string;
  disableColorSelection?: boolean;
}

const useSectionStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export const ProductInformation: React.FunctionComponent<ProductInformationProps> =
  ({ item, color, disableColorSelection = false, ...props }) => {
    const sectionStyles = useSectionStyles();

    const [activeOption, setActiveOption] = useState<ProductOption>(
      item.options[0]
    );

    const navigate = useNavigate();
    const purchase = usePurchase();

    useEffect(() => {
      /* Set Default Color */
      if (!color) {
        navigate(`/products/${item.id}/${item.options[0].color.toString()}`);
      }
    }, [item.id, item.options, navigate, color]);

    useEffect(() => {
      /* Check the User Selected Color with the available Color */
      let colorIsProvided = false;
      let option = item.options[0];
      item.options.forEach((itemOption) => {
        const colorComparator =
          typeof itemOption.color === "object"
            ? itemOption.color[0]
            : itemOption.color;
        if (colorComparator === color) {
          colorIsProvided = true;
          option = itemOption;
        }
      });

      setActiveOption(option);

      if (!colorIsProvided) {
        navigate(`/products/${item.id}/${item.options[0].color.toString()}`);
      }
    }, [item.id, item.options, navigate, color]);

    const onColorChange = (
      evt: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>
    ) => {
      const color = evt.target.value;
      navigate(`/products/${item.id}/${color}`);
    };

    const onAddToCart = () => {
      const purchaseItem: PurchaseItem = {
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        available: item.available,
        weight: item.weight,
        color: activeOption.color,
        [ProductOptionType.Power]: activeOption.power,
        [ProductOptionType.Storage]: activeOption.storage,
        quantity: 1,
      };
      purchase.add(purchaseItem);
    };

    const getQuantityFromStock = (newQuantity: number) => {
      return Math.min(newQuantity, activeOption.quantity);
    };

    const onChangeQuantity = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const quantity = evt.target.value;
      if (productInPurchase) {
        purchase.add({
          ...productInPurchase,
          quantity: getQuantityFromStock(parseInt(quantity)),
        });
      }
    };

    const onIncreaseQuantity = () => {
      if (productInPurchase) {
        purchase.add({
          ...productInPurchase,
          quantity: getQuantityFromStock(productInPurchase.quantity + 1),
        });
      }
    };

    const onDecreaseQuantity = () => {
      if (productInPurchase) {
        purchase.add({
          ...productInPurchase,
          quantity: productInPurchase.quantity - 1,
        });
      }
    };

    const onRemoveFromCart = () => {
      if (productInPurchase) {
        purchase.add({
          ...productInPurchase,
          quantity: 0,
        });
      }
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

    const productInPurchase = purchase.findPurchase(
      item.id,
      activeOption.color.toString()
    );

    return (
      <>
        <Typography variant="h4">{item.name || "Product Detail"}</Typography>
        <Typography variant="h6">
          <small>Provided by</small> {item.brand.toUpperCase()}
        </Typography>

        <Grid container classes={sectionStyles}>
          <Grid item>
            <Typography variant="h5">
              NOK <strong>{priceFormat(item.price)}</strong>,-
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">&nbsp;per piece</Typography>
          </Grid>
        </Grid>

        <Grid container direction="column" spacing={1} classes={sectionStyles}>
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

        <Grid container classes={sectionStyles}>
          <Grid item>
            <FormControl variant="outlined">
              <InputLabel id="select-color-label">Color</InputLabel>
              <Select
                labelId="select-color-label"
                id="select-color"
                value={color}
                label="Color"
                disabled={disableColorSelection}
                onChange={onColorChange}
              >
                {item.options.map((option) => (
                  <MenuItem
                    key={`color-selection-${option.color.toString()}`}
                    value={option.color.toString()}
                  >
                    {option.color.toString().toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {productInPurchase ? (
          <>
            <Grid container classes={sectionStyles}>
              <Grid item>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <IconButton
                      size="small"
                      aria-label="Reduce Purchase Quantity"
                      aria-controls="quantity-reduce"
                      color="inherit"
                      onClick={onDecreaseQuantity}
                    >
                      <Remove />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-quantity"
                      label="Quantity"
                      value={productInPurchase.quantity}
                      onChange={onChangeQuantity}
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      size="small"
                      aria-label="Increase Purchase Quantity"
                      aria-controls="quantity-increase"
                      color="inherit"
                      onClick={onIncreaseQuantity}
                    >
                      <Add />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container classes={sectionStyles}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onRemoveFromCart}
                >
                  <Delete />
                  Remove from cart
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid container classes={sectionStyles}>
            {item.available ? (
              <Grid item data-testid="product-detail-add-to-cart-button">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<AddShoppingCart />}
                  onClick={onAddToCart}
                >
                  Add to cart
                </Button>
              </Grid>
            ) : (
              <Grid item data-testid="product-detail-unavailable-button">
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  endIcon={<Info />}
                >
                  Product is unavailable
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </>
    );
  };

export default Toolbar;
