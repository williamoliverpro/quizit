import { Box, IconButton, Typography } from '@material-ui/core';
import { useContext } from 'react'
import { QuizContext } from '../../contexts/QuizContexts'

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(QuizContext)

  return (
    <Box
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      right="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "rgba(242, 243, 245, 0.8)"
      }}
    >
      <Box
        width="100%"
        maxWidth="400px"
        px="2rem"
        py="3rem"
        borderRadius="5px"
        boxShadow="0 0 60px rgba(0, 0, 0, 0.05)"
        textAlign="center"
        position="relative"
        sx={{
          background: "#fff"
        }}
      >
        <Box
          component="header"
          fontSize="8.75rem"
          fontWeight="600"
          color="#6558F5"
          sx={{
            background: "url('/icons/levelup.svg') no-repeat center",
            backgroundSize: "contain"
          }}>{level}</Box>

        <Typography
          component="strong"
          fontSize="2.25rem"
          color="#2e384d"
        >Congrats</Typography>
        <Typography
          fontSize="1.25rem"
          color="#666666"
          marginTop="0.25rem"
        >You have reached a new level.</Typography>

        <Box
          position="absolute"
          right="0.5rem"
          top="0.5rem"
        >
          <IconButton
            size="small"
            onClick={closeLevelUpModal}
          >
            <img src="/icons/close.svg" alt="Fechar modal" />
          </IconButton>
        </Box>

      </Box>
    </Box>
  )
}