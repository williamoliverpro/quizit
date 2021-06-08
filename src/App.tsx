import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { teal } from '@material-ui/core/colors'

import { QuizProvider } from './contexts/QuizContexts'
import './global.css'

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
})

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
          amount={props.amount}
          >

          <Router>
            <Routes />
          </Router>
        </QuizProvider>
      </ThemeProvider>
    </>
  )
}