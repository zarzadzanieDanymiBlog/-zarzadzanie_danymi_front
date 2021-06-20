import { ButtonProps as MuiButtonProps } from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { StyledCircularProgress, StyledButton } from "./Button.styled";
import { ForwardedRef, forwardRef, ReactNode, useState } from "react";

export interface ButtonProps extends MuiButtonProps {
  onClickPromise?: () => Promise<void>;
  fullWidth?: boolean;
  isLoading?: boolean;
  component?: ReactNode;
}

const Button = forwardRef(
  (
    {
      fullWidth,
      onClickPromise,
      onClick,
      disabled,
      isLoading,
      component,
      ...rest
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [isBtnLoading, setIsBtnLoading] = useState(false);

    const handleBtnClick = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (onClick) {
        onClick(event);
      }

      if (onClickPromise) {
        setIsBtnLoading(true);
        try {
          await onClickPromise();
          setIsBtnLoading(false);
        } catch {
          setIsBtnLoading(false);
        }
      }
    };

    return (
      <Box
        position="relative"
        display={fullWidth ? "block" : "inline-block"}
        width={fullWidth ? "100%" : "auto"}
      >
        <StyledButton
          disabled={disabled || isLoading || isBtnLoading}
          onClick={handleBtnClick}
          style={{
            width: fullWidth ? "100%" : undefined,
          }}
          component={component}
          ref={ref}
          {...rest}
        />
        {(isBtnLoading || isLoading) && (
          <StyledCircularProgress color="primary" size={24} />
        )}
      </Box>
    );
  }
);

export default Button;
