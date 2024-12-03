//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentContact{

    mapping(string => Student) studentMap;

    struct Student{
        uint256 id;
        uint8 qca;
        bool hasPaid;
    }

    function addStudent(string memory courseCode, uint256 i, uint8 q, bool paid) public {
            studentMap[courseCode] = Student(i, q, paid);
    }

    constructor(string memory courseCode, uint256 i, uint8 q, bool paid){
        addStudent(courseCode, i, q, paid);
    }
}