#include "Module.h"

Module::Module(std::string courseCode, std::vector<std::string> requisiteCourseCodes) {
    this->courseCode = courseCode;
    this->requisiteCourseCodes = requisiteCourseCodes;
}

Module::Module(std::string) {
    this->courseCode = courseCode;
}

std::string Module::getCourseCode() {
    return this->courseCode;
}

std::vector<std::string> Module::getRequisiteCourseCodes() {
    return this->requisiteCourseCodes;
}