let moduleKeys = ['CS4123'];

class Module {
    constructor(code, maxCapacity, students, compatibleCourses, requisiteModules) {
        this.code = code;
        this.courses = compatibleCourses;
        this.maxCapacity = maxCapacity;
        this.students = students;
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
        await contract.methods.addCompatibleCourse(code, compatibleCourses[i]).send({ from: address });
    }

    for (let i = 0; i < requisites.length; i++) {
        await contract.methods.addRequisiteModule(code, requisites[i]).send({ from: address });
    }

    moduleKeys.push(code);
    displayModules();
}

async function displayModules() {
    const moduleTableBody = document.getElementById('moduleTableBody');
    moduleTableBody.innerHTML = '';

    for (let i = 0; i < moduleKeys.length; i++) {
        const module = await contract.methods.getModule(moduleKeys[i]).call();
        console.log(module);
        let row = document.createElement('tr');
        row.innerHTML = `
           <td>${module.code}</td>
           <td>${module.maxCapacity}</td>
           <td>${module.students.length}</td>
           <td class="scrollableList">
               <div>${module.students.map(student => `
                   <div style="border-bottom: 1px solid #aaa;">
                       <span>${student}</span>
                   </div>
               `).join('')}</div>
           </td>
           <td class="scrollableList">
               ${module.compatibleCourses.map(course => `<span>${course}</span>`).join('<br>')}
           </td>
           <td class="scrollableList">
               ${module.requisiteModules.map(course => `<span>${course}</span>`).join('<br>')}
           </td>
       `;
        moduleTableBody.appendChild(row);
    }
}