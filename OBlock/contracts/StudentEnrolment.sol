// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract StudentEnrolment {
    struct Student {
        uint id;
        string name;
        string course;
        uint year;
        uint semester;
        bool paidFees;
        string[] completedModules;
    }

    struct Module {
        string code;
        uint maxCapacity;
        address[] enrolledStudents;
    }

    mapping(uint => Student) public students;
    mapping(string => Module) public modules;
    uint public studentCount;

    event StudentAdded(uint studentId, string name, string course);
    event ModuleCreated(string moduleCode, uint maxCapacity);

    // Add a new student
    function addStudent(
        string memory name,
        string memory course,
        uint year,
        uint semester,
        string[] memory initialCompletedModules
    ) public {
        require(bytes(name).length > 0, "Student name is required.");
        require(bytes(course).length > 0, "Course is required.");

        studentCount++; // Increment global student counter
        students[studentCount] = Student(
            studentCount,
            name,
            course,
            year,
            semester,
            false, // Default to not paid fees
            initialCompletedModules
        );

        emit StudentAdded(studentCount, name, course);
    }

    // Create a new module
    function createModule(string memory code, uint maxCapacity) public {
        require(bytes(code).length > 0, "Module code is required.");
        require(modules[code].maxCapacity == 0, "Module already exists.");
        emit ModuleCreated(code, maxCapacity);
    }

    // Get details of a student by ID
    function getStudentById(uint studentId) public view returns (Student memory) {
        require(studentId > 0 && studentId <= studentCount, "Invalid student ID.");
        return students[studentId];
    }

    // Get the total number of students
    function getTotalStudents() public view returns (uint) {
        return studentCount;
    }
}