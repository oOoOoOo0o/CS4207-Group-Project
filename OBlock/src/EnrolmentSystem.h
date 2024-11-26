#ifndef CS4207_GROUP_PROJECT_ENROLMENTSYSTEM_H
#define CS4207_GROUP_PROJECT_ENROLMENTSYSTEM_H

#include <vector>

#include "Module.h"
#include "Student.h"

using namespace std;

class EnrolmentSystem {
private:
    vector<Module*> modules;
    bool canStudentEnrollInModule(Student*, Module*);

public:
    EnrolmentSystem();

    bool enrollStudentInModule(Student*, Module*);
    vector<Module*> getModules();
};

#endif //CS4207_GROUP_PROJECT_ENROLMENTSYSTEM_H
