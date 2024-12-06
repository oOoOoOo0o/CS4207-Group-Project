let students = [];
let modules = [];

window.onload = function() {
    const studentCreationForm = document.getElementById('studentForm');
    studentCreationForm.addEventListener('submit', createStudent);
    const moduleCreationForm = document.getElementById('moduleForm');
    moduleCreationForm.addEventListener('submit', createModule);
}


// Student creation & display


// Module creation & display
