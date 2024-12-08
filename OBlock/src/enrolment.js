const address = 0xc953bE32407D60339dEb01b33428Cc883ECF9FDb
const ABI =

async function enrollStudentInModule() {
    const studentName = document.getElementById('studentNameEnrolment').value;
    const moduleCode = document.getElementById('moduleCodeEnrolment').value;

    const accounts = await web3.eth.getAccounts();
    const studentAddress = accounts[0];

    const Wev3 = require('web3');
    const web3 = new Web3('http://127.0.0.1:7545');

    const latestBlock = await web3.eth.getBlock('latest');
    const idx = latestBlock.number;
    const hash = latestBlock.hash;
    const data = "{name: '${studentName}', module: '${moduleCode}'}"

    console.log("Mining block")
    await contract.methods.mineBlock(idx, Date.now(), hash, data, 2)
    console.log("Block successfully mined")

    await contract.methods.enrollStudent(moduleCode, studentName).send({from: studentAddress});

    displayModules();
}
