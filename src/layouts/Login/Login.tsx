import Box from "@material-ui/core/Box";
import { StyledLoginWrapper, StyledLoginContentWrpaper } from "./Login.styled";
import TextField from "components/formik/TextField";
import { Formik, Form } from "formik";
import yup from "common/yup";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import ColoredIconWrapper from "components/ColoredIconWrapper";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";

export interface InitialValues {
  email: string;
  password: string;
}

const loginFormValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const initialValues: InitialValues = {
  email: "",
  password: "",
};

export interface LoginProps {
  logo: React.ReactNode;
  onSubmit: (values: InitialValues) => void;
}

/**
 * @callback onSubmit
 * @param {InitialValues} values
 * @returns {void}
 */

/**
 * Komponent zwracający układ logownaia do panelu administratora
 * @param {SpecialType}  logo - logo
 * @param {onSubmit} onSubmit - funkcja obsługująca formularz logowania
 */
const Login = ({ logo, onSubmit }: LoginProps) => {
  const theme = useTheme();
  return (
    <StyledLoginWrapper>
      <StyledLoginContentWrpaper>
        <Box display="flex" justifyContent="center" mb={2}>
          {logo}
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={loginFormValidationSchema}
        >
          <Form>
            <Box mb={4}>
              <TextField
                type="email"
                name="email"
                label="email"
                placeholder="admin@admin.pl"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ColoredIconWrapper color={theme.palette.primary.main}>
                        <PersonIcon />
                      </ColoredIconWrapper>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mb={4}>
              <TextField
                type="password"
                name="password"
                label="password"
                placeholder="qwerty"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ColoredIconWrapper color={theme.palette.primary.main}>
                        <LockIcon />
                      </ColoredIconWrapper>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mb={4} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                Zaloguj
              </Button>
            </Box>
          </Form>
        </Formik>
      </StyledLoginContentWrpaper>
    </StyledLoginWrapper>
  );
};

export default Login;
