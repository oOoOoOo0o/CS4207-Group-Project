#include "Student.h"
#include "algorithm"

Student::Student(int id) {
    this->id = id;
}

int Student::getId() {
    return this->id;
}

std::vector<std::string> Student::getCompletedCourseCodes() {
    return this->completedCourseCodes;
}

void Student::addCompletedCourse(std::string courseCode) {
    this->completedCourseCodes.push_back(courseCode);
    std::remove(this->currentCourseCodes.begin(), this->currentCourseCodes.end(), courseCode);
}

void Student::addCurrentCourse(std::string courseCode) {
    this->currentCourseCodes.push_back(courseCode);
}
