#ifndef WK8LAB_STUDENT_H
#define WK8LAB_STUDENT_H

#include <string>
#include <vector>

class Student {
private:
    int id;
    std::vector<std::string> completedCourseCodes;

public:
    Student(int id);
    int getId();
    void addCompletedCourseCode(std::string);
    std::vector<std::string> getCompletedCourseCodes();
};


#endif //WK8LAB_STUDENT_H
