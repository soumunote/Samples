#!/bin/sh

answer=`whiptail --radiolist "Select build option." 10 30 4 \
       0 "clean" off \
       1 "no library" on \
       2 "static link" off \
       3 "dynamic link" off \
    3>&1 1>&2 2>&3`

case $answer in
    0)
        rm -f mainprog.o sayfoo.o saybar.o 
        rm -f libfoobar.a libfoobar.so.1.0
        sudo rm -f /usr/local/lib/libfoobar.so.1.0
        rm -f porg
        set -x
        ls 
        set +x
        ;;
    1)
        set -x
        gcc -c mainprog.c sayfoo.c saybar.c
        gcc -o prog mainprog.o sayfoo.o saybar.o 
        ls
        set +x
        ;;
    2)
        set -x
        gcc -c sayfoo.c saybar.c
        ar crv libfoobar.a sayfoo.o saybar.o
        gcc -o prog mainprog.c -L. -lfoobar
        ls
        set +x
        ;;
    3)
        set -x
        gcc -c sayfoo.c saybar.c
        ld -shared -soname libfoobar.so.1 -o libfoobar.so.1.0 -lc sayfoo.o saybar.o
        sudo cp libfoobar.so.1.0 /usr/local/lib/
        sudo ldconfig
        ls /usr/local/lib
        gcc -o prog mainprog.c libfoobar.so.1.0
        rm libfoobar.so.1.0
        ldd prog
        set +x
        ;;
esac

exit 0