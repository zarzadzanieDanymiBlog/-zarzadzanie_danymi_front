import axiosInstance from "common/axios";
import { Post } from "../../../types/API";
import { GetStaticProps } from "next";
import LayoutWrapper from "common/wrappers";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface PostPageProps {
  post: Post;
}

const PostPage = ({ post }: PostPageProps) => {
  return (
    <LayoutWrapper>
      <Box p={2} display="flex">
        <Box width="50%" mr={2}>
          <img
            src={post.imageLink}
            alt=""
            style={{
              width: `100%`,
              height: "auto",
            }}
          />
        </Box>
        <Box width="50%">
          <Box
            mb={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{post.title}</Typography>
          </Box>
          <Typography variant="body1">{post.content}</Typography>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mt={2}
          >
            <Box display="flex">
              <Box mr={1}>
                <Typography variant="body2">
                  Utworzonio:
                  {post?.date
                    ? new Date(post?.date).toLocaleDateString()
                    : undefined}
                  {" o "}
                  {post?.date
                    ? new Date(post?.date).toLocaleTimeString()
                    : undefined}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </LayoutWrapper>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const response = await axiosInstance.get<Post[]>("/posts");
  const data = response.data;

  const paths = data.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  try {
    const response = await axiosInstance.get(`/post/${id}`);

    return {
      props: {
        post: response.data,
      },
      revalidate: 1,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
