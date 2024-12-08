// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract StudentEnrolment {
    uint16 public studentCount;

    /* Module Struct */
    struct Module {
        string code;
        uint8 maxCapacity;
        address[] students; // Store students address
        string[] compatibleCourses;
        string[] requisiteModules;
    }

    /* Student Struct */
    struct Student {
        uint32 id;
        string name;
        string course;
        uint8 year;
        uint8 semester;
        bool paidFees;
        string[] completedModules;
    }

    mapping(string => Module) public Modules;
    mapping(string => Student) public Students;

    event StudentEnrolled(address student, string module);
    event ModuleCreated(address module, uint8 maxCapacity);

    /* Add a Module */
    function createModule(string memory moduleCode, uint8 maxCapacity) public {
        require(bytes(moduleCode).length > 0, "Module Code required");
        require(Modules[moduleCode].maxCapacity == 0, "Module already Exists");

        string[] memory emptyArray;
        address[] memory emptyStudents;

        Module memory module = Module(
            moduleCode,
            maxCapacity,
            emptyStudents,
            emptyArray,
            emptyArray
        );
        Modules[moduleCode] = module;
    }

    function addCompatibleCourse(string memory moduleCode, string memory course) public {
        require(bytes(course).length > 0, "Course name required");
        Modules[moduleCode].compatibleCourses.push(course);
    }

    function addRequisiteModule(string memory moduleCode, string memory requisite) public {
        require(bytes(requisite).length > 0, "Course name required");
        Modules[moduleCode].requisiteModules.push(requisite);
    }

    /* Add a Student */
    function addStudent(
        string memory name,
        string memory course,
        uint8 year,
        uint8 semester,
        bool paidFees
    ) public {
        require(bytes(name).length > 0, "Student name required");
        require(bytes(course).length > 0, "Course required");

        uint16 studentId = studentCount++;
        string[] memory completedModules;

        Student memory student = Student(
                studentId,
                name,
                course,
                year,
                semester,
                paidFees,
                completedModules
            );
        Students[name] = student;
    }

    function addCompletedModule(string memory name, string memory module) public {
        require(bytes(module).length > 0, "Module required");
        Students[name].completedModules.push(module);
    }

    /* Enroll a student */
    function enrollStudent(string memory moduleCode) public {
        // We can check if a module already exists by checking if its max capacity is greater than 0
        // as when a module doesnt exist its default maxCapacity will be 0 and if it does exist
        // it will be greater than 0 (since logically a module cannot exist with a capacity of 0)
        require(Modules[moduleCode].maxCapacity > 0, "Module does not exists");
        Module storage module = Modules[moduleCode];
        require(module.students.length < module.maxCapacity, "Module is at max capacity");
        
        // Check if student is already enrolled.
        for (uint8 i = 0; i < module.students.length; i++) {
            require(module.students[i] != msg.sender, "Student already enrolled");
        }

        module.students.push(msg.sender);
        emit StudentEnrolled(msg.sender, module.code);
    }

    /* Return array of students */
    function getEnrolledStudents(string memory moduleCode)
    public view returns (address[] memory) {
        require(Modules[moduleCode].maxCapacity > 0, "Modules does not exist");
        return Modules[moduleCode].students;
    }

    /* Get Students info */
    function getStudent(string memory name)
    public view returns (Student memory) {
        return Students[name];
    }

    function getModule(string memory moduleCode)
    public view returns (Module memory) {
        return Modules[moduleCode];
    }
}
