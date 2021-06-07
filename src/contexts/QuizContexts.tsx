import { createContext, useState, ReactNode, useEffect } from 'react'
import { LevelUpModal } from '../components/LevelUpModal'

type QuestionItem = {
  id: string
  question: string
  correct_answer: string
  incorrect_answers: []
  options: []
}
interface QuizContextData {
  quantity: number
  answers: { [key: string]: any }
  questions: QuestionItem[]
  level: number
  currentExperience: number
  experienceToNextLevel: number
  hits: number
  quizzesCompleted: number
  storeQuantity: (quantity: number) => void
  storeAnswers: (values: { [key: string]: any }) => void
  storeQuestions: (questions: []) => void
  levelUp: () => void
  completeQuiz: () => void
  closeLevelUpModal: () => void
}

interface QuizProviderProps {
  children: ReactNode
  quantity: number
  answers: {}
  questions: QuestionItem[]
  level: number
  currentExperience: number
  experienceToNextLevel: number
  hits: number
  quizzesCompleted: number
}

export const QuizContext = createContext({} as QuizContextData)

export function QuizProvider({ children, ...rest }: QuizProviderProps) {
  const [quantity, setQuantity] = useState(rest.quantity ?? 1)
  const [answers, setAnswers] = useState<{ [key: string]: any }>(rest.answers ?? {})
  const [questions, setQuestions] = useState<QuestionItem[]>(rest.questions ?? [])

  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [hits, setHits] = useState(rest.hits ?? 0)
  const [quizzesCompleted, setQuizzesCompleted] = useState(rest.quizzesCompleted ?? 0)

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow(((level + 1) * 4), 2)

  function storeQuantity(quantity: number) {
    setQuantity(quantity)
  }

  function storeQuestions(questions: []) {
    setQuestions(questions)
  }

  function storeAnswers(values: { [key: string]: any }) {
    setAnswers(values)
  }

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function completeQuiz() {
    let hitsChecked = 0

    for (let [index, question] of questions.entries()) {
      console.log(question.correct_answer)
      console.log(answers[index])
      if (question.correct_answer === answers[index]) {
        hitsChecked++
        console.log("Passou")
      }
    }

    const amount = hitsChecked * 30
    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setHits(hitsChecked)
    setQuizzesCompleted(quizzesCompleted + 1)
    setCurrentExperience(finalExperience)
  }

  useEffect(() => {
    // setQuantity(Number(localStorage.getItem('quantity')))
    setQuestions(JSON.parse(localStorage.getItem('questions') || '[]'))
    setAnswers(JSON.parse(localStorage.getItem('answers') || '{}'))
    setLevel(Number(localStorage.getItem('level') || 1))
    setCurrentExperience(Number(localStorage.getItem('currentExperience')))
    setQuizzesCompleted(Number(localStorage.getItem('quizzesCompleted')))
    setHits(Number(localStorage.getItem('hits')))
  }, [])

  useEffect(() => {
    localStorage.setItem('quantity', String(quantity));
    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('answers', JSON.stringify(answers));
    localStorage.setItem('level', String(level));
    localStorage.setItem('currentExperience', String(currentExperience));
    localStorage.setItem('quizzesCompleted', String(quizzesCompleted));
    localStorage.setItem('hits', String(hits));
  }, [
    quantity,
    questions,
    answers,
    level,
    currentExperience,
    quizzesCompleted,
    hits,
  ])

  return (
    <QuizContext.Provider value={{
      quantity,
      questions,
      answers,
      storeQuantity,
      storeQuestions,
      storeAnswers,
      level,
      currentExperience,
      experienceToNextLevel,
      quizzesCompleted,
      levelUp,
      hits,
      completeQuiz,
      closeLevelUpModal
    }}>
      {children}

      { isLevelUpModalOpen && <LevelUpModal />}
    </QuizContext.Provider>
  )
}