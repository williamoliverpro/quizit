import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Formik } from 'formik';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";

import { api } from "../../services/api";
import { QuizContext } from "../../contexts/QuizContexts";

type QuestionItem = {
  id: string
  question: string
  correct_answer: string
  incorrect_answers: []
  options: []
}

function shuffle(arr: any) {
  var j, x, index;
  for (index = arr.length - 1; index > 0; index--) {
    j = Math.floor(Math.random() * (index + 1));
    x = arr[index];
    arr[index] = arr[j];
    arr[j] = x;
  }
  return arr;
}

export default function Quiz() {
  const { quantity, questions, storeQuestions, storeAnswers } = useContext(QuizContext)
  const history = useHistory()
  const initialValues = {}

  useEffect(() => {
    async function fetchQuestions() {
      const { data } = await api.get('', {
        params: {
          amount: String(quantity)
        }
      })

      const dataFormatted = data.results.map((question: any, index: any) => {
        const options = shuffle([question.correct_answer, ...question?.incorrect_answers])

        return {
          id: String(index),
          ...question,
          options
        }
      })

      storeQuestions(dataFormatted)
    }

    fetchQuestions()
  }, [quantity])

  return (
    <Box mx="auto" my="2rem" px="1rem" sx={{
      maxWidth: 940,
      height: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          if (Object.keys(values).length < questions.length) {
            alert('Complete all fields')
            return
          }
          storeAnswers(values)
          history.push('/results')
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            {questions.map((question: QuestionItem, index: number) => (
              <>
                <FormControl component="fieldset" required={true}>
                  <FormLabel key={question.id} component="legend" >{question.question}</FormLabel>
                  <RadioGroup name={question.id} onChange={props.handleChange}>
                    {question.options.map(option => (
                      <FormControlLabel name={question.id} value={option} control={<Radio />} label={option} />
                    ))}
                  </RadioGroup>
                </FormControl>
              </>
            ))
            }
            < Button color="primary" variant="contained" fullWidth type="submit">
              Finish
            </Button>
          </form>
        )}
      </Formik>
    </Box >
  )
}