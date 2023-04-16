FROM strapi/base

WORKDIR /app

COPY ./app/package.json /app/package.json
COPY ./app/yarn.lock /app/yarn.lock

RUN yarn install

COPY ./app /app/

ENV NODE_ENV development

RUN yarn build

EXPOSE 1337

CMD ["yarn", "develop"]
