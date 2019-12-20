#include <iostream>
#include <unistd.h>
#include <signal.h>

void signal_handler(int signum)
{
    std::cout << "signal_handler(" << signum << ")" << std::endl;
}

int main(void)
{
    std::cout << "SampleSignal started." << std::endl;
    signal(SIGINT, &signal_handler);
    pause();
    std::cout << "SampleSignal terminated." << std::endl;
    return 0;
}
