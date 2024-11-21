#ifndef STUDENT_H
#define STUDENT_H

#include <vector>
#include <string>

using namespace std;

class Student {
private:
  static int studentCount;
  int id;
  string name;
  string course;
  int year;
  int semester;
  bool paidFees;
  // We are using a void pointer to avoid circular dependency, this will be a vector of pointers to Modules
  vector<void*> completedModuleCodes;

public:
  Student(string, string, int, int);
  Student(string, string); // Non specified year/semester will default to 1, 1

  // Getters and setters
  int getId();
  string getName();
  void setName(string);
  string getCourse();
  void setCourse(string);
  int getYear();
  void setYear(int);
  int getSemester();
  void setSemester(int);
  bool getPaidFees();
  void setPaidFees(bool);
  void addCompletedModule(void*);
  vector<void*> getCompletedModules();
};

#endif //STUDENT_H
