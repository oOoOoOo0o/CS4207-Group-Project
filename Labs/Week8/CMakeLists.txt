cmake_minimum_required(VERSION 3.24)
project(wk8lab)

set(CMAKE_CXX_STANDARD 17)

add_executable(wk8lab main.cpp Student/Student.cpp Student/Student.h Module/Module.cpp Module/Module.h EnrollmentSystem/EnrollmentSystem.cpp EnrollmentSystem/EnrollmentSystem.h)
