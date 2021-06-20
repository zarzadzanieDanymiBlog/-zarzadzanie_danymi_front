import MuiModal, { ModalProps as MuiModalProps } from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import { StyledModalBody, StyledTitleWrapper } from "./Modal.styled";
import Box from "@material-ui/core/Box";

export interface ModalProps extends MuiModalProps {
  headlineText?: React.ReactNode;
  footerContent?: React.ReactNode;
  maxWidth?: number;
  minWidth?: number;
}

const Modal = ({
  open = false,
  onClose,
  children,
  headlineText,
  footerContent,
  maxWidth,
  minWidth,
  ...rest
}: ModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose} {...rest}>
      <StyledModalBody maxWidth={maxWidth} minWidth={minWidth}>
        {headlineText && (
          <StyledTitleWrapper>
            <Typography variant="h6" color="textPrimary">
              {headlineText}
            </Typography>
          </StyledTitleWrapper>
        )}
        {children}
        {footerContent && (
          <Box display="flex" justifyContent="flex-end" mt={4}>
            {footerContent}
          </Box>
        )}
      </StyledModalBody>
    </MuiModal>
  );
};

export default Modal;
