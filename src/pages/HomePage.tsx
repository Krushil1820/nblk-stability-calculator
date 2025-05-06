// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Container,
// //   Paper,
// //   Grid,
// // } from '@mui/material';
// // import { motion } from 'framer-motion';
// // import IsometricScene from '../components/IsometricScene';

// // const HomePage: React.FC = () => {
// //   const navigate = useNavigate();

// //   return (
// //     <Container maxWidth="md">
// //       {/* <Box 
// //         sx={{ 
// //           minHeight: '100vh',
// //           display: 'flex',
// //           flexDirection: 'column',
// //           justifyContent: 'center',
// //           alignItems: 'center',
// //           py: 4,
// //         }}
// //       >
// //         <Grid 
// //           container 
// //           spacing={4} 
// //           alignItems="center"
// //           justifyContent="center"
// //           sx={{ maxWidth: '1200px' }}
// //         >
// //           <Grid item xs={12} md={6}>
// //             <motion.div
// //               initial={{ opacity: 0, x: -20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.5 }}
// //             > */}
// //             <Box
// //             <Grid>
// //         sx={{
// //           minHeight: '100vh',
// //           display: 'flex',
// //           flexDirection: 'column',
// //           justifyContent: 'center',
// //           alignItems: 'center',
// //           py: 4,
// //         }}
// //       >
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8 }}
// //         >
// //           <Paper
// //             elevation={3}
// //             sx={{
// //               p: 4,
// //               textAlign: 'center',
// //               maxWidth: 600,
// //               mx: 'auto',
// //             }}
// //           ></Paper>
// //               <Typography 
// //                 variant="h2" 
// //                 component="h1" 
// //                 gutterBottom 
// //                 align="center"
// //                 sx={{ mb: 3 }}
// //               >
// //                 Political Stability Calculator
// //               </Typography>
// //               <Typography 
// //                 variant="h5" 
// //                 color="text.secondary" 
// //                 paragraph 
// //                 align="center"
// //               >
// //                 Analyze and understand the key factors that contribute to political stability in your region.
// //               </Typography>
// //               <Typography 
// //                 variant="body1" 
// //                 paragraph 
// //                 align="center"
// //               >
// //                 Our interactive tool helps you evaluate various aspects of political stability,
// //                 including economic factors, security, governance, and social indicators.
// //               </Typography>
// //               <Box 
// //                 sx={{ 
// //                   mt: 4,
// //                   display: 'flex',
// //                   justifyContent: 'center',
// //                   gap: 2
// //                 }}
// //               >
// //                 <Button
// //                   variant="contained"
// //                   size="large"
// //                   onClick={() => navigate('/evaluate')}
// //                 >
// //                   Start Evaluation
// //                 </Button>
// //                 <Button
// //                   variant="outlined"
// //                   size="large"
// //                   onClick={() => navigate('/about')}
// //                 >
// //                   Learn More
// //                 </Button>
// //               </Box>
// //             </motion.div>
// //           </Grid>
// //           <Grid item xs={12} md={6}>
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: 0.2 }}
// //             >
// //               <Paper
// //                 elevation={3}
// //                 sx={{
// //                   p: 2,
// //                   borderRadius: 2,
// //                   overflow: 'hidden',
// //                   display: 'flex',
// //                   justifyContent: 'center',
// //                 }}
// //               >
// //                 <IsometricScene />
// //               </Paper>
// //             </motion.div>
// //           </Grid>
// //         </Grid>
// //       </Box>
// //     </Container>
// //   );
// // }

// // export default HomePage; 


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Paper,
//   Grid,
// } from '@mui/material';
// import { motion } from 'framer-motion';
// import IsometricScene from '../components/IsometricScene';

// const HomePage: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <Container maxWidth="md">
//       <Box
//         sx={{
//           minHeight: '100vh',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           py: 4,
//         }}
//       >
//         <Grid
//           container
//           spacing={4}
//           alignItems="center"
//           justifyContent="center"
//           sx={{ maxWidth: '1200px' }}
//         >
//           {/* -------- LEFT COLUMN -------- */}
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 4,
//                   textAlign: 'center',
//                   maxWidth: 600,
//                   mx: 'auto',
//                 }}
//               >
//                 <Typography
//                   variant="h2"
//                   component="h1"
//                   gutterBottom
//                   sx={{ mb: 3 }}
//                 >
//                   Political Stability Calculator
//                 </Typography>

//                 <Typography variant="h5" color="text.secondary" paragraph>
//                   Analyze and understand the key factors that contribute to
//                   political stability in your region.
//                 </Typography>

//                 <Typography variant="body1" paragraph>
//                   Our interactive tool helps you evaluate various aspects of
//                   political stability, including economic factors, security,
//                   governance, and social indicators.
//                 </Typography>

//                 <Box
//                   sx={{
//                     mt: 4,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     gap: 2,
//                   }}
//                 >
//                   <Button
//                     variant="contained"
//                     size="large"
//                     onClick={() => navigate('/evaluate')}
//                   >
//                     Start Evaluation
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     size="large"
//                     onClick={() => navigate('/about')}
//                   >
//                     Learn More
//                   </Button>
//                 </Box>
//               </Paper>
//             </motion.div>
//           </Grid>

//           {/* -------- RIGHT COLUMN -------- */}
//           <Grid item xs={12} md={6}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   borderRadius: 2,
//                   overflow: 'hidden',
//                   display: 'flex',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <IsometricScene />
//               </Paper>
//             </motion.div>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default HomePage;
