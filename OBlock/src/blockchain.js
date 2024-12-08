// Function to add a student
async function addStudent(name, course, year, semester, fromAddress) {
    await enrollmentContract.methods
        .addStudent(name, course, year, semester)
        .send({ from: fromAddress });
    console.log("Student added successfully");
}

// Function to create a module
async function addModule(code, maxCapacity, fromAddress) {
    await enrollmentContract.methods
        .createModule(code, maxCapacity)
        .send({ from: fromAddress });
    console.log("Module created successfully");
}

// Function to enroll a student in a module
async function enrollInModule(moduleCode, fromAddress) {
    await enrollmentContract.methods
        .enrollInModule(moduleCode)
        .send({ from: fromAddress });
    console.log("Student enrolled successfully");
}

// Fetching enrolled students for a module
async function getEnrolledStudents(moduleCode) {
    let students = await enrollmentContract.methods
        .getEnrolledStudents(moduleCode)
        .call();
    console.log("Enrolled Students:", students);
}
