import Head from "next/head";
import LayoutWrapper from "common/wrappers";
import axios from "common/axios";
import { Post as IPost } from "../../types/API";
import Post from "components/Post";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

const StyledPostWrapper = styled.div`
  margin-right: 0;
  width: 100%;
  max-width: unset;
  margin-bottom: 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    max-width: 300px;
    margin-right: 8px;
    width: 100%;
  }
`;

interface IndexPageProps {
  posts: IPost[];
}

const IndexPage = ({ posts }: IndexPageProps) => {
  return (
    <LayoutWrapper>
      <Head>
        <title>Blog</title>
      </Head>
      <Box display="flex" flexWrap="wrap">
        {posts.map((item) => (
          <StyledPostWrapper key={item.id}>
            <Post {...item} />
          </StyledPostWrapper>
        ))}
      </Box>
    </LayoutWrapper>
  );
};

export default IndexPage;

export async function getServerSideProps() {
  const response = await axios.get("/posts");
  return {
    props: {
      posts: response.data,
    },
  };
}
