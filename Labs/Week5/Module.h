#ifndef WK5LAB_MODULE_H
#define WK5LAB_MODULE_H

#include <string>
#include <vector>

class Module {
private:
    std::string courseCode;
    std::vector<std::string> requisiteCourseCodes;

public:
    Module(std::string);
    Module(std::string, std::vector<std::string>);
    std::string getCourseCode();
    std::vector<std::string> getRequisiteCourseCodes();
};


#endif //WK5LAB_MODULE_H
