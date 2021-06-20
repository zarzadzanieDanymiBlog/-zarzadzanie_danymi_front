import { getToken } from "common/auth/tokens";
import { ROUTES } from "common/constants/paths";
import { useRouter } from "next/router";
import LayoutWrapper from "common/wrappers/LayoutWrapper";
import Table, { TableProps } from "components/Table";
import { useEffect, useState } from "react";
import axios from "common/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import Modal from "components/Modal";
import Button from "components/Button";
import Box from "@material-ui/core/Box";
import Link from "next/link";
const CmsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [deletePostModalData, setisDeletePostModalOpen] = useState({
    isOpen: false,
    postId: "",
  });

  if (typeof window !== "undefined" && !getToken()) {
    router.push(ROUTES.CMS_LOGIN);
  }

  const [data, setData] = useState<TableProps["rows"]>([]);

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get(`/posts`);
      setData(data.data);
      setIsLoading(false);
      setIsErr(false);
    } catch {
      setIsLoading(false);
      setIsErr(true);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleDeleteItem = async (postId: string) => {
    try {
      await axios.delete(`/post/${postId}`);
      enqueueSnackbar("Usunięto!", {
        variant: "success",
      });
      setisDeletePostModalOpen({ isOpen: false, postId: "" });
      await fetchTableData();
    } catch {
      enqueueSnackbar("Wystąpił błąd!", {
        variant: "error",
      });
    }
  };

  return (
    <LayoutWrapper withLogoutBtn>
      {isLoading ? (
        <CircularProgress />
      ) : isErr ? (
        <Typography>Oops! Wystąpił problem</Typography>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Link href={ROUTES.POST_ADD}>
              <Button variant="contained" color="primary" component="a">
                Nowy
              </Button>
            </Link>
          </Box>
          <Table
            rows={data}
            onEditClick={(id) => router.push(ROUTES.EDIT_POST(id))}
            onDeleteClick={(id) =>
              setisDeletePostModalOpen({ isOpen: true, postId: id })
            }
          />
        </>
      )}
      <Modal
        minWidth={480}
        open={deletePostModalData.isOpen}
        onClose={() => setisDeletePostModalOpen({ isOpen: false, postId: "" })}
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
              <Button
                onClick={() =>
                  setisDeletePostModalOpen({ isOpen: false, postId: "" })
                }
              >
                Anuluj
              </Button>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteItem(deletePostModalData.postId)}
            >
              Usuń
            </Button>
          </Box>
        </>
      </Modal>
    </LayoutWrapper>
  );
};

export default CmsPage;
