<p align="center">
  <img src="https://user-images.githubusercontent.com/6391763/90599044-ca070300-e211-11ea-8b8a-89354dd30bd5.png" alt="Logo"/>
</p>

<p align="center">
  <a href="https://twitter.com/nirmalyaghosh23">
    <img alt="Twitter: Nirmalya Ghosh" src="https://img.shields.io/twitter/follow/NirmalyaGhosh_.svg?style=social" target="_blank" />
  </a>
</p>

This is a boilerplate for building applications using Strapi and Next.js. This boilerplate consists of the following:

1. [**frontend**](https://github.com/ghoshnirmalya/nextjs-strapi-boilerplate/tree/master/frontend): Next.js application
2. [**backend**](https://github.com/ghoshnirmalya/nextjs-strapi-boilerplate/tree/master/backend): Dockerized Strapi application

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Overview](#overview)
- [Requirements](#requirements)
- [Packages](#packages)
  - [1. **Frontend**: Next.js application](#1-frontend-nextjs-application)
  - [2. **Backend**: Dockerized Strapi application](#2-backend-dockerized-strapi-application)
- [Installation](#installation)
  - [1. **Clone the application**](#1-clone-the-application)
  - [2. **Install necessary dependencies for the frontend application**](#2-install-necessary-dependencies-for-the-frontend-application)
  - [3. **Create a .env file and copy the contents from .env.example (present in frontend directory)**](#3-create-a-env-file-and-copy-the-contents-from-envexample-present-in-frontend-directory)
  - [4. **Start the frontend application**](#4-start-the-frontend-application)
  - [5. **Go inside the directory of the backend package on another terminal window**](#5-go-inside-the-directory-of-the-backend-package-on-another-terminal-window)
  - [6. **Start docker-compose**](#6-start-docker-compose)
- [Deployment](#deployment)
  - [Frontend application](#frontend-application)
  - [Backend application](#backend-application)
- [Other interesting repositories](#other-interesting-repositories)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Overview

This boilerplate is built using the following technologies:

1. [Chakra UI](https://chakra-ui.com/)
2. [Emotion](https://emotion.sh/)
3. [GraphQL](https://graphql.org/)
4. [Apollo](https://www.apollographql.com/)
5. [NextAuth](https://next-auth.js.org/)
6. [TypeScript](https://www.typescriptlang.org/)

It supports GraphQL Query and Mutation out of the box.

## Requirements

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/)
3. [Docker](https://www.docker.com/)

## Packages

### 1. [**Frontend**](https://github.com/ghoshnirmalya/nextjs-strapi-boilerplate/tree/master/frontend): Next.js application

This application is the primary user-facing application. Once it’s up and running (see Development section), it’s available on http://localhost:3000/.

### 2. [**Backend**](https://github.com/ghoshnirmalya/nextjs-strapi-boilerplate/tree/master/backend): Dockerized Strapi application

[Strapi](https://strapi.io/) is the leading open-source headless CMS. It’s 100% Javascript, fully customizable and developer-first.

## Installation

### 1. **Clone the application**

```sh
git clone https://github.com/ghoshnirmalya/nextjs-strapi-boilerplate
```

### 2. **Install necessary dependencies for the frontend application**

```sh
cd frontend && yarn install
```

### 3. **Create a .env file and copy the contents from .env.example (present in frontend directory)**

We might need to run the following command:

```sh
source .env
```

### 4. **Create and copy the Google client credentials**

Create a new [Google OAuth Client](https://console.developers.google.com/apis/credentials/oauthclient) and copy the credentials (Client ID and Client Secret) in your .env file.

### 5. **Start the frontend application**

From the frontend directory, we can run the following command to start our Next.js frontend application:

```sh
yarn dev
```

The above command will start the frontend application on [http://localhost:3000/](http://localhost:3000).

### 6. **Go inside the directory of the backend package on another terminal window**

```sh
cd backend
```

### 7. **Start docker-compose**

```sh
docker-compose up
```

We need to start Docker and then run the above command which will change the current directory to the backend package’s directory and then start the backend package. If everything goes well, it’ll be up and running on [http://localhost:1337/graphql](http://localhost:1337/graphql).

### 8. **Configure Strapi**

a. Allow permissions for all operations on the Feed content-type for Authenticated users.

![Authenticated user role](https://user-images.githubusercontent.com/6391763/91742056-40711100-ebd3-11ea-8430-2e09016901ad.png)

![Allow permissions for all operations on the Feed content-type for Authenticated users](https://user-images.githubusercontent.com/6391763/91742068-449d2e80-ebd3-11ea-9830-df26a3bbfed6.png)

b. Allow permissions for all operations on the Feed content-type for Authenticated users as well.

![Allow permissions for all operations on the Feed content-type for Authenticated users as well](https://user-images.githubusercontent.com/6391763/91742071-45ce5b80-ebd3-11ea-8345-abdbf52c7e41.png)

c. Enable the Google provider.

![Enable the Google provider](https://user-images.githubusercontent.com/6391763/91742074-46ff8880-ebd3-11ea-82c8-5a08e3ecf3de.png)

![Enable informations for the Google provider](https://user-images.githubusercontent.com/6391763/91742078-47981f00-ebd3-11ea-97e4-9cd8c2a27f05.png)

d. Click on the "Done" button and now we can log into our Next.js application using our Google account.

## Deployment

### Frontend application

Click on the button below to deploy the frontend application on Vercel. You'll need to [sign up for a free Vercel account](https://vercel.com/signup/).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2Fghoshnirmalya%2Fnextjs-strapi-boilerplate%2Ftree%2Fmaster%2Ffrontend&env=NEXT_PUBLIC_API_URL,NEXT_PUBLIC_DATABASE_URL,NEXTAUTH_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET&project-name=nextjs-strapi-boilerplate&repo-name=nextjs-strapi-boilerplate)

### Backend application

We're still working on it.

## Other interesting repositories

1. [Hasura Next.js Boilerplate](https://github.com/ghoshnirmalya/nextjs-hasura-boilerplate)
2. [Hasura Next.js Trello Clone](https://github.com/ghoshnirmalya/nextjs-hasura-trello-clone)
3. [React Search Box](https://github.com/ghoshnirmalya/react-search-box)
4. [LinkedIn Clone using Create React App](https://github.com/ghoshnirmalya/linkedin-clone-react-frontend)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
