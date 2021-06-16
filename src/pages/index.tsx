import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import LayoutWrapper from "common/wrappers";
import axios from "common/axios";
import { Post } from "../../types/API";

interface IndexPageProps {
  posts: Post[];
}

const IndexPage = ({ posts }: IndexPageProps) => {
  return (
    <LayoutWrapper>
      <Head>
        <title>Blog</title>
      </Head>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </LayoutWrapper>
  );
};

export default IndexPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await axios.get("/posts");
  return {
    props: {
      posts: response.data,
    },
  };
}
