import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { v4 as uuidv4 } from 'uuid';

let templateId, courseId, studentId;

import { createClient } from '@supabase/supabase-js';

global.supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

beforeAll(async () => {
  // Set up test data
  const { data: courseData, error: courseError } = await supabase
    .from('Courses')
    .insert({
      course_name: `Test Course ${uuidv4()}`,
      course_code: `TC${Math.floor(Math.random() * 1000)}`,
      credits: 3,
      description: 'Test course description',
    })
    .single();

  courseId = courseData.course_id;

  const { data: studentData, error: studentError } = await supabase
    .from('Students')
    .insert({
      first_name: 'Test',
      last_name: 'Student',
      email: `teststudent${uuidv4()}@example.com`,
      phone_number: '1234567890',
      enrollment_date: new Date().toISOString().slice(0, 10),
      grade_level: '10',
    })
    .single();

  studentId = studentData.student_id;

  const { data: templateData, error: templateError } = await supabase
    .from('AssignmentTemplates')
    .insert({
      template_name: `Test Template ${uuidv4()}`,
    })
    .single();

  templateId = templateData.template_id;

  const questions = [
    { question_text: 'What is 2 + 2?' },
    { question_text: 'Explain gravity.' },
  ];

  const { data: insertedQuestions, error: questionsError } = await supabase
    .from('Questions')
    .insert(questions)
    .select();

  const templateQuestions = insertedQuestions.map((q) => ({
    template_id: templateId,
    question_id: q.question_id,
  }));

  await supabase.from('TemplateQuestions').insert(templateQuestions);
});

afterAll(async () => {
  // Clean up test data
  await supabase.from('Courses').delete().eq('course_id', courseId);
  await supabase.from('Students').delete().eq('student_id', studentId);
  await supabase
    .from('AssignmentTemplates')
    .delete()
    .eq('template_id', templateId);
});

describe('Assignment Creation', () => {
  it('should create an assignment with linked questions', async () => {
    const assignmentData = {
      template_id: templateId,
      course_id: courseId,
      student_id: studentId,
      feedback: [],
    };

    const { data: assignment, error: assignmentError } = await supabase
      .from('Assignments')
      .insert(assignmentData)
      .single();

    expect(assignmentError).toBeNull();
    expect(assignment).toBeDefined();
    expect(assignment.template_id).toBe(templateId);
    expect(assignment.course_id).toBe(courseId);
    expect(assignment.student_id).toBe(studentId);

    // Fetch questions for the created assignment using the view
    const { data: questions, error: questionsError } = await supabase
      .from('assignment_questions_view')
      .select('*')
      .eq('assignment_id', assignment.assignment_id);

    expect(questionsError).toBeNull();
    expect(questions.length).toBeGreaterThan(0);
    questions.forEach((question) => {
      expect(question.assignment_id).toBe(assignment.assignment_id);
    });
  });
});
