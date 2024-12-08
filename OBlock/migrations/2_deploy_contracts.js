const StudentEnrolment = artifacts.require('StudentEnrolment');
module.exports = function(deployer) {
    deployer.deploy(StudentEnrolment, 'test');
}