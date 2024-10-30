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
    Module(std::string, int);
    Module(std::string, std::vector<std::string>, int);
    std::string getCourseCode();
    std::vector<std::string> getRequisiteCourseCodes();
    int getAvailableSlots();
    void setAvailableSlots(int);
    void incrementAvailableSlots();
    void decrementAvailableSlots();

    bool operator==(const Module&);
};


#endif //WK5LAB_MODULE_H
