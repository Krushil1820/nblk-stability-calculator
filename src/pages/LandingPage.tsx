
// export default LandingPage; 
import React from 'react';
import { Typography, Button, Container, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      /* ⬇️ shrinks the max width slightly; adjust if you prefer “md” */
      maxWidth="md"

      /* make the entire page fade in */
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}

      /* centers the card in the viewport */
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,          // a little breathing room on mobile
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          Stability Score Calculator
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          How is the US Doing?
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 4, fontStyle: 'italic' }}>
          How stable do you think things are in the U.S. right now? Let’s find out&nbsp;— fast.
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          This is a quick and easy tool to help you share how you feel about what&#39;s happening in the country
          under the current administration. You don’t need to be a political expert. It’s just your opinion.
        </Typography>

        <Typography variant="h3" gutterBottom>
          How it works (takes less than 30&nbsp;seconds):
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="body1" paragraph>
            1.&nbsp;Slide to adjust your score
          </Typography>
          <Typography variant="body1" paragraph>
            2.&nbsp;See your result — your own “Stability Score&nbsp;Opinion”
          </Typography>
          <Typography variant="body1" paragraph>
            3.&nbsp;Check the average — how others are feeling too
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/evaluate')}
          sx={{ mt: 2, py: 2, px: 4, fontSize: '1.1rem' }}
        >
          Start Evaluation
        </Button>

        <Typography variant="body1" paragraph sx={{ mt: 4 }}>
          <b>Open to anyone, simple to use, and made for anyone curious about where things stand.</b> <br />
          Your score reflects your view — compare your view with other respondents.
        </Typography>

      </Paper>
      <Footer />
    </Container>
  );
};

export default LandingPage;
