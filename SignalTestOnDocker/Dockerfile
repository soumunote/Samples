FROM centos
ADD SampleSignal.cpp /usr/local/src/
RUN yum install -y vim-enhanced gcc-c++
RUN cd /usr/local/src && g++ -o /usr/local/bin/SampleSignal SampleSignal.cpp
CMD [ "/usr/local/bin/SampleSignal" ]
