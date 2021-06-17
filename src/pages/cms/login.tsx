import type { NextPage } from "next";
import LoginLayout, { InitialValues } from "layouts/Login";
import { ReactComponent as Logo } from "common/assets/logo.svg";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { ROUTES } from "common/constants/paths";
import { saveToken, getToken } from "common/auth/tokens";
const IndexPage: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (values: InitialValues) => {
    if (values.email === "admin@admin.pl" && values.password === "qwerty") {
      saveToken();
      router.push(ROUTES.CMS);
    } else {
      enqueueSnackbar("Błąd logowania", {
        variant: "error",
      });
    }
  };
  if (typeof window !== "undefined" && getToken()) {
    router.push(ROUTES.CMS);
  }

  return <LoginLayout logo={<Logo />} onSubmit={onSubmit} />;
};

export default IndexPage;
