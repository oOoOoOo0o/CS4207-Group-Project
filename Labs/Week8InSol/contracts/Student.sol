pragma solidity ^0.8.0;

contract Student {
    uint private id;
    string private name;
    string[] private completedCourseCodes = new string[]();

    constructor(uint _id, string _name) {
        id = _id;
        name = _name;
    }

    function getId() public returns(uint) {
        return id;
    }

    function setId(uint _id) public {
        id = _id;
    }

    function getName() public returns(string) {
        return name;
    }

    function setName(string _name) public {
        name = _name;
    }

    function getCompletedCourseCodes() public returns(uint) {
        return completedCourseCodes;
    }

    function setCompletedCourseCodes(string[] courseCodes) public {
        completedCourseCodes = courseCodes;
    }

    function addCompletedCourseCode(string courseCode) public {
        completedCourseCodes.push(courseCode);
    }
}