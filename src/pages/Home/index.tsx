import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Button  } from '@material-ui/core'
import Lottie from 'react-lottie'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

import { QuizContext } from '../../contexts/QuizContexts'
import { ExperienceBar } from '../../components/ExperienceBar'
import { CompletedQuizzes } from '../../components/CompletedQuizzes'
import animationData from '../../assets/brainy-questions.json'
import { LevelStatus } from '../../components/LevelStatus'

export default function Home() {
  const { answers } = useContext(QuizContext)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <>
      <Box
        mx="auto"
        px="1rem"
        minHeight="100vh"
        maxWidth="940px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between">
        <Box my="1rem">
          <Typography
            fontSize={matches ? "2rem": "1.5rem"}
            fontWeight="bold"
            marginBottom="1rem"
            color="#293845">Welcome to Quiz.it
        </Typography>

          <ExperienceBar />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="1rem">
            <LevelStatus />
            <CompletedQuizzes />
          </Box>
        </Box>

        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Lottie
            options={defaultOptions}
            height='auto'
            width={matches ? 400 : 250}
          />
        </Box>

        <Box
          mx="auto"
          py="2rem"
          display="flex"
          width="100%"
          alignItems="center"
          flexWrap="wrap"
          gap="1rem"
          justifyContent={(Object.keys(answers).length !== 0) ? "space-between" : "center"}>
          {(Object.keys(answers).length !== 0) && (
            <Button
              component={Link}
              to="/results"
              variant="outlined"
              color="primary"
              fullWidth={!matches}
              size="large">
              Last quiz
            </Button>)}

          <Button
            component={Link}
            to="/quantity"
            variant="contained"
            color="primary"
            size="large"
            fullWidth={!matches}
            href="/quantity">
            Start
          </Button>
        </Box>
      </Box>
    </>
  )
}