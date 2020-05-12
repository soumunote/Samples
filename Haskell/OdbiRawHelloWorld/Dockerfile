FROM centos:centos7

ARG release=19
ARG update=6

RUN  yum install -y wget && \
     yum groupinstall -y "Development Tools"
     
RUN  cd /etc/yum.repos.d && \
     wget http://yum.oracle.com/public-yum-ol7.repo && \
     wget http://yum.oracle.com/RPM-GPG-KEY-oracle-ol7 && \
     rpm --import RPM-GPG-KEY-oracle-ol7 && \ 
     yum install -y yum-utils && \
     yum-config-manager --enable ol7_oracle_instantclient && \
     yum -y install oracle-instantclient${release}.${update}-basic

#RUN  yum -y remove git && \
#     yum -y install https://centos7.iuscommunity.org/ius-release.rpm && \
#     yum -y install git2u yum-utils && \
#     yum-config-manager --disable ius

RUN  rm -rf /var/cache/yum

RUN  curl -sSL https://get.haskellstack.org/ | sh && \
     cd ~ && \
     stack new odpi-raw-hello-world
