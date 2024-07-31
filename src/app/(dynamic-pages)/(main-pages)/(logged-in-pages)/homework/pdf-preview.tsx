'use client';
import {
  PDFViewer,
  Font,
  Page,
  Text,
  Document,
  Svg,
  Path,
  View,
} from '@react-pdf/renderer';
import { styles } from './styles';
// import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
// interface Question {
//   question: string;
//   type: string;
//   choices: string[];
// }
import { Question } from '@/types';
import { Student } from '@/types';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const baseGradeURL =
  process.env.NODE_ENV === 'development'
    ? 'https://f906-2-139-165-61.ngrok-free.app/grade'
    : 'https://www.assistteacher.com/grade';

function getQRPath(assignment_template_id: string, student_id: number): string {
  const qrCodesArrayWithUndefineds = QRCodeSVG({
    value: `${baseGradeURL}/${assignment_template_id}/${student_id}`,
  }).props.children.map((child) => {
    if (child?.props?.d?.length > 50) {
      return child.props.d;
    }
  });
  const qrCodesArray = qrCodesArrayWithUndefineds.filter(
    (el) => el !== undefined
  );
  const [goodPath] = qrCodesArray;
  return goodPath;
}

const az = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const PDFPreview = ({
  course_name = '<Course Name>',
  questions,
  assignment_template_id = '',
  students = [],
}: {
  course_name: string;
  questions: Question[];
  assignment_template_id: string;
  students: Student[];
}) => {
  return (
    <>
      <PDFViewer>
        <Document>
          {students.map((student, i) => (
            <Page key={i} style={styles.body}>
              <Text style={styles.title}>{course_name} | Homework 1</Text>
              <Text style={styles.author}>
                {student.first_name} {student.last_name} |{' '}
                {new Date().toDateString()}
              </Text>
              <View style={styles.qr}>
                <Svg width="100" height="100">
                  <Path
                    d="M0,0 h29v29H0z"
                    fill="white"
                    shape-rendering="crispEdges"
                  />
                  <Path
                    d={getQRPath(assignment_template_id, student.id)}
                    fill="black"
                    shape-rendering="crispEdges"
                  ></Path>
                </Svg>
              </View>

              {questions.map((q, i) => (
                <View key={i}>
                  <Text style={styles.question}>
                    {`${i + 1}.`} {q.question_text}
                  </Text>
                  {q.answer_choices
                    ? qChoicesMap(q.answer_choices, styles)
                    : ' '}
                </View>
              ))}
            </Page>
          ))}
        </Document>
      </PDFViewer>
    </>
  );
};

function qChoicesMap(qChoices: string[], styles: { text: object }) {
  return qChoices.map((answer, i) => (
    <Text style={styles.text}>
      {`${az[i]}) `}
      {answer}
    </Text>
  ));
}
