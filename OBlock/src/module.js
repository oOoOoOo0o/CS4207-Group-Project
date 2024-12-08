class Module {

    constructor(code, maxCapacity, students, compatibleCourses, requisiteModules) {
        this.code = code;
        this.courses = compatibleCourses;
        this.maxCapacity = maxCapacity;
        this.enrolledStudents = students;
        this.requisiteModules = requisiteModules;
    }
}

async function createModule(event) {
    event.preventDefault();

    const code = document.getElementById('moduleCode').value;
    const capacity = document.getElementById('moduleCapacity').value;
    const compatibleCourses = document.getElementById('compatibleCourses').value.split(',');
    const requisites = document.getElementById('requisites').value.split(',');

    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];

    await contract.methods.createModule(code, capacity).send({ from: address });

    for (let i = 0; i < compatibleCourses.length; i++) {
        await contract.methods.addCompatibleCourse(address, compatibleCourses[i]).send({ from: address });
    }

    for (let i = 0; i < requisites.length; i++) {
        await contract.methods.addRequisiteModule(address, requisites[i]).send({ from: address });
    }

    displayModules();
}

async function displayModules() {
    const accounts = await web3.eth.getAccounts();
    const module = await getModuleBlock(accounts[0]);

    const moduleTableBody = document.getElementById('moduleTableBody');
    moduleTableBody.innerHTML = '';

    let row = document.createElement('tr');
    row.innerHTML = `
           <td>${module.code}</td>
           <td>${module.maxCapacity}</td>
           <td>${module.enrolledStudents.length}</td>
           <td class="scrollableList">
               <div>${module.enrolledStudents.map(student => `
                   <div style="border-bottom: 1px solid #aaa;">
                       <span>${student.name}</span>
                   </div>
               `).join('')}</div>
           </td>
           <td class="scrollableList">
               ${module.courses.map(course => `<span>${course}</span>`).join('<br>')}
           </td>
           <td class="scrollableList">
               ${module.requisiteModules.map(course => `<span>${course}</span>`).join('<br>')}
           </td>
       `;
    moduleTableBody.appendChild(row);
}

async function getModuleBlock(address) {
    const module = await contract.methods.getModule(address).call();
    console.log(module);
    return new Module(
        module.code,
        module.maxCapacity,
        module.students,
        module.compatibleCourses,
        module.requisiteModules
    );
}
