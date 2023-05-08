FROM node:18-buster-slim
ENV HOST 0.0.0.0
RUN mkdir -p /nuxt
COPY . /nuxt
WORKDIR /nuxt
EXPOSE 3000
RUN yarn install
RUN yarn build
CMD ["yarn","start"]
