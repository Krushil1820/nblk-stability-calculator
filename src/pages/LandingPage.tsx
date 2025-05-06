import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Padding } from '@mui/icons-material';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ display: 'flex' }}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
          px: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              maxWidth: 1000,
              mx: 'auto',
            }}
          >
            <Typography variant="h1" component="h1" gutterBottom>
              Stability Score Calculator
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              How is the US Doing?
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, fontStyle: 'italic' }}>
             How stable do you think things are in the U.S. right now? Let’s find out — fast.
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              This is a quick and easy tool to help you share how you feel about what&#39;s happening in the country under the current
              administration. You don’t need to be a political expert. It’s just your opinion.    
            </Typography>

            <Typography variant="h3" gutterBottom>
              How it works (takes less than 30 seconds):
            </Typography>
            
            <Box sx={{ textAlign: 'center', mb: 4 }}><br/>
              <Typography variant="body1" paragraph>
                1. Slide to adjust your score
              </Typography>
              <Typography variant="body1" paragraph>
                2. See your result — your own “Stability Score Opinion”
              </Typography>
              <Typography variant="body1" paragraph>
                3. Check the average — how others are feeling too
              </Typography>
              {/* <Typography variant="body1" paragraph>
                4. Compare with community averages
              </Typography> */}
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/evaluate')}
              sx={{
                mt: 2,
                py: 2,
                px: 4,
                fontSize: '1.1rem',
              }}
            >
              Start Evaluation
            </Button><br/>
            <Typography variant="body1" paragraph><br/>
             It’s free, it’s fast, and it’s just for fun (but also pretty real).
             See how your view lines up with others across the country.
            </Typography>

          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default LandingPage; 