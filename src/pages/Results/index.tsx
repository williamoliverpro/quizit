import { useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Divider,
  useMediaQuery,
  useTheme
} from "@material-ui/core"

import { QuizContext } from "../../contexts/QuizContexts"

type QuestionItem = {
  id: string
  question: string
  correct_answer: string
  incorrect_answers: []
  options: []
}

export default function Results() {
  const { questions, answers, hits, amount } = useContext(QuizContext)
  const [isShowDetails, setIsShowDetails] = useState(false)
  const [percentageOfSuccesses, setPercentageOfSuccesses] = useState(0)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    setPercentageOfSuccesses(Math.round((hits / questions.length) * 100))
  }, [questions, hits])

  if (isShowDetails) {
    return (
      <Box
        mx="auto"
        px="1rem"
        display="flex"
        minHeight="90vh"
        maxHeight="100vh"
        maxWidth="940px"
        flexDirection="column"
        justifyContent="space-between">
        <Box>
          <Typography
            fontSize={matches ? "2rem": "1.5rem"}
            color="#293845"
            fontWeight="bold"
            textAlign="center"
            py="1rem"
            marginBottom="1rem">
            You scored {percentageOfSuccesses}%
            <Typography
              fontSize="1rem"
              color="rgb(156, 156, 156)"
              fontWeight="bold"
              textAlign="center">
              You earned {amount}xp with this quiz
            </Typography>
          </Typography>

          {questions.map((question: QuestionItem, index: number) => (
            <>
              <Box marginTop="1rem" marginBottom="1rem">
                <FormControl
                  component="fieldset"
                  error={answers[index] !== question.correct_answer ? true : false}>
                  <FormLabel
                    focused={true}
                    key={question.id}
                    component="legend" >
                    {(`${Number(question.id) + 1} - ${question.question}`)}
                  </FormLabel>

                  <RadioGroup name={question.id}>
                    {question.options.map((option) => (
                      <FormControlLabel
                        name={question.id}
                        disabled
                        control={<Radio />}
                        label={option + (option === question.correct_answer ? ' - Correct answer' : '')} checked={answers[index] === option ? true : false} />
                    ))}
                  </RadioGroup>

                  <FormHelperText>
                    {(question.correct_answer === answers[index]) ? 'You got it! 🥳' : 'Sorry, wrong answer! 😢'}
                  </FormHelperText>
                </FormControl>
              </Box>
              {(questions.length - 1) !== index && <Divider />}
            </>
          ))}
        </Box>

        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          py="2rem"
          marginTop="2rem">
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            fullWidth={!matches}
            size="large">
            Home Page
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Box
        mx="auto"
        px="1rem"
        maxWidth="940px"
        minHeight="90vh"
        maxHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Typography
          fontSize={matches ? "2rem": "1.5rem"}
          color="#293845"
          fontWeight="bold"
          textAlign="center"
          py="1rem"
          marginBottom="1rem">
          You scored {percentageOfSuccesses}%
            <Typography
            fontSize="1rem"
            color="rgb(156, 156, 156)"
            fontWeight="bold"
            textAlign="center"
          >
            You earned {amount}xp with this quiz
            </Typography>
        </Typography>

        <Typography fontSize="4rem" textAlign="center">
          {percentageOfSuccesses > 70 ? (<>🥳</>) : (<>😢</>)}
        </Typography>

        <Box
          mx="auto"
          width="100%"
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap">
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth={!matches}
            onClick={() => setIsShowDetails(true)}>
            Details
          </Button>

          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            fullWidth={!matches}
            style={matches ? {} : {
              marginTop: '1rem'
            }}
            size="large">
            Home Page
          </Button>
        </Box>
      </Box>
    </>
  )
}