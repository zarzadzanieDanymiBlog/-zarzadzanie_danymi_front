import { getToken } from "common/auth/tokens";
import { ROUTES } from "common/constants/paths";
import { useRouter } from "next/router";
import LayoutWrapper from "common/wrappers/LayoutWrapper";
import Table, { TableProps } from "components/Table";
import { useEffect, useState } from "react";
import axios from "common/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const CmsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState(false);
  const router = useRouter();
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

  const handleDeleteItem = async (itemId: string) => {
    console.log("tutaj bedzie usuwanie");
  };

  return (
    <LayoutWrapper>
      {isLoading ? (
        <CircularProgress />
      ) : isErr ? (
        <Typography>Oops! Wystąpił problem</Typography>
      ) : (
        <Table
          rows={data}
          onEditClick={(id) => router.push(`cms/item/${id}/edit`)}
          onDeleteClick={handleDeleteItem}
        />
      )}
    </LayoutWrapper>
  );
};

export default CmsPage;
