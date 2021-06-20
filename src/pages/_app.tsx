import type { AppProps } from "next/app";
import CreateGlobalStyle from "common/styles/globalStyles.styled";

import { StylesProvider } from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useEffect } from "react";
import theme from "common/theme/theme";
import { SnackbarProvider } from "notistack";
import { useNotistackStyles } from "common/theme/notistackTheme";

export const cache = createCache({ key: "css", prepend: true });

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  const notistackStyles = useNotistackStyles();
  return (
    <CacheProvider value={cache}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <StyledThemeProvider theme={theme}>
            <SnackbarProvider
              maxSnack={5}
              classes={{
                variantSuccess: notistackStyles.success,
                variantError: notistackStyles.error,
                variantWarning: notistackStyles.warning,
                variantInfo: notistackStyles.info,
              }}
            >
              <CreateGlobalStyle />
              <Component {...pageProps} />
            </SnackbarProvider>
          </StyledThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </CacheProvider>
  );
}

export default MyApp;
