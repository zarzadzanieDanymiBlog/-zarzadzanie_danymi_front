import styled, { css } from "styled-components";

interface StyledModalBodyProps {
  maxWidth?: number;
  minWidth?: number;
}

export const StyledModalBody = styled.div<StyledModalBodyProps>`
  background-color: #efefef;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px 24px 16px;
  border-radius: 6px;
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth}px;
    `}
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${minWidth}px;
    `}

  box-shadow: 0px 15px 12px rgba(0, 0, 0, 0.22),
    0px 19px 38px rgba(0, 0, 0, 0.3);
  max-height: 80vh;
  overflow-y: auto;
`;

export const StyledTitleWrapper = styled.div`
  margin-bottom: 4px;
`;
