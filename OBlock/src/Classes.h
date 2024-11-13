#pragma once
#include <stdio.h>
#include <string>
#include <vector>
#include <iostream>

using namespace std;

class Student {
private:
	int id;
	string name;
	vector<Course> currentCourses;
	vector<Course> completedCourses;
	bool paid;

public:
	Student(int id, string name, bool paid) {
		this->id = id;
		this->name = name;
		this->paid = paid;
	}

	int getId() {
		return id;
	}

	string getName() {
		return name;
	}

	bool isPaid() {
		return paid;
	}

	vector<Course> getCurrent() {
		return currentCourses;
	}

	Course getCurrent(int i ) {
		return currentCourses[i];
	}

	vector<Course> getCompleted() {
		return completedCourses;
	}

	Course getCompleted(int i) {
		return completedCourses[i];
	}

	void enroll(Course c) {
		currentCourses.push_back(c);
	}

	void graduate(string code) {
		for (int i = 0; i < currentCourses.size(); i++) {
			if (currentCourses[i].getCode() == code) {
				completedCourses.push_back(currentCourses[i]);
				currentCourses.erase(currentCourses.begin() + i);
				break;
			}
		}
	}
};

class Course {
private:
	string code;
	int capacity;
	vector<Student> students;
	vector<Course> prereqs;

public:
	Course(string c, int cap) {
		code = c;
		capacity = cap;
	}

	string getCode() {
		return code;
	}

	int getCapacity() {
		return capacity;
	}

	void addReq(Course c) {
		prereqs.push_back(c);
	}

	Course getReq(int i) {
		return prereqs[i];
	}

	vector<Student> getStudents() {
		return students;
	}

	Student getStudent(int i){
		return students[i];
	}

	void enroll(Student s) {
		if (students.size() < capacity) {
			students.push_back(s);
		}
	}
};