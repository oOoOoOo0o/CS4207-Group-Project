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
