import { getToken } from "common/auth/tokens";
import { ROUTES } from "common/constants/paths";
import { useRouter } from "next/router";
const CmsPage = () => {
  const router = useRouter();
  if (typeof window !== "undefined" && !getToken()) {
    router.push(ROUTES.CMS_LOGIN);
  }

  return <div>CMS</div>;
};

export default CmsPage;
