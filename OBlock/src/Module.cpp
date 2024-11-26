#include "Module.h"

Module::Module(string code, string course, int maxCapacity) {
  this->code = code;
  this->course = course;
  this->maxCapacity = maxCapacity;
  this->enrolledStudents = vector<Student*>();
  this->requisiteModules = vector<Module*>();
  this->compatibleCourses = vector<string>();
}

string Module::getModuleCode() {
  return this->code;
}

string Module::getCourse() {
    return course;
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

int Module::getEnrolledStudentIndex(Student* student) {
  for (int i = 0; i < this->enrolledStudents.size(); i++) {
    if (this->enrolledStudents[i] == student) {
      return i;
    }
  }
  return -1;
}

bool Module::addEnrolledStudent(Student* student) {
  if (this->enrolledStudents.size() < this->maxCapacity) {
    this->enrolledStudents.push_back(student);
    return true;
  }
  return false;
}

bool Module::removeEnrolledStudent(Student* student) {
  const int index = this->getEnrolledStudentIndex(student);
  if (index == -1) {
    return false;
  }
  this->enrolledStudents.erase(this->enrolledStudents.begin() + index);
  return true;
}

bool Module::isStudentEnrolled(Student* student) {
  if (this->enrolledStudents.size() > 0) {
    for (int i = 0; i < this->enrolledStudents.size(); i++) {
      if (this->enrolledStudents[i] == student) {
        return true;
      }
    }
  }
  return false;
}

void Module::addRequisiteModule(Module* module) {
  this->requisiteModules.push_back(module);
}

bool Module::removeRequisiteModule(Module* module) {
  if (this->requisiteModules.size() > 0) {
    for (int i = 0; i < this->requisiteModules.size(); i++) {
      if (this->requisiteModules[i] == module) {
        this->requisiteModules.erase(this->requisiteModules.begin() + i);
        return true;
      }
    }
  }
  return false;
}

void Module::removeOverbookings() {
  this->enrolledStudents.erase(this->enrolledStudents.begin() + (this->maxCapacity - 1));
}