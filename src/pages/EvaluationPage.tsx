import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Slider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  IconButton,
  Tooltip,
  Popover,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Indicator, Results, EvaluationState, Demographics } from '../types';
import InfoIcon from '@mui/icons-material/Info';
import { supabase } from '../lib/supabaseClient';

const gradeToScore: Record<string, [number, number]> = {
  'F': [81, 100],
  'D': [61, 80],
  'C': [41, 60],
  'B': [21, 40],
  'A': [0, 20],
};

const scoreToGrade = (score: number): string => {
  if (score <= 20) return 'A';
  if (score <= 40) return 'B';
  if (score <= 60) return 'C';
  if (score <= 80) return 'D';
  return 'F';
};

const indicatorDescriptions = {
  immigration: {
    //title: 'Immigration Policy',
    description: 'Recent actions include:\n- Revoking visas for over 1,700 international students, leading to deportations.\n- Increasing deportations and detentions, even for minor infractions.\n- Implementing stricter rules for work permits and asylum seekers.\n- Shutting down programs that previously helped immigrants stay legally.'
  },
  economy: {
    //title: 'Economic Management',
    description: 'Recent developments:\n- Imposing a 10% tariff on all imports, with higher rates for certain countries.\n- Small businesses facing increased costs and uncertainty due to tariffs.\n- Rolling back environmental regulations, affecting industries like manufacturing.\n- Implementing tax policies that some argue favor larger corporations.'
  },
  foreign: {
    //title: 'Foreign Policy',
    description: 'Recent changes include:\n- Questioning commitments to NATO allies, causing concern among partners.\n- Reducing involvement in international organizations like the UN.\n- Cutting foreign aid programs, including dismantling USAID.\n- Aligning more closely with certain authoritarian regimes.'
  },
  domestic: {
    //title: 'Domestic Policy',
    description: 'Recent initiatives:\n- Reclassifying federal employees to make it easier to dismiss them, potentially politicizing civil service.\n- Dismantling or reducing budgets for various federal agencies, including the Department of Education.\n- Implementing policies that some view as undermining public health and environmental protections.\n- Reducing transparency by limiting public input on regulatory changes.'
  },
  social: {
    //title: 'Social Policy',
    description: 'Recent actions:\n- Eliminating federal Diversity, Equity, and Inclusion (DEI) programs.\n- Rolling back protections for LGBTQ+ individuals, including banning transgender individuals from military service.\n- Rescinding policies that promoted equal opportunities in education and employment.\n- Appointing officials with strong religious affiliations to key government positions, raising concerns about church-state separation.'
  }
};

const initialIndicators: Indicator[] = [
  {
    id: 'immigration',
    name: 'Immigration Policy - How the government handles immigrants in the U.S.',
    description: 'How would you grade the administration on Immigration Policy?',
    weight: 0.20,
    grade: 'F',
    score: 100,
  },
  {
    id: 'economy',
    name: 'Economic Management - How the government manages the economy',
    description: 'How would you grade the administration on Economic Management?',
    weight: 0.15,
    grade: 'F',
    score: 100,
  },
  {
    id: 'foreign',
    name: 'Foreign Policy - How the U.S. interacts with other countries',
    description: 'How would you grade the administration on Foreign Policy?',
    weight: 0.20,
    grade: 'F',
    score: 100,
  },
  {
    id: 'domestic',
    name: 'Domestic Policy - How the government acts within the U.S.',
    description: 'How would you grade the administration on Domestic Policy?',
    weight: 0.25,
    grade: 'F',
    score: 100,
  },
  {
    id: 'social',
    name: 'Social Policy - How the government ensures & promotes citizen\'s rights',
    description: 'How would you grade the administration on Social Policy?',
    weight: 0.2,
    grade: 'F',
    score: 100,
  },
];

const indicatorIds = initialIndicators.map(i => i.id);

const EvaluationPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [indicators, setIndicators] = useState<Indicator[]>(initialIndicators);
  const [demographics, setDemographics] = useState<EvaluationState['demographics']>({});
  const [currentIndicators, setCurrentIndicators] = useState<Indicator[]>(indicators);
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>(
    Object.fromEntries(indicatorIds.map(id => [id, null]))
  );

  const handleInfoClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(prev => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleInfoClose = (id: string) => {
    setAnchorEl(prev => ({ ...prev, [id]: null }));
  };

  const handleGradeChange = (id: string, grade: string) => {
    setCurrentIndicators(prev =>
      prev.map(indicator =>
        indicator.id === id
          ? {
              ...indicator,
              grade,
              score: gradeToScore[grade][0],
            }
          : indicator
      )
    );
  };

  const handleScoreChange = (id: string, value: number) => {
    const newGrade = scoreToGrade(value);
    setCurrentIndicators(prev =>
      prev.map(indicator =>
        indicator.id === id
          ? {
              ...indicator,
              score: value,
              grade: newGrade,
            }
          : indicator
      )
    );
  };

  const calculateCompositeScore = (): number => {
    return currentIndicators.reduce(
      (total, indicator) => total + indicator.score * indicator.weight,
      0
    );
  };

  const handleSubmit = async () => {
    const score = calculateCompositeScore();
  
    // Build the payload once so it's easy to log/debug
    const payload = {
      age_range: demographics.ageRange ?? null,
      region: demographics.region ?? null,
      immigration_policy_rate: currentIndicators.find(i => i.id === 'immigration')?.score ?? 0,
      economic_management_rate: currentIndicators.find(i => i.id === 'economy')?.score ?? 0,
      foreign_policy_rate: currentIndicators.find(i => i.id === 'foreign')?.score ?? 0,
      domestic_policy_rate: currentIndicators.find(i => i.id === 'domestic')?.score ?? 0,
      social_policy_rate: currentIndicators.find(i => i.id === 'social')?.score ?? 0,
      instability_ratio: score
    };
  
    try {
      const { data, error } = await supabase
        .from('survey_responses')
        .insert(payload)
        .select('*')          // return the inserted row
        .throwOnError();      // throws if Postgres returns any error
  
      const inserted = Array.isArray(data) ? data[0] : data; // safety
  
      const { data: avgData, error: avgError } = await supabase
        .from('survey_responses')
        .select('instability_ratio')
        .throwOnError();
  
      let avgScore = 0;
      if (avgData && avgData.length > 0) {
        const total = avgData.reduce((sum, row) => sum + (row.instability_ratio || 0), 0);
        avgScore = total / avgData.length;
      }
  
      const results: Results = {
        compositeScore: score,
        label: getScoreInterpretation(score).level,
        indicators: currentIndicators,
        communityAverages: { overall: avgScore, byAge: { '30-45': 73.5 } },
        surveyId: inserted.id
      };
  
      navigate('/results', { state: results });
  
    } catch (err: any) {
      console.error('Supabase insert failed:', err.message, err.details);
      setError('Failed to save survey response. Please try again.');
    }
  };
  
  // const handleSubmit = async () => {
  //   const score = calculateCompositeScore();
  //   try {
  //     // Insert survey data into Supabase
  //     const { data, error } = await supabase
  //       .from('survey_responses')
  //       .insert([
  //         {
  //           age_range: demographics.ageRange || '',
  //           region: demographics.region || '',
  //           immigration_policy_rate: currentIndicators.find(i => i.id === 'immigration')?.score || 0,
  //           economic_management_rate: currentIndicators.find(i => i.id === 'economy')?.score || 0,
  //           foreign_policy_rate: currentIndicators.find(i => i.id === 'foreign')?.score || 0,
  //           domestic_policy_rate: currentIndicators.find(i => i.id === 'domestic')?.score || 0,
  //           social_policy_rate: currentIndicators.find(i => i.id === 'social')?.score || 0,
  //           instability_ratio: score
  //         }
  //       ])
  //       .select()
  //       .single();

  //     if (error) throw error;

  //     const results: Results = {
  //       compositeScore: score,
  //       label: getScoreInterpretation(score).level,
  //       indicators: currentIndicators,
  //       communityAverages: {
  //         overall: 72.1,
  //         byAge: {
  //           '30-45': 73.5,
  //         },
  //       },
  //       surveyId: data.id // Store the Supabase record ID
  //     };

  //     navigate('/results', { state: results });
  //   } catch (error) {
  //     console.error('Error saving survey response:', error);
  //     setError('Failed to save survey response. Please try again.');
  //   }
  // };

  const getScoreInterpretation = (score: number) => {
    if (score <= 20) return { level: 'Very Low Instability', description: 'Stable environment with minimal risks.' };
    if (score <= 40) return { level: 'Low Instability', description: 'Some risks present, but manageable.' };
    if (score <= 60) return { level: 'Moderate Instability', description: 'Noticeable risks that require attention.' };
    if (score <= 80) return { level: 'High Instability', description: 'Significant risks with potential for major shifts.' };
    return { level: 'Extreme Instability', description: 'Critical risks that could lead to severe consequences.' };
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          How Instable Do You Think Things Are?
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Grid container spacing={4}>
            {currentIndicators.map((indicator, index) => (
              <Grid item xs={12} key={indicator.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Paper elevation={2} sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ mr: 1 }}>
                        {indicator.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleInfoClick(e, indicator.id)}
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                      <Popover
                        open={Boolean(anchorEl[indicator.id])}
                        anchorEl={anchorEl[indicator.id]}
                        onClose={() => handleInfoClose(indicator.id)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        disablePortal
                      >
                        <Box sx={{ p: 2, maxWidth: 400 }}>
                          {/* <Typography variant="h6" gutterBottom>
                            {indicatorDescriptions[indicator.id as keyof typeof indicatorDescriptions].title}
                          </Typography> */}
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                            {indicatorDescriptions[indicator.id as keyof typeof indicatorDescriptions].description}
                          </Typography>
                        </Box>
                      </Popover>
                    </Box>

                    <Box sx={{ width: '100%', mb: 3 }}>
                      {/* <Typography gutterBottom>
                        Fine-tune Score: {indicator.score}
                      </Typography> */}
                      <Slider
                        value={indicator.score}
                        onChange={(_, value) => handleScoreChange(indicator.id, value as number)}
                        min={0}
                        max={100}
                        step={1}
                        marks={[
                          { value: 0, label: '0' },
                          { value: 25, label: '25' },
                          { value: 50, label: '50' },
                          { value: 75, label: '75' },
                          { value: 100, label: '100' },
                        ]}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => value}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        You're giving this a:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1.2 }}>
                        {(['A', 'B', 'C', 'D', 'F'] as const).map(grade => (
                          <Button
                            key={grade}
                            variant={indicator.grade === grade ? 'contained' : 'outlined'}
                            //onClick={() => handleGradeChange(indicator.id, grade)}
                            sx={{ minWidth: '40px'}}
                          >
                            {grade}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Demographics
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Age Range</InputLabel>
                <Select
                  value={demographics.ageRange || ''}
                  onChange={e =>
                    setDemographics((prev: Demographics) => ({
                      ...prev,
                      ageRange: e.target.value as string,
                    }))
                  }
                  label="Age Range"
                >
                  <MenuItem value="18-24">18-24</MenuItem>
                  <MenuItem value="25-34">25-34</MenuItem>
                  <MenuItem value="35-44">35-44</MenuItem>
                  <MenuItem value="45-54">45-54</MenuItem>
                  <MenuItem value="55-64">55-64</MenuItem>
                  <MenuItem value="65+">65+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select
                  value={demographics.region || ''}
                  onChange={e =>
                    setDemographics((prev: Demographics) => ({
                      ...prev,
                      region: e.target.value as string,
                    }))
                  }
                  label="Region"
                >
                  <MenuItem value="northeast">Northeast</MenuItem>
                  <MenuItem value="southeast">Southeast</MenuItem>
                  <MenuItem value="midwest">Midwest</MenuItem>
                  <MenuItem value="southwest">Southwest</MenuItem>
                  <MenuItem value="west">West</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ px: 4, py: 2 }}
          >
            Submit Evaluation
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EvaluationPage; 