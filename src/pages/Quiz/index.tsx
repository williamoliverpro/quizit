import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
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
  // const [questions, setQuestions] = useState<QuestionItem[]>([])
  const { quantity, questions, storeQuestions, storeAnswers } = useContext(QuizContext)
  const history = useHistory()

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

      console.log(dataFormatted)

      storeQuestions(dataFormatted)
    }

    fetchQuestions()
  }, [quantity])

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      storeAnswers(values)
      history.push('/results')
    },
  });

  return (
    <Box mx="auto" my="5rem" px="1rem" sx={{
      maxWidth: 940,
      height: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <form onSubmit={formik.handleSubmit}>
        {questions.map((question: QuestionItem) => (
          <>
            <FormControl component="fieldset" required={true}>
              <FormLabel key={question.id} component="legend" >{question.question}</FormLabel>
              <RadioGroup name={question.id} onChange={formik.handleChange}>
                {question.options.map(option => (
                  <FormControlLabel name={question.id} value={option} control={<Radio />} label={option} />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        ))}
        <Button color="primary" variant="contained" fullWidth type="submit">
          Finish
        </Button>
      </form>
    </Box>
  )
}