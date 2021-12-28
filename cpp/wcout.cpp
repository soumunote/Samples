#include <iostream>
#include <iomanip>

int main()
{
    std::cout << "Hello World!" << std::endl;
    std::cout << "こんにちわ。世界!" << std::endl;
    std::setlocale(LC_CTYPE, "");
    std::wcout << L"Hello World!" << std::endl;
    std::wcout << L"こんにちわ。世界!" << std::endl;
}
