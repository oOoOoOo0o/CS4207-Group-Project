async function enrollStudentInModule() {
    const studentName = document.getElementById('studentNameEnrolment').value;
    const moduleCode = document.getElementById('moduleCodeEnrolment').value;

    const accounts = await web3.eth.getAccounts();
    const studentAddress = accounts[0];

    const latestBlock = await web3.eth.getBlock('latest');
    const idx = latestBlock.number;
    const hash = latestBlock.hash;
    const data = "{name: '${studentName}', module: '${moduleCode}'}"

    console.log("Mining block")
    console.log(idx, hash, data);
    await contract.methods.mineBlock(idx, Date.now(), hash, data, 20)
    console.log("Block successfully mined")

    await contract.methods.enrollStudent(moduleCode, studentName).send({from: studentAddress});

    displayModules();
}
