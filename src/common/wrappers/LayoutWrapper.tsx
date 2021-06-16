import NavBar from "components/NavBar";
import { ReactComponent as Logo } from "common/assets/logo.svg";
import { ReactNode } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export interface LayoutWrapperProps {
  children: ReactNode;
}

/**
 * Komponent zwracający uzupełniony o podstawowe elementy układ strony
 * @param {React.ReactNode} children - główna zawartość
 * */
const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <>
      <NavBar logo={<Logo />} />
      <Container maxWidth="lg">
        <Box mt={4}>{children}</Box>
      </Container>
    </>
  );
};

export default LayoutWrapper;
