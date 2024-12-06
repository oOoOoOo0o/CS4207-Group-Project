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