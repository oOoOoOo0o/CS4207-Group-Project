cmake_minimum_required(VERSION 3.24)
project(wk5lab)

set(CMAKE_CXX_STANDARD 17)

add_executable(wk5lab main.cpp Student/Student.cpp Student/Student.h Module/Module.cpp Module/Module.h EnrollmentSystem/EnrollmentSystem.cpp EnrollmentSystem/EnrollmentSystem.h)
