import type { NextPage } from "next";
import LayoutWrapper from "common/wrappers";
import Postform, { InitialValues, PostformProps } from "components/PostForm";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSnackbar } from "notistack";
import axios from "common/axios";
const initialValues: InitialValues = {
  title: "",
  content: "",
};

const IndexPage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: PostformProps["onSubmit"] = async (values, actions) => {
    try {
      console.log({ values });
      await axios.post("/item", values);
      enqueueSnackbar("Dodano!", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar("Wystąpił błąd!", {
        variant: "error",
      });
    }
  };

  return (
    <LayoutWrapper>
      <Box mb={4}>
        <Typography variant="h3" component="h1">
          Dodaj nowy post
        </Typography>
      </Box>
      <Postform
        actionBtnLabel="Dodaj"
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </LayoutWrapper>
  );
};

export default IndexPage;
