import React from "react";
import gql from "graphql-tag";
import { useSubscription } from "urql";
import { Box, Stack } from "@chakra-ui/core";
import IFeed from "types/feed";
import Feed from "components/pages/feeds/feed";
import AddNewFeedForm from "components/pages/feeds/add-new-feed-form";

const feedsSubscription = gql`
  subscription fetchFeeds {
    feeds(order_by: { created_at: desc }) {
      id
      created_at
      body
      author {
        id
        name
        image
      }
    }
  }
`;

const FeedsPageComponent = () => {
  const [result] = useSubscription({
    query: feedsSubscription,
  });

  if (!result.data) {
    return <p>No feeds!</p>;
  }

  return (
    <Stack spacing={8}>
      <Box>
        <AddNewFeedForm />
      </Box>
      {result.data.feeds.map((feed: IFeed) => {
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
