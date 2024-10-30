#ifndef WK8LAB_MODULE_H
#define WK8LAB_MODULE_H

#include <string>
#include <vector>
#include "../Student/Student.h"

class Module {
private:
    std::string courseCode;
    std::vector<std::string> requisiteCourseCodes;
    int maxSlots;
    std::vector<Student> enrolledStudents;

public:
    Module(std::string, int);
    Module(std::string, std::vector<std::string>, int);

    std::string getCourseCode();
    std::vector<std::string> getRequisiteCourseCodes();

    int getMaxSlots();
    void setMaxSlots(int);

    std::vector<Student> getEnrolledStudents();
    bool enrollStudent(Student);
    void pruneOverbookings();

    bool operator==(const Module&);
};


#endif //WK8LAB_MODULE_H
