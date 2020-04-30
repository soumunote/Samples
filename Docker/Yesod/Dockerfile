FROM ubuntu
MAINTAINER soumunote <soumunote@gmail.com>

RUN apt update && \
    apt install -y curl vim && \
    curl -sSL https://get.haskellstack.org/ | sh && \
    stack new my-project yesodweb/sqlite && cd my-project && \
    stack build && \
    stack install yesod-bin --install-ghc

EXPOSE 3000
