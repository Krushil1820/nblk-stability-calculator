import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Link,
} from '@mui/material';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 4, py: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Have ideas for other indicators?{' '}
        <Link
          href="https://nblk.typeform.com/to/B8Yc9cfH"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          Click here to share your feedback.
        </Link>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <Link
          onClick={() => navigate('/about')}
          sx={{ cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' }}
        >
          About
        </Link>
        <Link
          onClick={() => navigate('/privacy')}
          sx={{ cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' }}
        >
          Privacy Policy
        </Link>
      </Box>

      <Typography variant="body2" color="text.secondary">
        © 2025 StabilityCalculator.us • Built by NBLK
      </Typography>
    </Box>
  );
};

export default Footer; 