const EnrollmentSystemStorage = artifacts.require('EnrollmentSystemStorage');
module.exports = function(deployer) {
    deployer.deploy(EnrollmentSystemStorage, 'test');
}