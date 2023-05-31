FROM node:19-alpine As development

WORKDIR /app

RUN npm i -g pnpm

# Files required by pnpm install
COPY package.json pnpm-lock.yaml .npmrc ./

COPY packages/counter-api/package.json ./packages/counter-api/
COPY packages/counter-common/package.json ./packages/counter-common/

ADD . ./
RUN pnpm install
RUN pnpm build:counter

RUN pnpm --filter=counter-api... --prod deploy pruned
###################
# BUILD FOR PRODUCTION
###################

# FROM node:19-alpine As build

# WORKDIR /app

# COPY package*.json ./

# COPY  --from=development /app/node_modules ./node_modules

# COPY . .

# RUN pnpm run build

# ENV NODE_ENV production

# RUN npm ci --only=production && npm cache clean --force

# USER node

###################
# PRODUCTION
###################

FROM node:19-alpine As counter-api
WORKDIR /app
COPY --from=development /app/pruned .
COPY --chown=node:node --from=development /app/packages/counter-api/dist ./dist
COPY --chown=node:node --from=development /app/packages/counter-common/package.json /packages/counter-common/
COPY --chown=node:node --from=development /app/packages/counter-common/dist /packages/counter-common/dist

CMD [ "node", "dist/main.js" ]
