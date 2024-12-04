
function canStudentEnrollInModule(student, module) {
    // Check if the student has paid fees
    if (student.getPaidFees()) {
        return false;
    }

    // Check if the course names match
    if (student.getCourse() !== module.getCourse()) {
        return false;
    }

    // Check course capacity
    const maxCapacity = module.getMaxCapacity();
    const currCapacity = module.getEnrolledStudents().length;
    if (maxCapacity <= currCapacity) {
        return false;
    }

    // Check if the student has completed the requisite modules
    const requiredModules = module.getRequisiteModules();
    const completedModules = student.getCompletedModules();
    for (let reqModule of requiredModules) {
        let found = false;
        for (let completedModule of completedModules) {
            if (reqModule === completedModule) {
                found = true;
                break;
            }
        }
        if (!found) {
            return false;
        }
    }

    return true;
}

function enrollStudentInModule(student, module) {
    if (canStudentEnrollInModule(student, module)) {
        return module.addEnrolledStudent(student);
    }
    return false;
}
