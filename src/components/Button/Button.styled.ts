import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiButton, {
  ButtonProps as MuiButtonProps,
} from "@material-ui/core/Button";
import { ReactNode } from "react";

export const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
`;

interface StyledButtonProps extends MuiButtonProps {
  component?: ReactNode;
}

export const StyledButton = styled(MuiButton)<StyledButtonProps>``;
