#include <cmath>
#include <iostream>
#include <thread>
#include "EnrollmentSystem/EnrollmentSystem.h"
#include "Module/Module.h"
#include "Student/Student.h"

using namespace std;

int main() {
    Module cs4141 = Module("cs4141", 30);

    vector<string> requisiteCodes = {"cs4141"};
    Module cs4207 = Module("cs4207", requisiteCodes, 5);
    // Task 1: Course Capacity Check - Allow 20% overbooking
    cs4207.setMaxSlots(floor(cs4207.getMaxSlots() * 1.2));

    Student jacob = Student(1);
    Student euan = Student(2);
    Student blake = Student(3);
    Student italo = Student(4);
    Student tommy = Student(5);
    Student milan = Student(6);
    EnrollmentSystem es = EnrollmentSystem();

    jacob.addCompletedCourseCode("cs4141");
    euan.addCompletedCourseCode("cs4141");
    blake.addCompletedCourseCode("cs4141");
    italo.addCompletedCourseCode("cs4141");
    tommy.addCompletedCourseCode("cs4141");
    milan.addCompletedCourseCode("cs4141");

    vector<Student> students = {jacob, euan, blake, italo, tommy, milan};
    vector<thread> threads;

    for (int i = 0; i < students.size(); i++) {
        threads.emplace_back(&EnrollmentSystem::enrollStudentInModule, &es, ref(students[i]), ref(cs4207));
    }

    for (auto& t : threads) {
        t.join();
    }

    cout << "Enrolled Students:" << endl;
    for (Student student : cs4207.getEnrolledStudents()) {
        cout << student.getId() << endl;
    }

    // Task 3: Final Enrollment Adjustment
    // Imagine a week has passed, now we have to adjust capacity back to its original value and remove overbookings
    cs4207.setMaxSlots(floor(cs4207.getMaxSlots() / 1.2));
    //need a max slots
    // Prune overbookings
    cs4207.pruneOverbookings();

    cout << "Enrolled Students:" << endl;
    for (Student student : cs4207.getEnrolledStudents()) {
        cout << student.getId() << endl;
    }

    return 0;
}
