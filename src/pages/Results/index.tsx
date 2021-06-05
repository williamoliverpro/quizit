import { useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Typography, Divider } from "@material-ui/core"

import { QuizContext } from "../../contexts/QuizContexts"

type QuestionItem = {
  id: string
  question: string
  correct_answer: string
  incorrect_answers: []
  options: []
}

export default function Results() {
  const { quantity, questions, answers } = useContext<any>(QuizContext)
  const [isShowDetails, setIsShowDetails] = useState(false)
  const [percentageOfSuccesses, setPercentageOfSuccesses] = useState(0)

  useEffect(() => {
    let hits = 0

    for (let [index, question] of questions.entries()) {
      if (question.correct_answer == answers[index]) {
        hits++
      }

      setPercentageOfSuccesses(Math.round((hits / questions.length) * 100))
    }
  }, [questions, answers])

  if (isShowDetails) {
    return (
      <Box mx="auto" my="5rem" px="1rem" sx={{
        maxWidth: 940,
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Typography sx={{
          fontSize: "2rem",
          color: '#293845',
          fontWeight: "bold",
          textAlign: 'center'
        }}>
          You scored {percentageOfSuccesses}%
        </Typography>

        {questions.map((question: QuestionItem, index: any) => (
          <>
            <FormControl component="fieldset" error={answers[index] !== question.correct_answer ? true : false}>
              <FormLabel focused={true} key={question.id} component="legend" >{(`${Number(question.id) + 1} - ${question.question}`)}</FormLabel>
              <RadioGroup name={question.id}>
                {question.options.map((option: any) => (
                  <FormControlLabel name={question.id} disabled control={<Radio />} label={option + (option === question.correct_answer ? ' - Correct answer' : '')} checked={answers[index] === option ? true : false} />
                ))}
              </RadioGroup>
              <FormHelperText>{(question.correct_answer === answers[index]) ? 'You got it! 🥳' : 'Sorry, wrong answer! 😢'}</FormHelperText>
            </FormControl>
            <Divider />
          </>
        ))}

        <Button component={Link} to="/" variant="contained" color="primary" size="large">
          Home Page
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Box mx="auto" my="5rem" px="1rem" sx={{
        maxWidth: 940,
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Typography sx={{
          fontSize: "2rem",
          color: '#293845',
          fontWeight: "bold",
          textAlign: 'center'
        }}>
          You scored {percentageOfSuccesses}%
      </Typography>

        <Typography fontSize="4rem" textAlign="center">
          {percentageOfSuccesses > 70 ? (<>😊</>) : (<>😢</>)}
        </Typography>

        <Box mx="auto" width="100%" display="flex" justifyContent="space-between" flexWrap="wrap">
          <Button variant="outlined" color="primary" size="large" onClick={() => setIsShowDetails(true)}>
            Details
          </Button>

          <Button component={Link} to="/" variant="contained" color="primary" size="large">
            Home Page
          </Button>
        </Box>
      </Box>
    </>
  )
}