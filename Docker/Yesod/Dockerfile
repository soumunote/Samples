FROM ubuntu
MAINTAINER soumunote <soumunote@gmail.com>

ENV DEBCONF_NOWARNINGS yes

RUN apt-get update && \
    apt-get install -y curl vim && \
    curl -sSL https://get.haskellstack.org/ | sh && \
    stack new my-project yesodweb/sqlite && cd my-project && \
    stack build && \
    stack install yesod-bin --install-ghc

EXPOSE 3000
