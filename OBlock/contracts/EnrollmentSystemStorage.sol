// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract EnrollmentSystemStorage {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
