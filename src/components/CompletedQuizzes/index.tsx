import { useContext } from 'react'
import { Box, Typography } from '@material-ui/core';
import { QuizContext } from '../../contexts/QuizContexts'

export function CompletedQuizzes() {
    const { quizzesCompleted } = useContext(QuizContext)

    return (
        <Box
            fontWeight="500"
        >
            <Typography
                component="span"
                fontSize="1rem">Completed quizzes</Typography>
            <Typography
                component="span"
                ml="1rem"
                fontSize="1rem"
                fontWeight="bold">{quizzesCompleted}</Typography>
        </Box>
    )
}