#include <iostream>
#include <iomanip>
#include <windows.h>

void SafeArrayQuest()
{
	HRESULT hr;

	SAFEARRAYBOUND bounds[2];
	bounds[0].cElements = 2;
	bounds[0].lLbound = 0;
	bounds[1].cElements = 2;
	bounds[1].lLbound = 0;

	SAFEARRAY* pAry = SafeArrayCreate(VT_I2, 2, bounds);

	LONG elemLocation[2];
	short setValue;
	
	// pAry[0, 0]
	elemLocation[0] = 0; elemLocation[1] = 0; 
	setValue = 0x89;
	hr = SafeArrayPutElement(pAry, elemLocation, &setValue);

	// pAry[0, 1]
	elemLocation[0] = 1; elemLocation[1] = 0;
	setValue = 0xab;
	hr = SafeArrayPutElement(pAry, elemLocation, &setValue);

	// pAry[1, 0]
	elemLocation[0] = 0; elemLocation[1] = 1;
	setValue = 0xcd;
	hr = SafeArrayPutElement(pAry, elemLocation, &setValue);

	// pAry[1, 1]
	elemLocation[0] = 1; elemLocation[1] = 1;
	setValue = 0xef;
	hr = SafeArrayPutElement(pAry, elemLocation, &setValue);

	// pAry[0, 2]
	elemLocation[0] = 2; elemLocation[1] = 0;
	setValue = 0xaa;
	hr = SafeArrayPutElement(pAry, elemLocation, &setValue);

	for (int i = 0; i < 2; i ++) {
		for (int j = 0; j < 2; j++) {
			elemLocation[0] = i; 
			elemLocation[1] = j;
			short gotValue;
			hr = SafeArrayGetElement(pAry, elemLocation, &gotValue);
			std::cout << gotValue << std::endl;
		}
	}

	SafeArrayDestroy(pAry);
}
