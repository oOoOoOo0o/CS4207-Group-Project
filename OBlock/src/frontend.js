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

            if (columns.length >= 4 && columns.every(col => col.trim() !== '')) {
                const name = columns[0].trim();
                const course = columns[1].trim();
                const year = parseInt(columns[2].trim()) || 1;
                const semester = parseInt(columns[3].trim()) || 1;

                const student = new Student(name, course, year, semester);
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