import axiosInstance from "common/axios";
import { Post } from "../../../types/API";
import { GetStaticProps } from "next";
import LayoutWrapper from "common/wrappers";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import Modal from "components/Modal";
import Button from "components/Button";

interface PostPageProps {
  post: Post;
}

const PostPage = ({ post }: PostPageProps) => {
  const [isDeleteNoteModalOpen, setIsDeleteNoteModalOpen] = useState(false);
  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);
  return (
    <LayoutWrapper>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton onClick={() => setIsEditNoteModalOpen(true)}>
          <EditIcon />
        </IconButton>
        <Box ml={1}>
          <IconButton onClick={() => setIsDeleteNoteModalOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
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

      <Modal
        minWidth={480}
        open={isDeleteNoteModalOpen}
        onClose={() => setIsDeleteNoteModalOpen(false)}
      >
        <>
          <Box mb={4}>
            <Typography>
              Czy na pewno chcesz usunąć ten post? Tej operacji nie można
              cofnąć.
            </Typography>
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Box mr={1}>
              <Button onClick={() => setIsDeleteNoteModalOpen(false)}>
                Anuluj
              </Button>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => console.log("dfgf")}
            >
              Usuń
            </Button>
          </Box>
        </>
      </Modal>
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
