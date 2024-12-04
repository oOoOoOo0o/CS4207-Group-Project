class Module {

    constructor(code, courses = [], maxCapacity) {
        this.code = code;
        this.courses = courses;
        this.maxCapacity = maxCapacity;
        this.enrolledStudents = [];
        this.requisiteModules = [];
        this.compatibleCourses = [];
    }

    // Getters and setters
    getModuleCode() {
        return this.code;
    }

    getCourses() {
        return this.courses;
    }

    getMaxCapacity() {
        return this.maxCapacity;
    }

    setMaxCapacity(maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    getEnrolledStudents() {
        return this.enrolledStudents;
    }

    getRequisiteModules() {
        return this.requisiteModules;
    }

    getCompatibleCourses() {
        return this.compatibleCourses;
    }

    addCourse(course) {
        this.courses.push(course);
    }

    addEnrolledStudent(student) {
        if (this.enrolledStudents.length < this.maxCapacity) {
            this.enrolledStudents.push(student);
            return true;
        }
        return false;
    }

    removeEnrolledStudent(student) {
        const index = this.enrolledStudents.indexOf(student);
        if (index !== -1) {
            this.enrolledStudents.splice(index, 1);
            return true;
        }
        return false;
    }

    isStudentEnrolled(student) {
        return this.enrolledStudents.includes(student);
    }


    addRequisiteModule(module) {
        this.requisiteModules.push(module);
    }

    removeRequisiteModule(module) {
        const index = this.requisiteModules.indexOf(module);
        if (index !== -1) {
            this.requisiteModules.splice(index, 1);
            return true;
        }
        return false;
    }

    // For when capacity is reduced
    removeOverbookings() {
        if (this.enrolledStudents.length > this.maxCapacity) {
            this.enrolledStudents.splice(this.maxCapacity);
        }
    }
}