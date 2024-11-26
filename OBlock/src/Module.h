#ifndef MODULE_H
#define MODULE_H

#include <string>
#include <vector>

#include "Student.h"

using namespace std;

class Module {
private:
  string code;
  string course;
  int maxCapacity;
  vector<Student*> enrolledStudents;
  vector<Module*> requisiteModules;
  vector<string> compatibleCourses;
  // other pre-reqs can be added as they come up

public:
  Module(string, string, int);

  // Getters and setters
  string getModuleCode();
  string getCourse();
  int getMaxCapacity();
  void getMaxCapacity(int);
  vector<Student*> getEnrolledStudents();
  vector<Module*> getRequisiteModules();
  vector<string> getCompatibleCourses();

  int getEnrolledStudentIndex(Student*);
  bool addEnrolledStudent(Student*); // true if successful
  bool removeEnrolledStudent(Student*); // true if successful
  bool isStudentEnrolled(Student*);
  void addRequisiteModule(Module*); // true if successful
  bool removeRequisiteModule(Module*); // true if successful

  void removeOverbookings();
};

#endif //MODULE_H
