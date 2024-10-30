#include "Student.h"
#include "algorithm"

Student::Student(int id) {
    this->id = id;
}

int Student::getId() {
    return this->id;
}

std::vector<Module> Student::getCompletedModules() {
    return this->completedModules;
}

void Student::addCompletedCourse(Module module) {
    this->completedModules.push_back(module);
    std::remove(this->currentModules.begin(), this->currentModules.end(), module);
}

void Student::addCurrentCourse(Module module) {
    this->currentModules.push_back(module);
}
