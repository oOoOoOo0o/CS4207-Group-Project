#include "Student.h"

int Student::studentCount = 1;

Student::Student(string name, string course, int year, int semester) {
  this->id = studentCount;
  this->name = name;
  this->course = course;
  this->year = year;
  this->semester = semester;
  this->paidFees = false;
  this->completedModuleCodes = vector<void*>();
  studentCount++;
}

Student::Student(string name, string course) 
  : Student(name, course, 1, 1) {
}

int Student::getId() {
  return this->id;
}

string Student::getName() {
  return this->name;
}

void Student::setName(string name) {
  this->name = name;
}

string Student::getCourse() {
  return this->course;
}

void Student::setCourse(string course) {
  this->course = course;
}

int Student::getYear() {
  return this->year;
}

void Student::setYear(int year) {
  this->year = year;
}

int Student::getSemester() {
  return this->semester;
}

void Student::setSemester(int semester) {
  this->semester = semester;
}

bool Student::getPaidFees() {
  return this->paidFees;
}

void Student::setPaidFees(bool paidFees) {
  this->paidFees = paidFees;
}

void Student::addCompletedModule(void* modulePtr) {
  this->completedModuleCodes.push_back(modulePtr);
}

vector<void *> Student::getCompletedModules() {
  return this->completedModuleCodes;
}
