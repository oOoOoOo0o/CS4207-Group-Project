//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentContact{

    mapping(string => Student) studentMap;

    struct Student{
        uint32 id;
        bool hasPaid;
    }

    function addStudent(string memory courseCode, uint32 i, bool paid) public {
            studentMap[courseCode] = Student(i, paid);
    }

    constructor(string memory courseCode, uint32 i, bool paid){
        addStudent(courseCode, i, paid);
    }
}