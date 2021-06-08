import { useContext } from 'react'
import { Box, Typography } from '@material-ui/core'
import { QuizContext } from '../../contexts/QuizContexts'

export function LevelStatus() {
  const { level } = useContext(QuizContext)

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <img src="/icons/level.svg" alt="level" />

      <Typography
        component="p"
        fontSize="1rem"
        ml="0.5rem">Level {level}
      </Typography>      
    </Box>
  )
}