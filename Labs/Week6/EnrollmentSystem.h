#ifndef WK5LAB_ENROLLMENTSYSTEM_H
#define WK5LAB_ENROLLMENTSYSTEM_H

#include <vector>
#include <mutex>
#include "Student.h"
#include "Module.h"

class EnrollmentSystem {
private:
    std::vector<Student> listOfStudents;
    std::vector<Module> listOfModules;
    std::mutex mtx;

public:
    void addStudent(Student);
    void addModule(Module);
    static std::vector<std::string> checkEnrollmentEligibility(Student, Module);
    void enrollStudentInModule(Student&, Module&);
};


#endif //WK5LAB_ENROLLMENTSYSTEM_H
