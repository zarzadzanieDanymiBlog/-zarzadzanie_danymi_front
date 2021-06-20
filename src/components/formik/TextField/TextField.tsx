import TextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@material-ui/core/TextField";
import { useField } from "formik";

export interface TextFieldProps
  extends Omit<
    MuiTextFieldProps,
    "name" | "value" | "onChange" | "onBlur" | "error"
  > {
  name: string;
}
/**
 * Komponent zwracający element używany w formularzu do wprowadzania tekstu
 * @extends {MuiTextFieldProps}
 * @param {string}  name - atrybut identyfikujący element do wprowadzania tekstu
 */
const FormikTextField = ({
  name,
  helperText,
  variant = "standard",
  ...rest
}: TextFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      variant={variant}
      error={meta.touched && !!meta.error}
      helperText={(meta.touched && meta.error) || helperText}
      {...rest}
    />
  );
};

export default FormikTextField;
