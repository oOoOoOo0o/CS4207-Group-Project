let students = [];
let modules = [];

window.onload = function() {
    // Event listeners
    const studentCreationForm = document.getElementById('studentForm');
    studentCreationForm.addEventListener('submit', createStudent);
    const moduleCreationForm = document.getElementById('moduleForm');
    moduleCreationForm.addEventListener('submit', createModule);

    displayStudents();
    displayModules();
    populateStudentDropdown();
    populateModuleDropdown();
}

const web3 = new Web3(window.ethereum);

let contract;
const contractAddress = '0x7CFE0b61816C4CB8A5df939dcd724cC10CAE13A8';
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
                        "internalType": "address[]",
                        "name": "students",
                        "type": "address[]"
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
    }
];

async function initContract() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

initContract();

function populateStudentDropdown() {
    const studentSelect = document.getElementById("selectStudent");

    studentSelect.innerHTML = '';

    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select a student";
    defaultOption.value = "test";
    studentSelect.appendChild(defaultOption);

    students.forEach(student => {
        const option = document.createElement("option");
        option.value = student.id;
        option.textContent = student.name;
        studentSelect.appendChild(option);
    });
}


function loadStudentsFromCSV() {
    const fileInput = document.getElementById('studentCsv');
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a CSV file!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n').filter(row => row.trim() !== '');

        for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(',');

            if (columns.length >= 6 && columns.every(col => col.trim() !== '')) {
                const name = columns[0].trim();
                const course = columns[1].trim();
                const year = parseInt(columns[2].trim()) || 1;
                const semester = parseInt(columns[3].trim()) || 1;
                const paidFees = columns[4].trim().toLowerCase() === 'true';
                const completedModuleCodes = parseModuleCodes(columns[5]);

                const student = new Student(name, course, year, semester, paidFees, completedModuleCodes);
                console.log('Added student: ${name}, ${course}, Year: ${year}, Semester: ${semester} to array');
                students.push(student);
            } else {
                console.warn('Skipped invalid row: ${rows[i]}');
            }
        }

        displayStudents();
        alert("Students loaded successfully from CSV!");
    };

    reader.onerror = function () {
        alert("Failed to read the file!");
    };

    reader.readAsText(file);
}

function parseModuleCodes(line) {
    let codes = line.replace('"[', '');
    codes = codes.replace(']"', '');
    codes = codes.trim();

    if (codes === '') {
        return [];
    }
    return codes.split(' ');
}

function populateModuleDropdown() {
    const moduleSelect = document.getElementById("selectModule");

    moduleSelect.innerHTML = '';

    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select a module";
    defaultOption.value = "";
    moduleSelect.appendChild(defaultOption);

    modules.forEach(module => {
        const option = document.createElement("option");
        option.value = module.code;
        option.textContent = module.code;
        moduleSelect.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", function() {
document.getElementById("submitModuleCsv").addEventListener("click", function(event) {
    event.preventDefault();

    const fileInput = document.getElementById("moduleCsv");
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a CSV file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const csvData = e.target.result;
        parseCsvAndLoadModules(csvData);
    };

    reader.onerror = function() {
        alert("An error occurred while reading the file.");
        return;
    };

    reader.readAsText(file);
});
});
function parseCsvAndLoadModules(csvData) {
    const rows = csvData.split("\n").map(row => row.trim()).filter(row => row);
    const headers = rows.shift().split(",").map(header => header.trim());

    rows.forEach(row => {
        const values = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map(value => value.replace(/(^"|"$)/g, '').trim());
        const moduleData = {};

        headers.forEach((header, index) => {
            moduleData[header] = values[index];
        });

        const newModule = new Module(moduleData["Code"], parseInt(moduleData["Max Capacity"]));

        if (moduleData["Enrolled Students"]) {
            newModule.enrolledStudents = moduleData["Enrolled Students"].split(",").map(name => name.trim());
        }
        if (moduleData["Courses"]) {
            newModule.courses = moduleData["Courses"].split(",").map(course => course.trim());
        }
        if (moduleData["Requisite Modules"]) {
            newModule.requisiteModules = moduleData["Requisite Modules"].split(",").map(requisite => requisite.trim());
        }

        modules.push(newModule);
    });

    displayModules();
}
