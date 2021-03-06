import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "components/Button";
import Box from "@material-ui/core/Box";
import Link from "components/Link";
import { ROUTES } from "common/constants/paths";
import { useRouter } from "next/router";
import { removeToken } from "common/auth/tokens";
import { StyledLink } from "./NavBar.styled";
import { getToken } from "common/auth/tokens";

export interface NavBarProps {
  logo: React.ReactNode;
  withLogoutBtn?: boolean;
}
/**
 * Komponent zwracający komponent NavBar znajdujący się na górze strony
 * @param {React.ReactNode}  logo - komponent/napis użyty jako logo
 * @param {boolean}  withLogoutBtn - określa czy wyświetlić przycisk do wylogowania
 * */
function NavBar({ logo, withLogoutBtn }: NavBarProps) {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push(ROUTES.CMS_LOGIN);
  };

  const isLogged = () => {
    if (typeof window !== "undefined") {
      return !getToken();
    } else {
      return false;
    }
  };

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

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            color="primary.contrastText"
          >
            {withLogoutBtn ? (
              <Button color="inherit" onClick={handleLogout}>
                Wyloguj
              </Button>
            ) : (
              <StyledLink href={!!isLogged() ? ROUTES.CMS_LOGIN : ROUTES.CMS}>
                <Typography component="span">
                  {!!isLogged() ? "Zaloguj" : "Panel"}
                </Typography>
              </StyledLink>
            )}
          </Box>
        </Box>
      </AppBar>
    </div>
  );
}

export default NavBar;
