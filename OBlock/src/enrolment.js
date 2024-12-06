
function canStudentEnrollInModule(student, module) {
    if (module.enrolledStudents.find(s => s.id === student.id)) {
        alert("Student is already enrolled in this module!");
        return false;
    }

    // Check if the student has paid fees
    if (!student.paidFees) {
        alert("Student has not paid fees!");
        return false;
    }

    // Check if the student's course is in module's courses
    if (!module.courses.find(c => c === student.course)) {
        alert("Student is not in a course offering this module!");
        return false;
    }

    // Check course capacity
    const maxCapacity = module.maxCapacity;
    const currCapacity = module.enrolledStudents.length;
    if (maxCapacity <= currCapacity) {
        alert("There is not sufficient capacity in this module!");
        return false;
    }

    // Check if the student has completed the requisite modules
    const requiredModules = module.requisiteModules;
    const completedModuleCodes = student.completedModuleCodes;
    for (let reqModule of requiredModules) {
        let found = false;
        for (let completedModuleCode of completedModuleCodes) {
            if (reqModule.code === completedModuleCode) {
                found = true;
                break;
            }
        }
        if (!found) {
            alert("Student does has not completed all of the requisite modules!");
            return false;
        }
    }

    alert("Enrolment successful!");
    module.enrolledStudents.push(student);
    displayModules();
    return true;
}

function enrollStudentInModule() {
    const studentId = parseInt(document.getElementById("selectStudent").value);
    const student = students.find(student => student.id === studentId);

    const moduleCode = document.getElementById("selectModule").value;
    const module = modules.find(module => module.code === moduleCode);

    if (student && module) {
        if (canStudentEnrollInModule(student, module)) {
            return addEnrolledStudent(student, module);
        }
    } else {
        alert("Invalid student/module");
    }
    return false;
}
