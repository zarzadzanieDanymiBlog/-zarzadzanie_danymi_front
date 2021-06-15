import type { NextPage } from "next";
import Button from "@material-ui/core/Button";

import styled from "styled-components";
import { useEffect } from "react";
import { useCallback } from "react";

import LogoURL, { ReactComponent as Logo } from "common/assets/logo.svg";

const StyledComp = styled.div`
  width: 100%;
  height: 200px;
  border: 2px solid #c4c4c4;
  border-radius: 4px;
`;

const Test = ({ asda = "fg" }: { asda: string }) => {
  const asd = () => {
    console.log({ asda });
  };

  useEffect(() => {
    asd();
    // console.log(asda);
  }, []);

  return (
    <>
      <StyledComp>
        WORKING
        <Button variant="contained" color="primary">
          Click Me!
        </Button>
        <Logo width={50} />
      </StyledComp>
      <img src={LogoURL} alt="" />
    </>
  );
};

export default Test;
