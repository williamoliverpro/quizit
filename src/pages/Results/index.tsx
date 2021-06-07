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
  const { questions, answers, completeQuiz, hits } = useContext<any>(QuizContext)
  const [isShowDetails, setIsShowDetails] = useState(false)
  const [percentageOfSuccesses, setPercentageOfSuccesses] = useState(0)

  useEffect(() => {
    completeQuiz()

    setPercentageOfSuccesses(Math.round((hits / questions.length) * 100))
  }, [])

  if (isShowDetails) {
    return (
      <Box mx="auto" my="2rem" px="1rem" display="flex" minHeight="90vh" maxWidth="940px" flexDirection="column" justifyContent="space-between">
        <Box>
          <Typography fontSize="2rem" color="#293845" fontWeight="bold" textAlign="center" marginBottom="1rem">
            You scored {percentageOfSuccesses}%
          </Typography>

          {questions.map((question: QuestionItem, index: any) => (
            <>
              <Box marginTop="1rem" marginBottom="1rem">
                <FormControl component="fieldset" error={answers[index] !== question.correct_answer ? true : false}>
                  <FormLabel focused={true} key={question.id} component="legend" >{(`${Number(question.id) + 1} - ${question.question}`)}</FormLabel>
                  <RadioGroup name={question.id}>
                    {question.options.map((option: any) => (
                      <FormControlLabel name={question.id} disabled control={<Radio />} label={option + (option === question.correct_answer ? ' - Correct answer' : '')} checked={answers[index] === option ? true : false} />
                    ))}
                  </RadioGroup>
                  <FormHelperText>{(question.correct_answer === answers[index]) ? 'You got it! 🥳' : 'Sorry, wrong answer! 😢'}</FormHelperText>
                </FormControl>
              </Box>
              {(questions.length - 1) !== index && <Divider />}
            </>
          ))}
        </Box>

        <Box width="100%" display="flex" alignItems="center" justifyContent="center" marginTop="2rem">
          <Button component={Link} to="/" variant="contained" color="primary" size="large">
            Home Page
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Box mx="auto" my="2rem" px="1rem" sx={{
        maxWidth: 940,
        height: '90vh',
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
          {percentageOfSuccesses > 70 ? (<>🥳</>) : (<>😢</>)}
        </Typography>

        <Box mx="auto" width="100%" gap="1rem" display="flex" justifyContent="space-between" flexWrap="wrap">
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