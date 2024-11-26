#include "EnrolmentSystem.h"

EnrolmentSystem::EnrolmentSystem() {
    this->modules = vector<Module*>();
}

bool EnrolmentSystem::canStudentEnrollInModule(Student* s, Module* m) {
    // Check if paid fees
    if (s->getPaidFees()) {
        return false;
    }

    // Check course names match
    if (s->getCourse() != m->getCourse()) {
        return false;
    }

    // Check course capacity
    int maxCapacity = m->getMaxCapacity();
    int currCapacity = m->getEnrolledStudents().size();
    if (maxCapacity <= currCapacity) {
        return false;
    }

    // Check requisite modules match completed modules
    vector<Module*> required = m->getRequisiteModules();
    vector<Module*> completed = s->getCompletedModules();
    for (Module* m1 : required) {
        bool found = false;
        for (Module* m2 : completed) {
            if (m1 == m2) {
                found = true;
                break;
            }
        }
        if (!found) {
            return false;
        }
    }

    return true;
}

bool EnrolmentSystem::enrollStudentInModule(Student* s, Module* m) {
    if (canStudentEnrollInModule(s, m)) {
        return m->addEnrolledStudent(s);
    }
    return false;
}

vector<Module*> EnrolmentSystem::getModules() {
    return this->modules;
}
