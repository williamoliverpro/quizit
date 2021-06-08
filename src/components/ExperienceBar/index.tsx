import { Box, Typography } from '@material-ui/core'
import { useContext } from 'react'
import { QuizContext } from '../../contexts/QuizContexts'

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(QuizContext)
  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

  return (
    <Box component="header" display="flex" alignItems="center">
      <Typography component="span" fontSize="1rem" >0 xp</Typography>
      <Box
        flex="1"
        height="4px"
        borderRadius="4px"
        mx="1.5rem"
        position="relative"
        sx={{
          background: '#dcdde0'
        }}
      >
        <Box
          width={`${percentToNextLevel}%`}
          height="4px"
          borderRadius="4px"
          sx={{
            background: 'teal'
          }}
        />

        <Typography
          component="span"
          position="absolute"
          top="12px"
          left={`${percentToNextLevel}%`}
          sx={{
            transform: "translateX(-50%)"
          }}
          >{currentExperience} xp</Typography
        >
      </Box>
      <Typography>{experienceToNextLevel} xp</Typography>
    </Box >
  )
}