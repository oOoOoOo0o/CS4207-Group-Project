pragma solidity ^0.8.0;
import "./Student.sol";

contract Module {
    string private courseCode;
    string[] private requisiteCourseCodes = new string[]();
    uint private maxSlots;
    Student[] private enrolledStudents = new Student[]();

    constructor(string _courseCode, string[] _requisiteCourseCodes, uint _maxSlots) {
        courseCode = _courseCode;
        requisiteCourseCodes = _requisiteCourseCodes;
        maxSlots = _maxSlots;
    }

    function getCourseCode() public returns(string) {
        return courseCode;
    }

    function getRequisiteCourseCodes() public returns(uint) {
        return requisiteCourseCodes;
    }

    function setRequisiteCourseCodes(string[] courseCodes) public {
        requisiteCourseCodes = courseCodes;
    }

    function addRequisiteCourseCode(string courseCode) public {
        requisiteCourseCodes.push(courseCode);
    }

    function getMaxSlots() public returns(uint) {
        return maxSlots;
    }

    function setMaxSlots(uint _maxSlots) public {
        maxSlots = _maxSlots;
    }

    function getEnrolledStudents() public returns(Student[]) {
        return enrolledStudents;
    }

    function addEnrolledStudent(Student student) public {
        enrolledStudents.push(student);
    }

    function removeEnrolledStudentById(uint id) public returns(bool) {
        bool found = false;
        for (uint i = 0; i < enrolledStudents.length(); i++) {
            if (found) {
                enrolledStudents[i - 1] = enrolledStudents[i];
            }
            if (enrolledStudents[i].getId() == id) {
                found = true;
            }
        }
        if (found) {
            enrolledStudents.pop();
        }

        return found;
    }
}