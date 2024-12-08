async function enrollStudentInModule() {
    const studentName = document.getElementById('studentNameEnrolment').value;
    const moduleCode = document.getElementById('moduleCodeEnrolment').value;

    const accounts = await web3.eth.getAccounts();
    const studentAddress = accounts[0];

    await contract.methods.enrollStudent(moduleCode, studentName).send({from: studentAddress});

    displayModules();
}
