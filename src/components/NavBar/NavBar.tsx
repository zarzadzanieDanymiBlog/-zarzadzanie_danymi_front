import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";
import Link from "components/Link";

export interface NavBarProps {
  logo: React.ReactNode;
}
/**
 * Komponent zwracający komponent NavBar znajdujący się na górze strony
 * @param {React.ReactNode}  logo - komponent/napis użyty jako logo
 * */
function NavBar({ logo }: NavBarProps) {
  return (
    <div>
      <AppBar position="static">
        <Box
          display="flex"
          justifyContent="space-between"
          pl={2}
          pr={2}
          pb={1}
          pt={1}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link href="/">{logo}</Link>
            <Box ml={2}>
              <Typography>Blog</Typography>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </div>
  );
}

export default NavBar;
