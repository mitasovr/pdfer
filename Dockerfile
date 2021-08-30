FROM buildkite/puppeteer:latest

# to place/build/run source code
ARG APP_DIR=/app
WORKDIR ${APP_DIR}

# copy only files required to build application
# to minimize cost of rebuild while changing other files
COPY \
	package.json \
	package-lock.json \
	tsconfig.json \
	${APP_DIR}
RUN npm install

# copy actual source code
COPY pdf_options.ts ${APP_DIR}
COPY src ${APP_DIR}/src

# Set entypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
