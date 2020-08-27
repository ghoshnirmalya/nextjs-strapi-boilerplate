import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Stack,
  useColorMode,
} from "@chakra-ui/core";
import Loader from "components/loader";
import { useSession } from "next-auth/client";
import React, { FormEvent, useEffect, useState } from "react";

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

  const {
    loading: fetchUserFetching,
    error: fetchUserError,
    data: fetchUserData,
  } = useQuery(usersQuery, {
    variables: { userId: session.id },
  });

  useEffect(() => {
    if (fetchUserData) {
      const { username } = fetchUserData.user;

      setUsername(username || "");
    }
  }, [fetchUserData]);

  const [
    updateUser,
    { loading: updateUserFetching, error: updateUserError },
  ] = useMutation(updateUserMutation);

  if (fetchUserFetching) {
    return <Loader />;
  }

  if (fetchUserError) {
    return <p>Error: {fetchUserError.message}</p>;
  }

  const handleSubmit = () => {
    updateUser({ variables: { userId: session.id, username } });
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
