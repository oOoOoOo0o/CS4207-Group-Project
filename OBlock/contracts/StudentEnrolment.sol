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

    mapping(address => Module) public Modules;
    mapping(address => Student) public Students;

    event StudentEnrolled(address student, string module);
    event ModuleCreated(address module, uint8 maxCapacity);

    /* Add a Module */
    function createModule(string memory moduleCode, uint8 maxCapacity) public {
        require(bytes(moduleCode).length > 0, "Module Code required");
        require(Modules[msg.sender].maxCapacity == 0, "Module already Exists");

        string[] memory emptyArray;
        address[] memory emptyStudents;

        Modules[msg.sender] = Module(
            moduleCode,
            maxCapacity,
            emptyStudents,
            emptyArray,
            emptyArray
        );
    }

    function addCompatibleCourse(address module, string memory course) public {
        require(bytes(course).length > 0, "Course name required");
        Modules[module].compatibleCourses.push(course);
    }

    function addRequisiteModule(address module, string memory requisite) public {
        require(bytes(requisite).length > 0, "Course name required");
        Modules[module].requisiteModules.push(requisite);
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
        require(Students[msg.sender].id == 0, "Student already exists");

        uint16 studentId = studentCount++;
        string[] memory completedModules;

        Students[msg.sender] = Student(
            studentId,
            name,
            course,
            year,
            semester,
            paidFees,
            completedModules
        );
    }

    function addCompletedModule(address student, string memory module) public {
        require(bytes(module).length > 0, "Module required");
        Students[student].completedModules.push(module);
    }

    /* Enroll a student */
    function enrollStudent(address moduleAddress) public {
        // We can check if a module already exists by checking if its max capacity is greater than 0
        // as when a module doesnt exist its default maxCapacity will be 0 and if it does exist
        // it will be greater than 0 (since logically a module cannot exist with a capacity of 0)
        require(Modules[moduleAddress].maxCapacity > 0, "Module does not exists");
        Module storage module = Modules[moduleAddress];
        require(module.students.length < module.maxCapacity, "Module is at max capacity");
        
        // Check if student is already enrolled.
        for (uint8 i = 0; i < module.students.length; i++) {
            require(module.students[i] != msg.sender, "Student already enrolled");
        }

        module.students.push(msg.sender);
        emit StudentEnrolled(msg.sender, module.code);
    }

    /* Return array of students */
    function getEnrolledStudents(address module)
    public view returns (address[] memory) {
        require(Modules[module].maxCapacity > 0, "Modules does not exist");
        return Modules[module].students;
    }

    /* Get Students info */
    function getStudent(address student)
    public view returns (Student memory) {
        return Students[student];
    }

    function getModule(address module)
    public view returns (Module memory) {
        return Modules[module];
    }
}
