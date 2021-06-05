import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';

import { ChallengesProvider } from './contexts/QuizContexts'
import './global.css'
interface AppProps {
  quantity: number
  answers: any
  questions: []
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
        <ChallengesProvider quantity={props.quantity}
          answers={props.answers}
          questions={props.questions}>
          <Router>
            <Routes />
          </Router>
        </ChallengesProvider>
      </ThemeProvider>
    </>
  )
}