FROM centos:centos7

ARG release=19
ARG update=6

ENV NLS_LANG=JAPANESE_JAPAN.UTF8

RUN  yum install -y wget 
     
RUN  cd /etc/yum.repos.d && \
     wget http://yum.oracle.com/public-yum-ol7.repo && \
     wget http://yum.oracle.com/RPM-GPG-KEY-oracle-ol7 && \
     rpm --import RPM-GPG-KEY-oracle-ol7 && \ 
     yum install -y yum-utils && \
     yum-config-manager --enable ol7_oracle_instantclient && \
     yum -y install oracle-instantclient${release}.${update}-basic && \
     yum -y install oracle-instantclient${release}.${update}-odbc && \
     yum-config-manager --disable ol7_oracle_instantclient
     
RUN  yum -y install unixODBC-devel && \
     echo "" >> /etc/odbcinst.ini && \
     echo "[Oracle${release}.${update}]" >> /etc/odbcinst.ini && \
     echo "Description = ODBC for Oracle R${release}.${update}" >> /etc/odbcinst.ini && \
     echo "Driver      = /usr/lib/oracle/${release}.${update}/client64/lib/libsqora.so.${release}.1" >> /etc/odbcinst.ini && \
     echo "" >> ~/.odbc.ini && \
     echo "[ORCL]" >> ~/.odbc.ini && \
     echo "Driver = Oracle${release}.${update}" >> ~/.odbc.ini && \
     echo "ServerName = localhost/orcl" >> ~/.odbc.ini

#RUN  yum -y remove git && \
#     yum -y install https://centos7.iuscommunity.org/ius-release.rpm && \
#     yum -y install git2u yum-utils && \
#     yum-config-manager --disable ius

RUN  rm -rf /var/cache/yum
