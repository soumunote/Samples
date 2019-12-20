#include <ole2.h>
#include <iostream>

int main()
{
	HRESULT hr;

	//
	// OLE2 初期化
	// 
	hr = CoInitialize(NULL);
	if (FAILED(hr)) {
		std::cout << "CoInitialize() failed." << std::endl;
		return -1;
	}

	//
	// レジストリを検索し、HKCR\Excel.Application から以下のCLSIDを取得する
	//                 {00024500-0000-0000-C000-000000000046}
	//
	CLSID clsid;
	hr = CLSIDFromProgID(L"Excel.Application", &clsid);
	if (FAILED(hr)) {
		std::cout << "CLSIDFromProgID() failed." << std::endl;
		return -1;
	}

	//
	// Excel.Application クラスをローカルサーバとして起動し、IDispatchインタフェースの
	// ポインタを取得する。
	// IDsipatchインタフェース経由で様々な処理を行うが、CoCreateInstance完了時点で、
	// Excel は起動している
	//
	IDispatch* pxlApp;
	// 以下の2行は同じ意味
	hr = CoCreateInstance(clsid, NULL, CLSCTX_LOCAL_SERVER, IID_PPV_ARGS(&pxlApp));
	//hr = CoCreateInstance(clsid, NULL, CLSCTX_LOCAL_SERVER, IID_IDispatch, (LPVOID*)&pxlApp);
	if (FAILED(hr)) {
		std::cout << "CoCreateInstance() failed." << std::endl;
		return -1;
	}

	return 0;
}
