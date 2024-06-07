'use client';
import {
  PDFViewer,
  Font,
  Page,
  Text,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
// import Image from 'next/image';

interface Question {
  question: string;
  type: string;
  choices: string[];
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    margin: 12,
    fontFamily: 'Oswald',
  },
  question: {
    fontSize: 12,
    fontWeight: 'bold',
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    margin: 8,
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  mc: {
    fontSize: 8,
    lineHeight: 0.5,
  },
});

export const PDFPreview = ({ questions }: { questions: Question[] }) => {
  return (
    <PDFViewer>
      <Document>
        <Page style={styles.body}>
          <Text style={styles.title}>Homework 1</Text>
          <Text style={styles.author}>{new Date().toDateString()}</Text>
          {/* <Image style={styles.image} src="/images/quijote1.jpg" /> */}
          {questions.map((q) => (
            <>
              <Text style={styles.question}>{q.question}</Text>
              {q.choices
                ? q.choices.map((answer) => (
                  <Text style={styles.text}>{answer}</Text>
                ))
                : ' '}
            </>
          ))}
          {/* <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      /> */}
        </Page>
      </Document>
    </PDFViewer>
  );
};

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
