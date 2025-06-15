import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Button,
  Container,
  Link,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ overflowX: 'hidden' }}>
      <Box sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mr: 2 }}
              >
                Back
              </Button>
              <Typography variant="h4" component="h1">
                About
              </Typography>
            </Box>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              The Stability Score Calculator was created by NBLK to help people across the U.S. reflect on how they view the current political climate — and to see how their perspective compares to others.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              The tool uses five primary indicators of political stability to generate a weighted cumulative score. This is not a scientific or exhaustive measure — it's a simple way to spark thought and conversation.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              There are many other indicators that could be considered. If you have ideas about what should be added, or if you'd like to share feedback, we welcome your input.
            </Typography>

            <Box sx={{ my: 3, textAlign: 'center' }}>
              <Link
                href="https://nblk.typeform.com/to/B8Yc9cfH"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-block',
                  px: 3,
                  py: 1.5,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                Message us here
              </Link>
            </Box>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              Our goal is to help democratize data, encourage civic engagement, and give everyone an easy way to share their view.
            </Typography>

            <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 500 }}>
              Enjoy and explore!
            </Typography>
          </Paper>

          <Footer />
        </motion.div>
      </Box>
    </Container>
  );
};

export default AboutPage; 