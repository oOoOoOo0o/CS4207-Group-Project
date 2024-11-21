#include "Module.h"

Module::Module(string code, int maxCapacity) {
  this->code = code;
  this->maxCapacity = maxCapacity;
  this->enrolledStudents = vector<Student*>();
  this->requisiteModules = vector<Module*>();
  this->compatibleCourses = vector<string>();
}

string Module::getModuleCode() {
  return this->code;
}

int Module::getMaxCapacity() {
  return this->maxCapacity;
}

void Module::getMaxCapacity(int maxCapacity) {
  this->maxCapacity = maxCapacity;
}

vector<Student *> Module::getEnrolledStudents() {
  return this->enrolledStudents;
}

vector<Module *> Module::getRequisiteModules() {
  return this->requisiteModules;
}

vector<string> Module::getCompatibleCourses() {
  return this->compatibleCourses;
}

void Module::addEnrolledStudent(Student* student) {
  this->enrolledStudents.push_back(student);
}

bool Module::removeEnrolledStudent(Student* student) {
}

bool Module::isStudentEnrolled(Student* student) {
}

void Module::addRequisiteModule(Module* module) {
  this->requisiteModules.push_back(module);
}

bool Module::removeRequisiteModule(Module* module) {
}

void Module::removeOverbookings() {
}