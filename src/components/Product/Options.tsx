import { FiberManualRecord } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
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
      <FiberManualRecord fontSize="small" style={{ color: optionColor }} />
    </Tooltip>
  );
};
