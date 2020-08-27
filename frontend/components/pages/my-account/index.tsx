import React, { useEffect, useState, FormEvent } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "urql";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useColorMode,
  Heading,
  Button,
  Grid,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/core";
import Loader from "components/loader";
import { useSession } from "next-auth/client";

const usersQuery = gql`
  query fetchUser($userId: ID!) {
    user(id: $userId) {
      id
      username
    }
  }
`;

const updateUserMutation = gql`
  mutation updateUser($userId: ID!, $username: String) {
    updateUser(
      input: { where: { id: $userId }, data: { username: $username } }
    ) {
      user {
        id
        username
      }
    }
  }
`;

const MyAccountPageComponent = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const [username, setUsername] = useState("");
  const [session] = useSession();

  const [
    { data: fetchUserData, fetching: fetchUserFetching, error: fetchUserError },
  ] = useQuery({
    query: usersQuery,
    variables: {
      userId: session.id,
    },
  });

  useEffect(() => {
    if (fetchUserData) {
      const { username } = fetchUserData.user;

      setUsername(username || "");
    }
  }, [fetchUserData]);

  const [
    { fetching: updateUserFetching, error: updateUserError },
    updateUser,
  ] = useMutation(updateUserMutation);

  if (fetchUserFetching) {
    return <Loader />;
  }

  if (fetchUserError) {
    return <p>Error: {fetchUserError.message}</p>;
  }

  const handleSubmit = () => {
    updateUser({
      userId: session.id,
      username,
    });
  };

  const errorNode = () => {
    if (!updateUserError) {
      return false;
    }

    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{updateUserError}</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  return (
    <Stack spacing={4}>
      <Heading color={color[colorMode]}>My Account</Heading>
      {errorNode()}
      <Grid templateColumns="repeat(1, 1fr)" gap={4}>
        <Box
          p={4}
          bg={bgColor[colorMode]}
          color={color[colorMode]}
          shadow="sm"
          rounded="lg"
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setUsername(e.currentTarget.value)
                }
                isDisabled={updateUserFetching}
              />
            </FormControl>
            <FormControl>
              <Button
                loadingText="Saving..."
                onClick={handleSubmit}
                isLoading={updateUserFetching}
              >
                Save
              </Button>
            </FormControl>
          </Stack>
        </Box>
      </Grid>
    </Stack>
  );
};

export default MyAccountPageComponent;
