import { FiberManualRecord } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { OptionsColor } from "../../enum/OptionsColor";

export interface ProductOptionsProps {
  color: keyof OptionsColor;
}

export const ProductOptions: React.FunctionComponent<ProductOptionsProps> = ({
  ...props
}) => {
  const color = props.color.toString();
  const optionColor: string = OptionsColor[color as keyof typeof OptionsColor];
  return (
    <Tooltip title={color.toUpperCase()}>
      <FiberManualRecord fontSize="small" sx={{ color: optionColor }} />
    </Tooltip>
  );
};
