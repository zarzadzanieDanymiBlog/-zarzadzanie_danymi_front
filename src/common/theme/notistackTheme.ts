import { makeStyles } from "@material-ui/core/styles";
import muiTheme from "./theme";
/**
 * zmienna tworząca style dla paczki Notistack
 */
export const useNotistackStyles = makeStyles(() => ({
  success: {
    backgroundColor: `${muiTheme.palette.success.light} !important`,
    color: `${muiTheme.palette.success.contrastText} !important`,
    boxShadow: `0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12),
    0px 6px 10px rgba(0, 0, 0, 0.14)`,
  },
  error: {
    backgroundColor: `${muiTheme.palette.error.light} !important`,
    color: `${muiTheme.palette.error.contrastText} !important`,
    boxShadow: `0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12),
    0px 6px 10px rgba(0, 0, 0, 0.14)`,
  },
  warning: {
    backgroundColor: `${muiTheme.palette.warning.light} !important`,
    color: `${muiTheme.palette.warning.contrastText} !important`,
    boxShadow: `0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12),
    0px 6px 10px rgba(0, 0, 0, 0.14)`,
  },
  info: {
    backgroundColor: `${muiTheme.palette.primary.light} !important`,
    color: `${muiTheme.palette.primary.contrastText} !important`,
    boxShadow: `0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12),
    0px 6px 10px rgba(0, 0, 0, 0.14)`,
  },
}));
