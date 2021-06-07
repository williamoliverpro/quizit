import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

import { QuizProvider } from './contexts/QuizContexts'
import './global.css'
import { FC } from 'react';

type QuestionItem = {
  id: string
  question: string
  correct_answer: string
  incorrect_answers: []
  options: []
}
interface AppProps {
  quantity: number
  answers: { [key: string]: any }
  questions: QuestionItem[]
  level: number
  currentExperience: number
  experienceToNextLevel: number
  quizzesCompleted: number
  hits: number
}

const theme = createTheme({
  palette: {
    primary: teal,
  },
  typography: {
    button: {
      color: 'red',
      textTransform: 'capitalize',
      width: '20rem'
    }
  }
});

export default function App(props: any) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QuizProvider
          quantity={props.quantity}
          answers={props.answers}
          questions={props.questions}
          level={props.level}
          currentExperience={props.currentExperience}
          experienceToNextLevel={props.experienceToNextLevel}
          quizzesCompleted={props.quizzesCompleted}
          hits={props.hits}
          >

          <Router>
            <Routes />
          </Router>
        </QuizProvider>
      </ThemeProvider>
    </>
  )
}