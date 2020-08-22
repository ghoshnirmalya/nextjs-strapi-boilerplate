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
  query fetchUser($userId: uuid!) {
    users_by_pk(id: $userId) {
      id
      name
    }
  }
`;

const updateUserMutation = gql`
  mutation updateUser($userId: uuid!, $name: String) {
    update_users(where: { id: { _eq: $userId } }, _set: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

const MyAccountPageComponent = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "gray.800", dark: "gray.100" };
  const [name, setName] = useState("");
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
      const { name } = fetchUserData.users_by_pk;

      setName(name || "");
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
      name,
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
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={4}
      >
        <Box
          p={4}
          bg={bgColor[colorMode]}
          color={color[colorMode]}
          shadow="sm"
          rounded="lg"
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setName(e.currentTarget.value)
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
