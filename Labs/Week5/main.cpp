#include <iostream>
#include "EnrollmentSystem.h"

using namespace std;

int main() {
    vector<string> requisiteCodes = {"cs4141"};
    Module cs4207 = Module("cs4207", requisiteCodes);
    Module cs4141 = Module("cs4141");

    Student bourkupine = Student();
    EnrollmentSystem es = EnrollmentSystem();

    es.enrollStudentInModule(bourkupine, cs4141);
    es.enrollStudentInModule(bourkupine, cs4207);
    bourkupine.addCompletedCourse("cs4141");
    es.enrollStudentInModule(bourkupine, cs4207);

    return 0;
}
