//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ModuleContract{

    mapping(uint32 => Module) moduleMap;

    struct Module{
        string code;
        uint8 capacity;
    }

    function addStudent(uint32 studentCode, string memory courseCode, uint8 capacity) public {
        moduleMap[studentCode] = Module(courseCode, capacity);
    }

    constructor(uint32 studentCode, string memory courseCode, uint8 capacity){
        addStudent(studentCode, courseCode, capacity);
    }
}