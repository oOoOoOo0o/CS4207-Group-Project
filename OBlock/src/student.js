class Student {
    constructor(id, name, course, year, semester, paidFees, completedModules) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.year = year;
        this.semester = semester;
        this.paidFees = paidFees;
        this.completedModules = completedModules;
    }
}

const web3 = new Web3(window.ethereum);

let contract;
const contractAddress = '0xd34764B28A096bC3AecCda36A456CCcF67c2E0D6';
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "moduleCode",
                "type": "string"
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
                "internalType": "address",
                "name": "",
                "type": "address"
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
                "internalType": "address",
                "name": "student",
                "type": "address"
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
                "name": "moduleCode",
                "type": "string"
            }
        ],
        "name": "getEnrolledStudents",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "student",
                "type": "address"
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
    }
];

async function initContract() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}
initContract();

async function createStudent(event) {
    event.preventDefault();

    const name = document.getElementById('studentName').value;
    const course = document.getElementById('studentCourse').value;
    const year = parseInt(document.getElementById('studentYear').value) || 1;
    const semester = parseInt(document.getElementById('studentSemester').value) || 1;
    const paidFees = document.getElementById('studentPaidFees').value === 'true';
    const completedModules = document.getElementById('studentCompletedModules').value.split(',');
    console.log(completedModules);

    const accounts = await web3.eth.getAccounts();
    const studentAddress = accounts[0];

    console.log('pooo')

    await contract.methods.addStudent(name, course, year, semester, paidFees).send({ from: studentAddress });

    console.log('shit')
    for (let i = 0; i < completedModules.length; i++) {
        console.log(completedModules[i]);
        await contract.methods.addCompletedModule(studentAddress, completedModules[i]).send({ from: studentAddress });
    }
    displayStudents();
}

async function displayStudents() {
    const accounts = await web3.eth.getAccounts();
    const student = await getStudentBlock(accounts[0]);  // Display for the current account

    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.year}</td>
            <td>${student.semester}</td>
            <td>${student.paidFees}</td>
            <td class="scrollableList">
                ${student.completedModules}
            </td>
        </tr>
    `;
    console.log(student)
    console.log(student.completedModules)
}

async function getStudentBlock(address) {
    const student = await contract.methods.getStudent(address).call();
    return new Student(
        student.id,
        student.name,
        student.course,
        student.year,
        student.semester,
        student.paidFees,
        student.completedModules
    );
}