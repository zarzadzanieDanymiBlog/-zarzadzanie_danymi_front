import LayoutWrapper from "common/wrappers";
import Head from "next/head";
import Postform, { InitialValues, PostformProps } from "components/PostForm";
import { getToken } from "common/auth/tokens";
import { ROUTES } from "common/constants/paths";
import { useRouter } from "next/router";
import axios from "common/axios";
import { useSnackbar } from "notistack";
import { GetServerSideProps } from "next";
import { Post } from "../../../../../types/API";
import Box from "@material-ui/core/Box";
import Button from "components/Button";
import Link from "next/link";

interface EditPostPageProps {
  post: Post;
}

const EditPostPage = ({ post }: EditPostPageProps) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  if (typeof window !== "undefined" && !getToken()) {
    router.push(ROUTES.CMS_LOGIN);
  }

  const initialValues: InitialValues = {
    title: post.title,
    content: post.content,
    imageLink: post.imageLink,
  };

  const handleSubmit: PostformProps["onSubmit"] = async (values) => {
    try {
      await axios.put(`/post/${post.id}`, values);

      enqueueSnackbar("Zaktualizowano!", {
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
      <Box mb={4} display="flex" justifyContent="flex-end">
        <Link href={ROUTES.POST(post.id)}>
          <Button variant="contained" color="primary" component="a">
            Zobacz post
          </Button>
        </Link>
      </Box>
      <Postform
        actionBtnLabel="Edytuj"
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </LayoutWrapper>
  );
};

export default EditPostPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;

  const response = await axios.get(`/post/${id}`);
  return {
    props: {
      post: response.data,
    },
  };
};
