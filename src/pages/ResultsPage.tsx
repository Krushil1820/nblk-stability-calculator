import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Button,
  Container,
  Link,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { motion, AnimatePresence, color } from 'framer-motion';
import { Results } from '../types';
import {
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Share as ShareIcon,
  Replay as ReplayIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { supabase } from '../lib/supabaseClient';

const getScoreColor = (score: number) => {
  if (score <= 20) return '#F44336'; 
  if (score <= 40) return '#FF9800'; 
  if (score <= 60) return '#FFC107'; 
  if (score <= 80) return '#8BC34A';
  return '#4CAF50'; 
};

const getStabilityIcon = (score: number) => {
  if (score <= 20) return '💥'; 
  if (score <= 40) return '🔥'; 
  if (score <= 60) return '🌪️'; 
  if (score <= 80) return '🌳'; 
  return '🌱'; 
};

const getStabilityText = (score: number) => {
  if (score <= 20) return 'Very Unstable';
  if (score <= 40) return 'Low Stability';
  if (score <= 60) return 'Moderately Stable';
  if (score <= 80) return 'Highly Stable';
  return 'Extremely Stable';
};

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const FOREST_GREEN = '#228B22';
const BAR_BG = '#e0e0e0';
const BAR_HEIGHT = 22;
const BAR_WIDTH = 180;

interface BarChartProps {
  label: string;
  value: number;
  max: number;
  highlight?: boolean;
  color?: string;
}

const AnimatedBar = ({ label, value, max, highlight, color }: BarChartProps) => {
  const width = `${Math.min(100, Math.round((value / max) * 100))}%`;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, width: '100%' }}>
      <Box sx={{width: { xs: '30%', sm: 140 },minWidth: 80, maxWidth: 140, color: '#8B6F00', fontWeight: 500, fontSize: { xs: 14, sm: 16 }, textAlign: 'right', pr: 1 }}>
        {label}
      </Box>
      <Box
        sx={{
          height: BAR_HEIGHT,
          width: { xs: 120, sm: BAR_WIDTH },
          bgcolor: BAR_BG,
          borderRadius: 2,
          mx: 1,
          position: 'relative',
          flex: 1,
          minWidth: 80,
          maxWidth: BAR_WIDTH,
          boxShadow: highlight ? `0 0 0 2px #228B22, 0 0 8px 2px #228B2244` : undefined,
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: width,
            bgcolor: color || FOREST_GREEN,
            borderRadius: 2,
            transition: 'width 1.2s cubic-bezier(.4,2,.3,1)',
            boxShadow: highlight ? '0 0 8px 2px #228B2288' : undefined,
          }}
        />
      </Box>
      <Box sx={{ minWidth: 32, color: '#8B6F00', fontWeight: 600, fontSize: { xs: 14, sm: 16 } }}>
        {value}
      </Box>
    </Box>
  );
};

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state as Results;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!results) {
    navigate('/');
    return null;
  }

  const handleShare = (platform: string) => {
    const message = `My Political Stability Score: ${results.compositeScore.toFixed(1)} - ${getStabilityText(results.compositeScore)}`;
    const url = window.location.href;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
    }
  };

  const getScoreInterpretation = (score: number) => {
    if (score <= 20) return 'Stable environment with minimal risks.';
    if (score <= 40) return 'Some risks present, but manageable.';
    if (score <= 60) return 'Noticeable risks that require attention.';
    if (score <= 80) return 'Significant risks with potential for major shifts.';
    return 'Critical risks that could lead to severe consequences.';
  };

  const score = results.compositeScore;
  const avgScore = results.communityAverages?.overall ? Math.round(results.communityAverages.overall) : 0;
  const maxScore = Math.max(score, avgScore, 100);

  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!results?.surveyId) throw new Error('Survey ID not found');
      console.log('Updating row with id:', results.surveyId);
      const { data, error } = await supabase
        .from('survey_responses')
        .update({
          first_name: form.firstName,
          last_name:  form.lastName,
          email:      form.email
        })
        .eq('id', results.surveyId)
        .select('id')
        .maybeSingle()
        .throwOnError();
      if (!data) {
        console.warn('No row matched that id—update skipped');
        setError('Update failed: record not found.');
        return;
      }
      console.log('Personal information saved successfully:', data);
      setOpenDialog(false);
    } catch (err: any) {
      console.error('Error saving personal information:', err.message, err.details);
      setError('Failed to save personal information. Please try again.');
    }
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, overflow: 'hidden', marginTop: -8 }}>
      <Box
        sx={{
          minHeight: '150vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          withwidth: '100%',
          overflow: 'hidden',
          margin: '0 auto',          
        }}
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom align="center">
                Political Stability Score
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {getStabilityIcon(score)} {getStabilityText(score)}
              </Typography>
              {/* Bar Comparison Section */}
              <Box sx={{ my: 2, width: '100%', maxWidth: 400, mx: 'auto' }}>
                <AnimatedBar label="Your Score:" value={Math.round(score)} max={maxScore} highlight color={getScoreColor(score)} />
                <AnimatedBar label="Average Score:" value={avgScore} max={maxScore} color={getScoreColor(avgScore)} />
              </Box>
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                Average Score of all Respondents: {results.communityAverages?.overall.toFixed(1)}
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                Your score puts administration in {getStabilityText(score)} range.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                Average score of all users puts administration in {getStabilityText(avgScore)} range.
              </Typography>

              {/* Instability Score Interpretation Table (Legend)
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                  Instability Score Interpretation Table
                </Typography>
              <Box sx={{ mt: 3, mb: 4, display: 'flex', justifyContent: 'center' }}>
                {(() => {
                  let range = '';
                  let level = '';
                  let description = '';
                  if (score <= 20) {
                    range = '0 – 20';
                    level = 'Very Low Instability';
                    description = 'People experience predictability, trust in systems, and confidence in leadership.';
                  } else if (score <= 40) {
                    range = '21 – 40';
                    level = 'Low Instability';
                    description = 'Most services run smoothly; occasional public concerns but little daily impact.';
                  } else if (score <= 60) {
                    range = '41 – 60';
                    level = 'Moderate Instability';
                    description = 'Public may feel divided or uneasy; pressure builds in specific communities or sectors.';
                  } else if (score <= 80) {
                    range = '61 – 80';
                    level = 'High Instability';
                    description = 'People may feel anxious, polarized, or distrustful; protests or policy backlash likely.';
                  } else {
                    range = '81 – 100';
                    level = 'Extreme Instability';
                    description = 'Society may face unrest, fear, rapid change, or crisis-level tension and division.';
                  }
                  return (
                    <Paper elevation={2} sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 0.5,
                      gap: 3,
                      minWidth: 260,
                      background: '#faf9f6',
                      borderRadius: 2,
                      boxShadow: 0.5,
                      width: '100%',
                      maxWidth: 700,
                    }}>
                      <Box sx={{ flex: 1, minWidth: 90, textAlign: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', marginTop: -1.5 }}>Score Range</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, marginTop: 3.0 }}>{range}</Typography>
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 110, textAlign: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', marginTop: 0.5 }}>Instability Level</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 , marginTop: 1 }}>{level}</Typography>
                      </Box>
                      <Box sx={{ flex: 2, minWidth: 160, textAlign: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary', marginTop: 0.5 }}>Impact Description</Typography>
                        <Typography variant="body2" sx={{ marginTop: 1.5 }}>{description}</Typography>
                      </Box>
                    </Paper>
                  );
                })()}
              </Box> */}
              {/* Instability Score Interpretation Table (Legend) */}
              <Box sx={{ mt: 3, mb: 4, overflowX: 'auto' }}>
                 <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                   Stability Score Interpretation Table
                 </Typography>
                 <Box component="table" sx={{
                   width: '100%',
                   borderCollapse: 'collapse',
                   fontSize: '0.85rem',
                   background: '#faf9f6',
                   borderRadius: 2,
                   boxShadow: 2,
                   minWidth: 340,
                   '@media (max-width: 600px)': {
                     fontSize: '0.78rem',
                   },
                 }}>
                   <Box component="thead" sx={{ background: '#f5f5f5' }}>
                     <Box component="tr">
                       <Box component="th" sx={{ p: 0.5, fontWeight: 700, borderBottom: '1.5px solid #ccc', textAlign: 'center', minWidth: 60 }}>Score Range</Box>
                       <Box component="th" sx={{ p: 0.5, fontWeight: 700, borderBottom: '1.5px solid #ccc', textAlign: 'center', minWidth: 90 }}>Stability Level</Box>
                       <Box component="th" sx={{ p: 0.5, fontWeight: 700, borderBottom: '1.5px solid #ccc', textAlign: 'center', minWidth: 120 }}>What It Means for Society</Box>
                     </Box>
                   </Box>
                   <Box component="tbody">
                     <Box component="tr">
                       <Box component="td" sx={{ p: 0.5, borderBottom: '1px solid #eee' }}>81 – 100</Box>
                       <Box component="td" sx={{ p: 0.5, textAlign: 'left', borderBottom: '1px solid #eee' }}>🟢 Extremely Stable</Box>
                       <Box component="td" sx={{ p: 0.5, borderBottom: '1px solid #eee' }}>The administration appears very steady, with strong leadership and minimal disruption. People feel confident, calm, and trust that systems are working well.</Box>
                     </Box>
                     <Box component="tr">
                       <Box component="td" sx={{ p: 0.5, borderBottom: '1px solid #eee' }}>61 – 80</Box>
                       <Box component="td" sx={{ p: 0.5, textAlign: 'left', borderBottom: '1px solid #eee' }}>🟢 Highly Stable</Box>
                       <Box component="td" sx={{ p: 0.5, borderBottom: '1px solid #eee' }}>The administration is mostly consistent, with few major problems or risks. Most people feel secure, and daily life runs smoothly.</Box>
                     </Box>
                     <Box component="tr">
                       <Box component="td" sx={{ p: 0.5, borderBottom: '1px solid #eee' }}>41 – 60</Box>
                       <Box component="td" sx={{ p: 0.5, textAlign: 'left', borderBottom: '1px solid #eee' }}>🟡 Moderately Stable</Box>
                       <Box component="td" sx={{ p: 0.5, borderBottom: '1px solid #eee' }}>The administration shows some inconsistency or uneven decision-making. People may feel mixed some tension, but no major breakdowns.</Box>
                     </Box>
                     <Box component="tr">
                       <Box component="td" sx={{ p: 0.5, borderBottom: '1px solid #eee' }}>21 – 40</Box>
                       <Box component="td" sx={{ p: 0.5, textAlign: 'left', borderBottom: '1px solid #eee' }}>🟠 Low Stability</Box>
                       <Box component="td" sx={{ p: 0.5, borderBottom: '1px solid #eee' }}>The administration is facing leadership or policy struggles across key areas. People may feel divided, concerned, or affected by political shifts.</Box>
                     </Box>
                     <Box component="tr">
                       <Box component="td" sx={{ p: 0.5, borderBottom: '1px solid #eee' }}>0 – 20</Box>
                       <Box component="td" sx={{ p: 0.5, textAlign: 'left', borderBottom: '1px solid #eee' }}>🔴 Very Unstable</Box>
                       <Box component="td" sx={{ p: 0.5, borderBottom: '1px solid #eee' }}>The administration is seen as highly unpredictable or dysfunctional. People may feel unsafe, angry, or unsure about the future.</Box>
                     </Box>
                   </Box>
                 </Box>
               </Box>
              {/* <Box sx={{ mb: 4 }}>
                  <Button variant="text" sx={{ p: 0, minWidth: 0, textTransform: 'none' }} onClick={handleDialogOpen}>
                    <span style={{ color: theme.palette.primary.main, textDecoration: 'underline', cursor: 'pointer', fontSize: '1rem' }}>
                      For more details on the results, please click here.
                    </span>
                  </Button>
                  <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>Get More Details & Updates</DialogTitle>
                    <form onSubmit={handleFormSubmit}>
                      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
                        <TextField
                          label="First Name"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleFormChange}
                          required
                        />
                        <TextField
                          label="Last Name"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleFormChange}
                          required
                        />
                        <TextField
                          label="Email ID"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleFormChange}
                          required
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDialogClose}>Cancel</Button>
                        <Button type="submit" variant="contained">Get Updates</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                </Box> */}


              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ReplayIcon />}
                  onClick={() => navigate('/evaluate')}
                  sx={{ px: 4, py: 1 }}
                >
                  Take Again
                </Button>
              </Box>

              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  © 2025 NBLK Stability Calculator
                </Typography>
                <Box
                  component="img"
                  src="/nblk.png"
                  alt="NBLK Logo"
                  sx={{
                    height: 40,
                    mt: 1,
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Paper>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Container>
  );
};

export default ResultsPage; 
