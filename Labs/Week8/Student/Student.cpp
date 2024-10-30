#include "Student.h"

Student::Student(int id) {
    this->id = id;
}

int Student::getId() {
    return this->id;
}

std::vector<std::string> Student::getCompletedCourseCodes() {
    return this->completedCourseCodes;
}

void Student::addCompletedCourseCode(std::string courseCode) {
    this->completedCourseCodes.push_back(courseCode);
}
