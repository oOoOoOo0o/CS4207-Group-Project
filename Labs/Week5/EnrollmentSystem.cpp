#include "EnrollmentSystem.h"
#include "algorithm"
#include <iostream>

using namespace std;

void EnrollmentSystem::addStudent(Student s) {
    this->listOfStudents.push_back(s);
}

void EnrollmentSystem::addModule(Module m) {
    this->listOfModules.push_back(m);
}

vector<string> EnrollmentSystem::checkEnrollmentEligibility(Student s, Module m) {
    vector<string> missingCourseCodes;
    vector<string> completedCourseCodes = s.getCompletedCourseCodes();
    for (string courseCode : m.getRequisiteCourseCodes()) {
        if (find(completedCourseCodes.begin(), completedCourseCodes.end(), courseCode) == completedCourseCodes.end()) {
            missingCourseCodes.push_back(courseCode);
        }
    }
    return missingCourseCodes;
}

void EnrollmentSystem::enrollStudentInModule(Student s, Module m) {
    vector<string> missingCodes = checkEnrollmentEligibility(s, m);
    if (missingCodes.size() == 0) {

        cout << "Successfully enrolled Student " << s.getId() << " in Module " << m.getCourseCode() << endl;
    } else {
        cout << "Failed to enroll Student " << s.getId() << "! Missing modules: " << endl;
        for (string code : missingCodes) {
            cout << code << endl;
        }
    }
}