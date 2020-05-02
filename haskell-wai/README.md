# Yesod Web Framework WAI のサンプル

[Web Application Interface](https://www.yesodweb.com/book/web-application-interface) を参照した。(まんま)  

package.yaml に以下の設定を入れる事  
```
dependencies:
- base >= 4.7 && < 5
- warp
- wai
- http-types
```

### 参照
[Haskellのためのモノイド完全ガイド](https://blog.miz-ar.info/2019/02/monoid-for-haskellers/)

# Yesod でない理由

Yesod 自体はかなり重い。  
[こちらの dokcer イメージ](https://github.com/naliwajek/docker-haskell-yesod)で何とかビルド可能。  
### Dockerfile
```
FROM haskell

WORKDIR /app
ADD . /app

RUN stack setup
RUN stack install yesod-bin --install-ghc
RUN stack build

EXPOSE 3000
```
更に、[こちらの docker イメージ](https://github.com/haskell/docker-haskell)が参照されている。  
```
FROM debian:stretch

RUN apt-get update && \
    apt-get install -y --no-install-recommends gnupg ca-certificates dirmngr && \
    rm -rf /var/lib/apt/lists/*

ARG GHC=8.8.3
ARG STACK=2.1.3
ARG CABAL_INSTALL=3.0

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 427CB69AAC9D00F2A43CAF1CBA3CBA3FFE22B574 && \
    echo 'deb http://downloads.haskell.org/debian stretch main' > /etc/apt/sources.list.d/ghc.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        cabal-install-${CABAL_INSTALL} \
        curl \
        g++ \
        ghc-${GHC} \
        git \
        libsqlite3-dev \
        libtinfo-dev \
        make \
        netbase \
        openssh-client \
        xz-utils \
        zlib1g-dev && \
    rm -rf /var/lib/apt/lists/*

RUN export GNUPGHOME="$(mktemp -d)" && \
    gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys C5705533DA4F78D8664B5DC0575159689BEFB442 && \
    gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys 2C6A674E85EE3FB896AFC9B965101FF31C5C154D && \
    curl -fSL https://github.com/commercialhaskell/stack/releases/download/v${STACK}/stack-${STACK}-linux-x86_64.tar.gz -o stack.tar.gz && \
    curl -fSL https://github.com/commercialhaskell/stack/releases/download/v${STACK}/stack-${STACK}-linux-x86_64.tar.gz.asc -o stack.tar.gz.asc && \
    gpg --batch --trusted-key 0x575159689BEFB442 --verify stack.tar.gz.asc stack.tar.gz && \
    tar -xf stack.tar.gz -C /usr/local/bin --strip-components=1 && \
    /usr/local/bin/stack config set system-ghc --global true && \
    /usr/local/bin/stack config set install-ghc --global false && \
    rm -rf "$GNUPGHOME" /var/lib/apt/lists/* /stack.tar.gz.asc /stack.tar.gz

ENV PATH /root/.cabal/bin:/root/.local/bin:/opt/cabal/${CABAL_INSTALL}/bin:/opt/ghc/${GHC}/bin:$PATH

CMD ["ghci"]
```

