// SamplePipe.cpp : コンソール アプリケーション用のエントリ ポイントの定義
//

#include "stdafx.h"
#include <windows.h>
#include <conio.h>
#include <stdlib.h>
#include <tchar.h>
#include <string.h>

void ShowError(DWORD dwErrorCode)
{
	LPVOID lpMessageBuffer;
	FormatMessage(FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS,
		          NULL, dwErrorCode, MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
				  (LPTSTR)&lpMessageBuffer, 0, NULL);
	puts((const char*)lpMessageBuffer);
	LocalFree(lpMessageBuffer);
}

int main(int argc, char* argv[])
{
	DWORD nBytesRead = 0;
	DWORD nBytesWritten = 0;
	BYTE szReadBuffer[102400];
	UINT nBufferPtr = 0;
	memset(szReadBuffer, 0, sizeof(szReadBuffer));

	DWORD nBytesPeeked = 0;
	DWORD nBytesAvail = 0;
	BYTE szPeekBuffer[1];

	PROCESS_INFORMATION pi;

	SECURITY_ATTRIBUTES sa;
	memset(&sa, 0, sizeof(sa));
	sa.nLength = sizeof(sa);
	sa.bInheritHandle = TRUE;
	sa.lpSecurityDescriptor = NULL;

	HANDLE hOutputReadTmp, hOutputWrite, hOutputRead;
    CreatePipe(&hOutputReadTmp, &hOutputWrite, &sa, 0);
	DuplicateHandle(GetCurrentProcess(), hOutputReadTmp, GetCurrentProcess(), &hOutputRead, 0, FALSE, DUPLICATE_SAME_ACCESS);
	CloseHandle(hOutputReadTmp);

	HANDLE hInputRead, hInputWirteTmp, hInputWrite;
    CreatePipe(&hInputRead, &hInputWirteTmp, &sa, 0);
	DuplicateHandle(GetCurrentProcess(), hInputWirteTmp, GetCurrentProcess(), &hInputWrite, 0, FALSE, DUPLICATE_SAME_ACCESS);
	CloseHandle(hInputWirteTmp);

	HANDLE hOutputError;
	DuplicateHandle(GetCurrentProcess(), hOutputWrite, GetCurrentProcess(), &hOutputError, 0, FALSE, DUPLICATE_SAME_ACCESS);

	STARTUPINFO si;
	memset(&si, 0, sizeof(si));
	si.cb = sizeof(si);
	si.dwFlags = STARTF_USESTDHANDLES | STARTF_USESHOWWINDOW;
	si.wShowWindow = SW_NORMAL;
	si.hStdInput  = hInputRead;
	si.hStdOutput = hOutputWrite;
	si.hStdError  = hOutputError;
	
	if (CreateProcess(NULL, "C:\\app\\oracle\\product\\11.2.0\\client_1\\BIN\\sqlplus.exe /nolog", &sa, &sa, TRUE, NORMAL_PRIORITY_CLASS, NULL, NULL, &si, &pi)) {

		const char* szStdIn = "spool c:\\tmp\\aaa.txt\nconn CORE21/CORE21@192.168.200.20/ORA112DB\ndesc M_得意先\nEXIT\n";
		WriteFile(hInputWrite, szStdIn, strlen(szStdIn), &nBytesWritten, NULL);
		CloseHandle(hInputWrite);
				
		for (;;) {
			if (nBytesRead > 0 && (! PeekNamedPipe(hOutputRead, szPeekBuffer, 1, &nBytesPeeked, &nBytesAvail, 0) || nBytesPeeked == 0 || nBytesAvail == 0)) {
				printf("%d,%d\n", nBytesPeeked, nBytesAvail);				
				break;
			}
			if (! ReadFile(hOutputRead, szReadBuffer + nBufferPtr, 1, &nBytesRead, NULL) || nBytesRead == 0) {
				break;
			}
			putchar(szReadBuffer[nBufferPtr]);
			if (nBytesRead == 0) break;
			nBufferPtr ++;
			if (nBufferPtr == 1000-2) {
//				__asm int 3h;
			}
		}

		//puts((const char*)szReadBuffer);
		getch();

	}
	else {
		ShowError(GetLastError());
		getch();
		exit(EXIT_FAILURE);
	}

	CloseHandle(hOutputRead);

	return 0;
}
// GetExitCodeProcess, ReadBufferあふれ

