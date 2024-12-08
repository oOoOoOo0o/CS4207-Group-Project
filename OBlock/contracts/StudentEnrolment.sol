// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract StudentEnrolment {
    uint16 public studentCount;

    /* Module Struct */
    struct Module {
        string code;
        uint8 maxCapacity;
        string[] students; // Store students address
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
        string[] memory emptyStudents;

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
    function enrollStudent(string memory moduleCode, string memory studentName) public {
        // We can check if a module already exists by checking if its max capacity is greater than 0
        // as when a module doesnt exist its default maxCapacity will be 0 and if it does exist
        // it will be greater than 0 (since logically a module cannot exist with a capacity of 0)
//        require(Modules[moduleCode].maxCapacity > 0, "Module does not exist");
//        Module storage module = Modules[moduleCode];
//        require(module.students.length < module.maxCapacity, "Module is at max capacity");
//
//        // Check if student is already enrolled.
//        for (uint8 i = 0; i < module.students.length; i++) {
//            string memory str = module.requisiteModules[i];
//            if (comString(str, studentName)) {
//                require(false, "Student is already enrolled");
//            }
//        }
//
//        // Check course
//        for (uint8 i = 0; i < module.compatibleCourses.length; i++) {
//            string memory str = module.compatibleCourses[i];
//            require(comString(str, Students[studentName].course), "Student is not in a course with this module");
//        }
//
//        // Check requisites
//        string[] memory completed = Students[studentName].completedModules;
//        for (uint8 i = 0; i < module.requisiteModules.length; i++) {
//            bool found = false;
//            for (uint8 j = 0; j < completed.length; j++) {
//                string memory str = module.requisiteModules[i];
//                if (comString(str, completed[j])) {
//                    found = true;
//                    break;
//                }
//            }
//            require(found, "Student doesn't have requisite modules completed");
//        }

        require(comString(studentName, "Sam"));
        Modules[moduleCode].students.push(studentName);
    }

//    /* Return array of students */
//    function getEnrolledStudents(string memory moduleCode)
//    public view returns (address[] memory) {
//        require(Modules[moduleCode].maxCapacity > 0, "Modules does not exist");
//        return Modules[moduleCode].students;
//    }

    /* Get Students info */
    function getStudent(string memory name)
    public view returns (Student memory) {
        return Students[name];
    }

    function getModule(string memory moduleCode)
    public view returns (Module memory) {
        return Modules[moduleCode];
    }

    function comString(string memory a, string memory b) public view returns(bool){
        bytes memory aB = bytes(a);
        bytes memory bB = bytes(b);

        for(uint x = 0; x < aB.length; x++){
            if(aB[x] < bB[x] || aB[x] > bB[x]){
                return false;
            }
        }
        return true;
    }

    struct Block {
        string blockType;
        uint256 index;
        uint256 timestamp;
        bytes32 prevHash;
        bytes32 hash;
        uint256 nonce;
        string data;
    }

    function getDifficulty(
        uint256 lastBlockTimestamp,
        uint256 currentTimestamp,
        uint256 currentDifficulty
    ) public pure returns (uint256) {
        uint256 timeTaken = currentTimestamp - lastBlockTimestamp;

        if (timeTaken < 10 seconds) {
            return currentDifficulty + 1;
        } else if (timeTaken > 20 seconds) {
            return currentDifficulty > 0 ? currentDifficulty - 1 : 0;
        } else {
            return currentDifficulty;
        }
    }

    function calcHash(
        uint256 index,
        uint256 timestamp,
        bytes32 prevHash,
        string memory data,
        uint256 nonce
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(index, timestamp, prevHash, data, nonce));
    }

    function mineBlock(
        uint256 index,
        uint256 timestamp,
        bytes32 prevHash,
        string memory data,
        uint256 difficulty
    ) public pure returns (bytes32, uint256){
        uint256 nonce = 0;
        bytes32 hash;

        while (true) {
            hash = calcHash(index, timestamp, prevHash, data, nonce);
            if (uint256(hash) <= difficulty) {
                return (hash, nonce);
            }
            nonce++;
        }
        return (0, 0);
    }
}
