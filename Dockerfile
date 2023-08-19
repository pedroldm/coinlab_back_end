FROM ubuntu/postgres:14-22.04_beta

ENV POSTGRES_USER api_admin
ENV POSTGRES_PASSWORD 23b1558b-e246-4f87-89bb-0dda70323c7d
ENV POSTGRES_DB api_db

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y build-essential libssl-dev
RUN apt-get update && apt-get install -y openssh-client git

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 20.0.0

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

RUN apt-get install npm -y
    
RUN git clone https://github.com/pedroldm/coinlab-back-end.git
RUN chmod +x coinlab-back-end/start.sh

CMD [ "coinlab-back-end/start.sh" ]