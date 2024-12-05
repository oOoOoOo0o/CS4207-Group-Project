class Student {
    static studentCount = 0;

    constructor(name, course, year = 1, semester = 1) {
        this.id = Student.studentCount++;
        this.name = name;
        this.course = course;
        this.year = year;
        this.semester = semester;
        this.paidFees = false; // Default value
        this.completedModuleCodes = [];
    }

    // Getters and setters
    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getCourse() {
        return this.course;
    }

    setCourse(course) {
        this.course = course;
    }

    getYear() {
        return this.year;
    }

    setYear(year) {
        this.year = year;
    }

    getSemester() {
        return this.semester;
    }

    setSemester(semester) {
        this.semester = semester;
    }

    getPaidFees() {
        return this.paidFees;
    }

    setPaidFees(paidFees) {
        this.paidFees = paidFees;
    }

    getCompletedModules() {
        return this.completedModuleCodes;
    }

    addCompletedModule(module) {
        if (module instanceof Module) {
            this.completedModuleCodes.push(module);
        } else {
            console.error("Invalid module");
        }
    }
}