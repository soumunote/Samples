#include <iostream>

using namespace std;

struct Parent {
    string name;
    virtual void Hello() { cout << "[Parent] Hello." << endl; }
    virtual void Goodbye() { cout << "[Parent] Goodbye." << endl; }
    Parent(string p_name) :name(p_name) {};
    virtual ~Parent() = default;
};

struct Child : Parent {
    virtual void Hello() { cout << "[Child] Hello." << endl; }
    virtual void Goodbye() { cout << "[Child] Goodbye." << endl; }
    Child(string p_name) : Parent(p_name) {};
    virtual ~Child() = default;
};

enum class GREETING : int {
    HELLO = 0,
    GOODBYE = 1,
};

using MEMBER_FUNC = void (*)(Parent*);

void CallGreeting(Parent* p, GREETING greeting)
{
    MEMBER_FUNC* vtbl = *(reinterpret_cast<MEMBER_FUNC**>(p));
    MEMBER_FUNC func = vtbl[static_cast<int>(greeting)];
    func(p);
}


int main()
{
    auto p = make_unique<Parent>("ryo");
    auto c = make_unique<Child>("tatsu");
    CallGreeting(p.get(), GREETING::HELLO);
    CallGreeting(p.get(), GREETING::GOODBYE);
    CallGreeting(c.get(), GREETING::HELLO);
    CallGreeting(c.get(), GREETING::GOODBYE);
}
