#ifndef WK5LAB_STUDENT_H
#define WK5LAB_STUDENT_H

#include <vector>
#include "../Module/Module.h"

class Student {
private:
    int id;
    std::vector<Module> completedModules;
    std::vector<Module> currentModules;

public:
    Student(int id);
    int getId();
    void addCompletedCourse(Module);
    void addCurrentCourse(Module);
    std::vector<Module> getCompletedModules();
};


#endif //WK5LAB_STUDENT_H