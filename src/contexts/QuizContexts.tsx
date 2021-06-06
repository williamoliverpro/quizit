import { createContext, useState, ReactNode, useEffect } from 'react'

interface QuizContextData {
  quantity: number
  answers: any
  questions: []
  storeQuantity: (quantity: number) => void
  storeAnswers: (answers: {}) => void
  storeQuestions: (questions: []) => void
}

interface QuizProviderProps {
  children: ReactNode
  quantity: number
  answers: {}
  questions: []
}

export const QuizContext = createContext({} as QuizContextData)

export function ChallengesProvider({ children, ...rest }: QuizProviderProps) {
  const [quantity, setQuantity] = useState(rest.quantity ?? 1)
  const [answers, setAnswers] = useState(rest.answers ?? {})
  const [questions, setQuestions] = useState(rest.questions ?? [])

  function storeQuantity(quantity: number) {
    setQuantity(quantity)
  }

  function storeAnswers(answers: {}) {
    setAnswers(answers)
  }

  function storeQuestions(questions: []) {
    setQuestions(questions)
  }

  useEffect(() => {
    // setQuantity(Number(localStorage.getItem('quantity')))
    setQuestions(JSON.parse(localStorage.getItem('questions') || '[]'))
    setAnswers(JSON.parse(localStorage.getItem('answers') || '{}'))
  }, [])

  useEffect(() => {
    localStorage.setItem('quantity', String(quantity));
    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [quantity, answers, questions])

  return (
    <QuizContext.Provider value={{
      quantity,
      questions,
      answers,
      storeQuantity,
      storeQuestions,
      storeAnswers
    }}>
      {children}
    </QuizContext.Provider>
  )
}