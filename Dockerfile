FROM xpub/xpub:base

COPY package.json yarn.lock ./
COPY lerna.json .babelrc .eslintignore .eslintrc .prettierrc .stylelintignore .stylelintrc ./
COPY packages packages

RUN [ "yarn", "config", "set", "workspaces-experimental", "true" ]

# We do a development install because react-styleguidist is a dev dependency
RUN [ "yarn", "install", "--frozen-lockfile" ]

# Remove cache and offline mirror
RUN [ "yarn", "cache", "clean"]
RUN [ "rm", "-rf", "/npm-packages-offline-cache"]


ENV NODE_ENV "development"
WORKDIR ${HOME}/packages/xpub-faraday
RUN [ "npm", "run", "reset", "--username", "admin", "--email", "admin@mailinator.com", "--password", "admin123"]

EXPOSE 3000

# WORKDIR ${HOME}
CMD ["npm", "run", "start-now"]
