#include "stdafx.h"
#include <iostream>
#include <stdlib.h>
#include "oci.h"

const int OCI_EXIT_FAILURE = 1;
const int OCI_EXIT_SUCCESS = 0;

#define CALL_OCI_START(func) \
    {\
        std::cout << #func << "()";\
        sword ret = func
#define CALL_OCI_END ;\
        std::cout << "..." << (ret ==0 ? "OK" : "FAILURE") << std::endl;\
    }

Lda_Def lda;
Cda_Def cda;
ub1 hda[HDA_SIZE];

int main(int argc, char* argv[])
{
    text* username = (text*)"SCOTT";
    text* passwd = (text*)"TIGER";
    text* database = (text*)"192.168.200.20/ORA112DB";

    std::cout << "[START]" << std::endl;
    CALL_OCI_START(olog)(&lda, hda, username, -1, passwd, -1, database, -1, OCI_LM_DEF)
    CALL_OCI_END;
    CALL_OCI_START(oopen)(&cda, &lda, (text*)0, -1, -1, (text*)0, -1)
    CALL_OCI_END;
    return 0;
}

