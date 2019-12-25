#include <iostream>

enum class STATUS {
    OK,
    WARN,
    BAD,
};

struct Foo {
    STATUS st = STATUS::OK;
    STATUS status() { return st; }
};


int main()
{
    switch (Foo foo; auto s = foo.status()) {
    case STATUS::OK:
        std::cout << "OK";
        break;
    case STATUS::WARN:
        std::cout << "WARN";
        break;
    case STATUS::BAD:
        std::cout << "BAD";
        break;
    }
    for (int i = 0; i < 10; i++);
    std::cout << i
    return 0;
}