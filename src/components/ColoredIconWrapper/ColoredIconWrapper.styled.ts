import styled, { css } from "styled-components";

export interface StyledDoneIconProps {
  color: string;
}

const getFillColor = css<StyledDoneIconProps>`
  fill: ${({ color }) => color};
`;

export const StyledColoredIconWrapper = styled.span<StyledDoneIconProps>`
  ${getFillColor}
  .MuiSvgIcon-root {
    ${getFillColor};
    & * {
      ${getFillColor};
    }
  }
`;
