# Used the slim instead of the alpine because alpine is not officially supported by node 
# slim contains a minimal environment so any other needed package will be installed via the package manager
# the node slim image is based on debian distro , so the used package manager will be apt
FROM node:23-slim

# The environment will default to production , it can be changed to dev at build time
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# The port will default to 3000 , it can be changed at build time
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

# We'll probably need the lates npm regardless of the node version , for speed and fixes
RUN npm i npm@latest -g

# The official node image provide a non-root user as a security best practice , we put
# it at this level so npm install dependencies as the same user who runs the app so when it 
# uses the npm cache , it can find it in the home directory

USER node

# I changed the working directory to the opt , just because i like to follow the og conventions of the file system 
# hierarchy , the opt directory was used as a place to store external softwares , i find it more suitable than /usr/local
# since the last one is used for storing local software that's accessible globaly on the system 

WORKDIR /opt/consomini

# We need to change the permission so we guarantee that we have read and write permissions on them 
COPY --chown=node:node package.json package-lock.json* ./

# I used a mount cache to be able to cache npm packages across builds
RUN --mount=type=cache,target=~/.npm \
    npm ci 

# Changed the ownership of the project context , since we are running the application 
# as the node user
COPY --chown=node:node * ./


# added the healthcheck to check for the operational status of the application , added the --fail option to the curl command
# because by default curl will return 0 status code even if it gets an http error back
HEALTHCHECK --interval=30 \
            --timeout=20 \
            --retries=4 \
            --start-period=0 \ 
            CMD curl --fail localhost:3000 || exit 1

# Run the starting command in a json array form so it doesn't get shell-wrapped , otherwise the shell itself will get the pid 1
# and will become the init process , though it's not the best for the npm to become the init process itself , it's better to use 
# --init option with the docker run in production
CMD ["npm","start"]


