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

const PrivacyPage: React.FC = () => {
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
                Privacy Policy
              </Typography>
            </Box>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              We respect your privacy. This tool collects anonymous responses for community insight only.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
              If you choose to share your email to receive a report, suggest additional indicators, or provide feedback, your information will be used solely for that purpose and handled in accordance with the NBLK Privacy Policy.
            </Typography>

            <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: 500 }}>
              We do not sell or share your data.
            </Typography>
          </Paper>

          <Footer />
        </motion.div>
      </Box>
    </Container>
  );
};

export default PrivacyPage; 