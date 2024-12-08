class Student {
    constructor(id, name, course, year, semester, paidFees, completedModules) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.year = year;
        this.semester = semester;
        this.paidFees = paidFees;
        this.completedModules = completedModules;
    }
}

async function createStudent(event) {
    event.preventDefault();

    const name = document.getElementById('studentName').value;
    const course = document.getElementById('studentCourse').value;
    const year = parseInt(document.getElementById('studentYear').value) || 1;
    const semester = parseInt(document.getElementById('studentSemester').value) || 1;
    const paidFees = document.getElementById('studentPaidFees').value === 'true';
    const completedModules = document.getElementById('studentCompletedModules').value.split(',');

    const accounts = await web3.eth.getAccounts();
    const studentAddress = accounts[0];

    await contract.methods.addStudent(name, course, year, semester, paidFees).send({ from: studentAddress });

    for (let i = 0; i < completedModules.length; i++) {
        await contract.methods.addCompletedModule(studentAddress, completedModules[i]).send({ from: studentAddress });
    }
    displayStudents();
}

async function displayStudents() {
    const accounts = await web3.eth.getAccounts();
    const student = await getStudentBlock(accounts[0]);  // Display for the current account

    const studentTableBody = document.getElementById('studentTableBody');

    let row = document.createElement('tr');
    row.innerHTML = `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.year}</td>
            <td>${student.semester}</td>
            <td>${student.paidFees}</td>
            <td class="scrollableList">
                ${student.completedModules.map(module => `
                   <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #aaa;">
                       <span>${module}</span>
                   </div>
               `).join('<br>')}
            </td>
        </tr>
    `;

    studentTableBody.appendChild(row);
}

async function getStudentBlock(address) {
    const student = await contract.methods.getStudent(address).call();
    return new Student(
        student.id,
        student.name,
        student.course,
        student.year,
        student.semester,
        student.paidFees,
        student.completedModules
    );
}