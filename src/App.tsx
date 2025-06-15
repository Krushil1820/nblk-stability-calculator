// import React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CssBaseline from '@mui/material/CssBaseline';
// import LandingPage from './pages/LandingPage';
// import EvaluationPage from './pages/EvaluationPage';
// import ResultsPage from './pages/ResultsPage';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1B4D3E', // Dark forest green
//       contrastText: '#FFFFFF',
//     },
//     secondary: {
//       main: '#000000',
//       contrastText: '#FFFFFF',
//     },
//     background: {
//       default: '#FFFFFF',
//       paper: '#F5F5F5',
//     },
//     text: {
//       primary: '#000000',
//       secondary: '#333333',
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontWeight: 700,
//       fontSize: '2.5rem',
//     },
//     h2: {
//       fontWeight: 600,
//       fontSize: '2rem',
//     },
//     h3: {
//       fontWeight: 600,
//       fontSize: '1.75rem',
//     },
//     body1: {
//       fontSize: '1rem',
//       lineHeight: 1.5,
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           textTransform: 'none',
//           fontWeight: 600,
//           padding: '8px 24px',
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//         },
//       },
//     },
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/evaluate" element={<EvaluationPage />} />
//           <Route path="/results" element={<ResultsPage />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, IconButton, Tooltip } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import LandingPage from './pages/LandingPage';
import EvaluationPage from './pages/EvaluationPage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import { FaSun, FaMoon } from 'react-icons/fa';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#1B4D3E', // Dark forest green
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    ...lightTheme.palette,
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',

    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showTooltip, setShowTooltip] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Tooltip
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        placement="left"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
              color: isDarkMode ? 'black' : 'white',
              fontSize: '1rem',
              padding: '8px 16px',
              '& .MuiTooltip-arrow': {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
              },
            },
          },
        }}
      >
      <IconButton
        // onClick={toggleTheme}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
            transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.2)',
          },
        }}
      >
        {isDarkMode ? <FaSun color="yellow" /> : <FaMoon color="black" />}
      </IconButton>
      </Tooltip>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/evaluate" element={<EvaluationPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 