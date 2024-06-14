-- Create Teachers table
CREATE TABLE Teachers (
    teacher_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    hire_date DATE NOT NULL,
    department VARCHAR(50),
    subjects_taught VARCHAR(255),
    grades_taught VARCHAR(50)
);

-- Create Students table
CREATE TABLE Students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    enrollment_date DATE NOT NULL,
    grade_level VARCHAR(10)
);

-- Create Courses table
CREATE TABLE Courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(10) UNIQUE NOT NULL,
    credits INTEGER NOT NULL,
    description TEXT
);

-- Create Teacher_Courses table
CREATE TABLE Teacher_Courses (
    teacher_course_id SERIAL PRIMARY KEY,
    teacher_id INTEGER NOT NULL REFERENCES Teachers(teacher_id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES Courses(course_id) ON DELETE CASCADE
);

-- Create Enrollments table
CREATE TABLE Enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES Students(student_id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES Courses(course_id) ON DELETE CASCADE,
    semester VARCHAR(10) NOT NULL,
    grade VARCHAR(2)
);

-- Create Assignments table
CREATE TABLE Assignments (
    assignment_id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES Courses(course_id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES Students(student_id) ON DELETE CASCADE,
    questions TEXT[] NOT NULL,
    answers TEXT[] NOT NULL,
    number_incorrect INTEGER NOT NULL DEFAULT 0,
    feedback TEXT[],
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes to improve performance
CREATE INDEX idx_teacher_courses_teacher ON Teacher_Courses(teacher_id);
CREATE INDEX idx_teacher_courses_course ON Teacher_Courses(course_id);
CREATE INDEX idx_enrollments_student ON Enrollments(student_id);
CREATE INDEX idx_enrollments_course ON Enrollments(course_id);
CREATE INDEX idx_assignments_course ON Assignments(course_id);
CREATE INDEX idx_assignments_student ON Assignments(student_id);
