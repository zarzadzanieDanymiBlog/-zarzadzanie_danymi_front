import styled from "styled-components";

export const StyledLoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(237, 253, 255, 1) 0%,
    rgba(104, 162, 215, 1) 35%,
    rgba(198, 243, 255, 1) 100%
  );
`;

export const StyledLoginContentWrpaper = styled.div`
  width: 100%;
  max-width: 500px;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  padding: 16px;
  background-color: #ffffff;
  border-radius: 10px;
`;
