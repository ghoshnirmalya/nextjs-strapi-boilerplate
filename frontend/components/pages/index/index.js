import { gql, useQuery } from "@apollo/client";
import { Box, Stack } from "@chakra-ui/core";
import Feed from "components/pages/index/feed";
import React from "react";

const feedsQuery = gql`
  query fetchFeeds {
    feeds {
      id
      created_at
      body
      author {
        id
        username
      }
    }
  }
`;

const FeedsPageComponent = () => {
  const { loading, error, data } = useQuery(feedsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.info(data);

  return (
    <Stack spacing={8}>
      {data.feeds.map((feed) => {
        return (
          <Box key={feed.id}>
            <Feed feed={feed} />
          </Box>
        );
      })}
    </Stack>
  );
};

export default FeedsPageComponent;
