import type { NextPage } from "next";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

const StyledComp = styled.div`
  width: 100%;
  height: 200px;
  border: 2px solid #c4c4c4;
  border-radius: 4px;
`;

const Test: NextPage = () => {
  return (
    <StyledComp>
      WORKING
      <Button variant="contained" color="primary">
        Click Me!
      </Button>
    </StyledComp>
  );
};

export default Test;
