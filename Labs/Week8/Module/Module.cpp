#include "Module.h"
#include "algorithm"

Module::Module(std::string courseCode, std::vector<std::string> requisiteCourseCodes, int availableSlots) {
    this->courseCode = courseCode;
    this->requisiteCourseCodes = requisiteCourseCodes;
    this->maxSlots = availableSlots;
}

Module::Module(std::string courseCode, int availableSlots) {
    this->courseCode = courseCode;
    this->maxSlots = availableSlots;
}

std::string Module::getCourseCode() {
    return this->courseCode;
}

std::vector<std::string> Module::getRequisiteCourseCodes() {
    return this->requisiteCourseCodes;
}

int Module::getMaxSlots() {
    return this->maxSlots;
}

void Module::setMaxSlots(int availableSlots) {
    this->maxSlots = availableSlots;
}

std::vector<Student> Module::getEnrolledStudents() {
    return this->enrolledStudents;
}

bool Module::enrollStudent(Student s) {
    if (this->maxSlots > enrolledStudents.size()) {
        this->enrolledStudents.emplace_back(s);
        return true;
    }
    return false;
}

void Module::pruneOverbookings() {
    while (this->enrolledStudents.size() > this->maxSlots) {
        this->enrolledStudents.pop_back();
    }
}

bool Module::operator==(const Module& m) {
    return this->courseCode == m.courseCode;
}
