import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Field } from 'formik'
import { Box, FormControl, FormControlLabel, FormLabel, Radio } from "@material-ui/core"
import { RadioGroup } from 'formik-material-ui'
import { object, string } from 'yup'

import { api } from "../../services/api"
import { QuizContext } from "../../contexts/QuizContexts"
import { FormikStep, FormikStepper } from "../../components/Formikstepper"

type QuestionItem = {
  id: string
  question: string
  correct_answer: string
  incorrect_answers: []
  options: []
}

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time))

function shuffle(arr: Array<string>) {
  let j, x, index
  for (index = arr.length - 1; index > 0; index--) {
    j = Math.floor(Math.random() * (index + 1))
    x = arr[index]
    arr[index] = arr[j]
    arr[j] = x
  }
  return arr
}

export default function Quiz() {
  const { quantity, questions, storeQuestions, completeQuiz } = useContext(QuizContext)
  const history = useHistory()
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    async function fetchQuestions() {
      const { data } = await api.get('', {
        params: {
          amount: String(quantity)
        }
      })

      const questionsFormatted = data.results.map((question: {[key: string]: any}, index: number) => {
        const options = shuffle([question.correct_answer, ...question?.incorrect_answers])

        return {
          id: String(index),
          ...question,
          options
        }
      })

      let initialValuesFormatted = {}

      for (let i = 0; i < questionsFormatted.length; i++) {
        initialValuesFormatted = {
          ...initialValuesFormatted,
          [questionsFormatted[i].id]: ''
        }
      }

      setInitialValues(initialValuesFormatted)
      storeQuestions(questionsFormatted)
    }

    fetchQuestions()
  }, [quantity])

  return (
    <Box
      mx="auto"
      minHeight="90vh"
      maxHeight="100vh"
      px="1rem"
      position="relative"
      maxWidth="940px">
      <FormikStepper
        initialValues={initialValues}
        onSubmit={async (values) => {
          await sleep(1000)

          if (Object.keys(values).length < questions.length) {
            alert('Complete all fields')
            return
          }

          await completeQuiz(values)
          history.push('/results')
        }}
      >
        {
          questions.map((question: QuestionItem, index: number) => (
            <FormikStep
              key={question.id}
              label={`Question ${Number(question.id) + 1}`}
              validationSchema={object().shape({
                [question.id]: string().required("A radio option is required")
              })}
            >
              <FormControl component="fieldset">
                <FormLabel component="legend" >{question.question}</FormLabel>

                <Field component={RadioGroup} name={question.id} >
                  {question.options.map(option => (
                    <FormControlLabel key={option} name={question.id} value={option} control={<Radio />} label={option} />
                  ))}
                </Field>

              </FormControl>
            </FormikStep>
          ))}
      </FormikStepper>
    </Box >
  )
}