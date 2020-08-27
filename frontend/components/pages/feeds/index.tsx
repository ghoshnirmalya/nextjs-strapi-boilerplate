import React from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";
import { Box, Stack } from "@chakra-ui/core";
import IFeed from "types/feed";
import Feed from "components/pages/feeds/feed";
import AddNewFeedForm from "components/pages/feeds/add-new-feed-form";
import Loader from "components/loader";

const feedsQuery = gql`
  query fetchFeeds {
    feeds(sort: "created_at:desc") {
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
  const [
    {
      data: fetchFeedsData,
      fetching: fetchFeedsFetching,
      error: fetchFeedsError,
    },
  ] = useQuery({
    query: feedsQuery,
  });

  if (fetchFeedsFetching) {
    return <Loader />;
  }

  if (fetchFeedsError) {
    return <p>Error: {fetchFeedsError.message}</p>;
  }

  return (
    <Stack spacing={8}>
      <Box>
        <AddNewFeedForm />
      </Box>
      {fetchFeedsData.feeds.map((feed: IFeed) => {
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
