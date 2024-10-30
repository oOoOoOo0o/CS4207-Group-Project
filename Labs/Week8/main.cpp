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
    Module cs4207 = Module("cs4207", requisiteCodes, 10);
    // Task 1: Course Capacity Check - Allow 20% overbooking
    cs4207.setAvailableSlots(floor(cs4207.getAvailableSlots() * 1.2));

    Student jacob = Student(1);
    Student euan = Student(2);
    Student blake = Student(3);
    Student italo = Student(4);
    EnrollmentSystem es = EnrollmentSystem();

    jacob.addCompletedCourse(cs4141);
    euan.addCompletedCourse(cs4141);
    blake.addCompletedCourse(cs4141);
    italo.addCompletedCourse(cs4141);

    vector<Student> students = {jacob, euan, blake, italo};
    vector<thread> threads;

    // Students will try to enroll in cs4207 and both have the requisite modules but there is only one available slot
    for (int i = 0; i < 4; i++) {
        threads.emplace_back(&EnrollmentSystem::enrollStudentInModule, &es, ref(students.at(i)), ref(cs4207));
    }

    // Threads to execute enrollment is started simultaneously
    for (auto& t : threads) {
        t.join();
    }

    // Should be 0 and not a negative number
    cout << cs4207.getAvailableSlots();
    return 0;
}