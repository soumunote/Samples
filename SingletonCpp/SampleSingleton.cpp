#include <iostream>
#include <iomanip>

using namespace std;

class CApp {
private:
	CApp() {}
public:
	void StartWorking() { cout << "START!!!" << endl; }
	void DoWorking() { cout << "WORK!!!" << endl; }
	void EndWorking() { cout << "END !!!" << endl; }

	static CApp* theApp;
	static CApp* GetApp() { 
		if (theApp == NULL) {
			theApp = new CApp();
		}
		return theApp; 
	}
	static void Delete() {
		if (theApp != NULL) delete theApp;
	}
};

CApp* CApp::theApp = NULL;
CApp* AfxGetApp() { return CApp::GetApp(); }
void AfxExit() { CApp::Delete(); }

int main()
{
	AfxGetApp()->StartWorking();
	AfxGetApp()->DoWorking();
	AfxGetApp()->EndWorking();
	AfxExit();
}
