import { useContext, useState } from "react"
import { Link } from 'react-router-dom'
import { Button, Typography } from "@material-ui/core"
import Box from '@material-ui/core/Box'
import Slider from '@material-ui/core/Slider'
import Lottie from 'react-lottie'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

import { QuizContext } from "../../contexts/QuizContexts"

import animationData from '../../assets/run-rex.json'

export default function Quantity() {
  const [isToContinue, setIsToContinue] = useState(false)
  const { quantity, storeQuantity } = useContext(QuizContext)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  function handleChange(event: object, value: any) {
    storeQuantity(value)
  }

  const emojis = ['😟', '🙂', '😮', '😲']

  return (
    <>
      <Box
        mx="auto"
        px="1rem"
        maxWidth="940px"
        minHeight="90vh"
        maxHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Typography
          fontSize={matches ? "2rem" : "1.5rem"}
          color="#293845"
          fontWeight="bold"
          px="1rem"
          my="1rem"
        >
          {isToContinue ? 'Ready?' : 'Choose the number of questions'}
        </Typography>

        {isToContinue && (
          <Lottie
            options={defaultOptions}
            height={matches ? 300 : 250}
            width={matches ? 300 : 250}
          />
        )}

        {!isToContinue && (
          <Box
            px="1rem"
          >
            <Typography
              fontSize="4rem"
              textAlign="center">
              {quantity < 5 ? (
                emojis[0]) : quantity < 10 ? (
                  emojis[1]) : quantity < 14 ? (
                    emojis[2]) : (emojis[3])}
            </Typography>

            <Box
              display="flex"
              width="100%"
              justifyContent="space-between"
            >
              <Typography color="#293845">quantity</Typography>
              <Typography
                fontWeight="bold"
                color="#293845">
                {quantity}
              </Typography>
            </Box>

            <Box width="100%">
              <Slider
                aria-label="Volume"
                value={quantity}
                min={1} max={15}
                onChange={handleChange} />
            </Box>
          </Box>
        )}

        {isToContinue ? (
          <Box
            py="2rem"
            width="100%"
            display="flex"
            flexDirection="row-reverse"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap="1rem">
            <Button
              component={Link}
              to="/quiz"
              variant="contained"
              fullWidth={!matches}
              color="primary"
              size="large">
              Start
            </Button>

            <Button
              onClick={() => setIsToContinue(false)}
              variant="outlined"
              color="secondary"
              fullWidth={!matches}
              size="large">
              Cancel
            </Button>
          </Box>
        ) : (
          <Box
            py="2rem"
            display="flex"
            width="100%"
            justifyContent="flex-end" >
            <Button
              onClick={() => setIsToContinue(true)}
              variant="contained"
              color="primary"
              fullWidth={!matches}
              size="large">
              Next
            </Button>
          </Box>
        )}
      </Box>
    </>
  )
}