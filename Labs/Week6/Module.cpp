#include "Module.h"

Module::Module(std::string courseCode, std::vector<std::string> requisiteCourseCodes, int availableSlots) {
    this->courseCode = courseCode;
    this->requisiteCourseCodes = requisiteCourseCodes;
    this->availableSlots = availableSlots;
}

Module::Module(std::string, int availableSlots) {
    this->courseCode = courseCode;
    this->availableSlots = availableSlots;
}

std::string Module::getCourseCode() {
    return this->courseCode;
}

std::vector<std::string> Module::getRequisiteCourseCodes() {
    return this->requisiteCourseCodes;
}

int Module::getAvailableSlots() {
    return this->availableSlots;
}

void Module::incrementAvailableSlots() {
    this->availableSlots++;
}

void Module::decrementAvailableSlots() {
    this->availableSlots--;
}