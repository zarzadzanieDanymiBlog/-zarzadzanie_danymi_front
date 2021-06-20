import type { NextPage } from "next";
import LayoutWrapper from "common/wrappers";
import Postform, { InitialValues, PostformProps } from "components/PostForm";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useSnackbar } from "notistack";
import axios from "common/axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { getToken } from "common/auth/tokens";
import { ROUTES } from "common/constants/paths";
const initialValues: InitialValues = {
  title: "",
  content: "",
  imageLink: "",
};

const IndexPage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  if (typeof window !== "undefined" && !getToken()) {
    router.push(ROUTES.CMS_LOGIN);
  }

  const handleSubmit: PostformProps["onSubmit"] = async (
    values,
    { resetForm }
  ) => {
    try {
      await axios.post("/post", values);
      resetForm();
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
    <LayoutWrapper withLogoutBtn>
      <Head>
        <title>Blog | Dodaj nowy post</title>
      </Head>
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
