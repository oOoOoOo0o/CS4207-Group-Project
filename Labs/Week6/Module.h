#ifndef WK5LAB_MODULE_H
#define WK5LAB_MODULE_H

#include <string>
#include <vector>

class Module {
private:
    std::string courseCode;
    std::vector<std::string> requisiteCourseCodes;
    int availableSlots;

public:
    Module(std::string, int availableSlots);
    Module(std::string, std::vector<std::string>, int availableSlots);
    std::string getCourseCode();
    std::vector<std::string> getRequisiteCourseCodes();
    int getAvailableSlots();
    void incrementAvailableSlots();
    void decrementAvailableSlots();
};


#endif //WK5LAB_MODULE_H
