import styled from "styled-components";

import Link, { LinkProps } from "components/Link";

interface StyledLinkProps extends LinkProps {}

export const StyledLink = styled(Link)<StyledLinkProps>`
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;
