import { gql, useQuery } from "@apollo/client";
import { Box, Stack } from "@chakra-ui/core";
import Loader from "components/loader";
import AddNewFeedForm from "components/pages/feeds/add-new-feed-form";
import Feed from "components/pages/feeds/feed";
import React from "react";
import IFeed from "types/feed";

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
  const {
    loading: fetchFeedsFetching,
    error: fetchFeedsError,
    data: fetchFeedsData,
  } = useQuery(feedsQuery, { pollInterval: 5000 });

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
