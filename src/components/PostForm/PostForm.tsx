import yup from "common/yup";
import { Formik, FormikHelpers, Form } from "formik";
import TextField from "components/formik/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export interface InitialValues {
  title: string;
  content: string;
}

const validationSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
});

export interface PostformProps {
  onSubmit: (
    values: InitialValues,
    actions: FormikHelpers<InitialValues>
  ) => void;
  initialValues: InitialValues;
  actionBtnLabel: string;
}

const PostForm = ({
  actionBtnLabel,
  initialValues,
  onSubmit,
}: PostformProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Box mb={4}>
          <TextField type="text" name="title" label="Tytuł" fullWidth />
        </Box>
        <Box mb={4}>
          <TextField
            type="text"
            name="content"
            label="Opis"
            multiline
            rows={10}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box mb={4} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" type="submit">
            {actionBtnLabel}
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default PostForm;
