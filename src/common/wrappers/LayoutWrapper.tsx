import NavBar from "components/NavBar";
import { ReactComponent as Logo } from "common/assets/logo.svg";
import { ReactNode } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Footer from "components/Footer";

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
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <NavBar logo={<Logo height={50} />} />
        <Box flexGrow={1}>
          <Container maxWidth="lg">
            <Box mt={4}>{children}</Box>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default LayoutWrapper;
