#ifndef WK5LAB_STUDENT_H
#define WK5LAB_STUDENT_H

#include <vector>
#include <string>

class Student {
private:
    int id;
    std::vector<std::string> completedCourseCodes;
    std::vector<std::string> currentCourseCodes;

public:
    int getId();
    void addCompletedCourse(std::string courseCode);
    void addCurrentCourse(std::string courseCode);
    std::vector<std::string> getCompletedCourseCodes();
};


#endif //WK5LAB_STUDENT_H
