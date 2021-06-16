import type { NextPage } from "next";
import LayoutWrapper from "common/wrappers";
import Postform, { InitialValues, PostformProps } from "components/PostForm";

const initialValues: InitialValues = {
  title: "",
  content: "",
};

const IndexPage: NextPage = () => {
  const handleSubmit: PostformProps["onSubmit"] = (values, actions) => {
    console.log({ values });
  };

  return (
    <LayoutWrapper>
      <Postform
        actionBtnLabel="Dodaj"
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </LayoutWrapper>
  );
};

export default IndexPage;
