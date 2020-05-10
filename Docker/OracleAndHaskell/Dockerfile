FROM centos:centos7

ARG release=19
ARG update=6

RUN  yum -y install wget && \
     wget http://yum.oracle.com/RPM-GPG-KEY-oracle-ol7 && \
     yum -y install oracle-release-el7 && \
     yum-config-manager --enable ol7_oracle_instantclient && \
     yum -y install oracle-instantclient${release}.${update}-basic && \
     rm -rf /var/cache/yum
