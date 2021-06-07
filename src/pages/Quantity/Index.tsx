import { useContext, useState } from "react"
import { Link } from 'react-router-dom'
import { Button, Typography } from "@material-ui/core"
import Box from '@material-ui/core/Box'
import Slider from '@material-ui/core/Slider'
import Lottie from 'react-lottie'

import { QuizContext } from "../../contexts/QuizContexts"

import animationData from '../../assets/run-rex.json'

export default function Quantity() {
  const [isToContinue, setIsToContinue] = useState(false)
  const { quantity, storeQuantity } = useContext(QuizContext)

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
        my="2rem"
        px="1rem"
        maxWidth="940px"
        height="90vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Typography
          fontSize="2rem"
          color="#293845"
          fontWeight="bold"
        >
          {isToContinue ? 'Ready?' : 'Choose the number of questions'}
        </Typography>

        {isToContinue && (
          <Lottie
            options={defaultOptions}
            height={300}
            width={300}
          />
        )}

        {!isToContinue && (
          <Box>
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
              <Typography fontWeight="bold" color="#293845">{quantity}</Typography>
            </Box>

            <Box width="100%">
              <Slider aria-label="Volume" value={quantity} min={1} max={15} onChange={handleChange} />
            </Box>
          </Box>
        )}

        {isToContinue ? (
          <Box
            display="flex"
            flexDirection="row-reverse"
            gap="1rem"
            flexWrap="wrap"
            width="100%"
            alignItems="center"
            justifyContent="space-between">
            <Button component={Link} to="/quiz" variant="contained" color="primary" size="large">
              Start
            </Button>

            <Button
              onClick={() => setIsToContinue(false)}
              variant="outlined"
              color="secondary"
              size="large">
              Cancel
            </Button>
          </Box>
        ) : (
          <Box
            display="flex"
            width="100%"
            justifyContent="flex-end" >
            <Button
              onClick={() => setIsToContinue(true)}
              variant="contained"
              color="primary"
              size="large">
              Next
            </Button>
          </Box>
        )}
      </Box>
    </>
  )
}