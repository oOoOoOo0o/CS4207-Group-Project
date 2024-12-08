window.onload = function() {
    // Event listeners
    const studentCreationForm = document.getElementById('studentForm');
    studentCreationForm.addEventListener('submit', createStudent);
    const moduleCreationForm = document.getElementById('moduleForm');
    moduleCreationForm.addEventListener('submit', createModule);

    displayStudents();
    displayModules();
}

const web3 = new Web3(window.ethereum);

let contract;
const contractAddress = '0xf9D50ACA039354A3eF3e6FDad6f8c450e90e048f';
const contractABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "module",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint8",
                    "name": "maxCapacity",
                    "type": "uint8"
                }
            ],
            "name": "ModuleCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "student",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "module",
                    "type": "string"
                }
            ],
            "name": "StudentEnrolled",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "Modules",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "code",
                    "type": "string"
                },
                {
                    "internalType": "uint8",
                    "name": "maxCapacity",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "Students",
            "outputs": [
                {
                    "internalType": "uint32",
                    "name": "id",
                    "type": "uint32"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "course",
                    "type": "string"
                },
                {
                    "internalType": "uint8",
                    "name": "year",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "semester",
                    "type": "uint8"
                },
                {
                    "internalType": "bool",
                    "name": "paidFees",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "studentCount",
            "outputs": [
                {
                    "internalType": "uint16",
                    "name": "",
                    "type": "uint16"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "moduleCode",
                    "type": "string"
                },
                {
                    "internalType": "uint8",
                    "name": "maxCapacity",
                    "type": "uint8"
                }
            ],
            "name": "createModule",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "moduleCode",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "course",
                    "type": "string"
                }
            ],
            "name": "addCompatibleCourse",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "moduleCode",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "requisite",
                    "type": "string"
                }
            ],
            "name": "addRequisiteModule",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "course",
                    "type": "string"
                },
                {
                    "internalType": "uint8",
                    "name": "year",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "semester",
                    "type": "uint8"
                },
                {
                    "internalType": "bool",
                    "name": "paidFees",
                    "type": "bool"
                }
            ],
            "name": "addStudent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "module",
                    "type": "string"
                }
            ],
            "name": "addCompletedModule",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "moduleCode",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "studentName",
                    "type": "string"
                }
            ],
            "name": "enrollStudent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "getStudent",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint32",
                            "name": "id",
                            "type": "uint32"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "course",
                            "type": "string"
                        },
                        {
                            "internalType": "uint8",
                            "name": "year",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint8",
                            "name": "semester",
                            "type": "uint8"
                        },
                        {
                            "internalType": "bool",
                            "name": "paidFees",
                            "type": "bool"
                        },
                        {
                            "internalType": "string[]",
                            "name": "completedModules",
                            "type": "string[]"
                        }
                    ],
                    "internalType": "struct StudentEnrolment.Student",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "moduleCode",
                    "type": "string"
                }
            ],
            "name": "getModule",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "code",
                            "type": "string"
                        },
                        {
                            "internalType": "uint8",
                            "name": "maxCapacity",
                            "type": "uint8"
                        },
                        {
                            "internalType": "string[]",
                            "name": "students",
                            "type": "string[]"
                        },
                        {
                            "internalType": "string[]",
                            "name": "compatibleCourses",
                            "type": "string[]"
                        },
                        {
                            "internalType": "string[]",
                            "name": "requisiteModules",
                            "type": "string[]"
                        }
                    ],
                    "internalType": "struct StudentEnrolment.Module",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "a",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "b",
                    "type": "string"
                }
            ],
            "name": "comString",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lastBlockTimestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "currentTimestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "currentDifficulty",
                    "type": "uint256"
                }
            ],
            "name": "getDifficulty",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes32",
                    "name": "prevHash",
                    "type": "bytes32"
                },
                {
                    "internalType": "string",
                    "name": "data",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                }
            ],
            "name": "calcHash",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "pure",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes32",
                    "name": "prevHash",
                    "type": "bytes32"
                },
                {
                    "internalType": "string",
                    "name": "data",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "difficulty",
                    "type": "uint256"
                }
            ],
            "name": "mineBlock",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function",
            "constant": true
        }
    ]

    async function initContract() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

initContract();