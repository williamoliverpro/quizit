import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@material-ui/core';
import Lottie from 'react-lottie';

import { QuizContext } from '../../contexts/QuizContexts';
import animationData from '../../lotties/brainy-questions.json';

export default function Home() {
  const { answers } = useContext(QuizContext)

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <>
      <Box mx="auto" my="2rem" px="1rem" sx={{
        height: '90vh',
        maxWidth: 940,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <Typography sx={{
          fontSize: "2rem",
          color: '#293845',
          fontWeight: "bold"
        }}>
          Welcome
        </Typography>
        <Box width="100%" display="flex" alignItems="center" justifyContent="center">
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
          />
        </Box>

        <Box mx="auto" display="flex" gap="1rem" width="100%" flexWrap="wrap" alignItems="center" justifyContent={(Object.keys(answers).length !== 0) ? "space-between" : "center"}>
          {(Object.keys(answers).length !== 0) && (<Button component={Link} to="/results" variant="outlined" color="primary" size="large">
            Last quiz
          </Button>)}

          <Button component={Link} to="/quantity" variant="contained" color="primary" size="large" href="/quantity">
            Start
          </Button>
        </Box>
      </Box>
    </>
  );
}