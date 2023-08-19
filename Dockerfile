FROM ubuntu/postgres:14-22.04_beta

ENV POSTGRES_USER api_admin
ENV POSTGRES_PASSWORD 23b1558b-e246-4f87-89bb-0dda70323c7d
ENV POSTGRES_DB api_db

# Make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install wget
RUN apt-get install -y build-essential libssl-dev
RUN apt-get update && apt-get install -y openssh-client git

ENV NODE_VERSION 20.0.0

# Install nvm with node and npm
RUN wget https://nodejs.org/download/release/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz
RUN tar -xf node-v${NODE_VERSION}-linux-x64.tar.gz
RUN cd node-v${NODE_VERSION}-linux-x64 && cp -R * /usr/local/

RUN git clone https://github.com/pedroldm/coinlab-back-end.git
RUN cd coinlab-back-end && npm install