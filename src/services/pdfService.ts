import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { Results } from '../types';

const getGrade = (score: number): string => {
  if (score >= 80) return 'A';
  if (score >= 60) return 'B';
  if (score >= 40) return 'C';
  if (score >= 20) return 'D';
  return 'F';
};

const getStabilityText = (score: number): string => {
  if (score >= 80) return 'Extremely Stable';
  if (score >= 60) return 'Highly Stable';
  if (score >= 40) return 'Moderately Stable';
  if (score >= 20) return 'Low Stability';
  return 'Very Unstable';
};

const getScoreColor = (score: number): [number, number, number] => {
  if (score <= 20) return [0.96, 0.26, 0.21]; // Red
  if (score <= 40) return [1, 0.6, 0]; // Orange
  if (score <= 60) return [1, 0.76, 0.03]; // Gold
  if (score <= 80) return [0.55, 0.76, 0.29]; // Light green
  return [0.3, 0.69, 0.31]; // Green
};

export const generatePDFReport = async (results: Results, firstName: string) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Single page report
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();
    
    let yPosition = height - 60;
    
    // Header
    page.drawText('Stability Evaluation Report', {
      x: 50,
      y: yPosition,
      size: 24,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 40;
    
    const currentDate = new Date().toLocaleDateString();
    const reportId = `NBLK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(results.surveyId).padStart(3, '0')}`;
    
    page.drawText(`Date: ${currentDate}`, {
      x: 50,
      y: yPosition,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 20;
    
    page.drawText(`Report ID: ${reportId}`, {
      x: 50,
      y: yPosition,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 40;
    
    // Stability Score Section
    page.drawText('Stability Score', {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 25;
    
    const score = results.compositeScore.toFixed(1);
    const stabilityText = getStabilityText(results.compositeScore);
    
    page.drawText(`Score: "${score}/100 - ${stabilityText}"`, {
      x: 70,
      y: yPosition,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 20;
    
    page.drawText(`Interpretation: Indicates a stable status with some risks present, providing a`, {
      x: 70,
      y: yPosition,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 15;
    
    page.drawText(`foundation for further analysis and action.`, {
      x: 70,
      y: yPosition,
      size: 11,
      font,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 40;
    
    // Visual Data Representation Section
    page.drawText('Visual Data Representation', {
      x: 50,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 30;
    
    // Score Comparison Chart
    page.drawText('Score Comparison Chart', {
      x: 50,
      y: yPosition,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 30;
    
    // Simple Bar Graph - User vs Average
    const graphStartY = yPosition - 20;
    const graphHeight = 80;
    const graphWidth = 400;
    const barHeight = 25;
    
    // Graph background
    page.drawRectangle({
      x: 70,
      y: graphStartY - graphHeight,
      width: graphWidth,
      height: graphHeight,
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });
    
    // User score bar
    const userScoreWidth = (results.compositeScore / 100) * (graphWidth - 40);
    const userColor = getScoreColor(results.compositeScore);
    
    page.drawRectangle({
      x: 90,
      y: graphStartY - 30,
      width: userScoreWidth,
      height: barHeight,
      color: rgb(userColor[0], userColor[1], userColor[2]),
    });
    
    page.drawText(`Your Score: ${score}`, {
      x: 90,
      y: graphStartY - 25,
      size: 10,
      font: boldFont,
      color: rgb(1, 1, 1),
    });
    
    // Average score bar
    const avgScore = results.communityAverages?.overall || 72.1;
    const avgScoreWidth = (avgScore / 100) * (graphWidth - 40);
    const avgColor = getScoreColor(avgScore);
    
    page.drawRectangle({
      x: 90,
      y: graphStartY - 65,
      width: avgScoreWidth,
      height: barHeight,
      color: rgb(avgColor[0], avgColor[1], avgColor[2]),
    });
    
    page.drawText(`Average Score: ${avgScore.toFixed(1)}`, {
      x: 90,
      y: graphStartY - 60,
      size: 10,
      font: boldFont,
      color: rgb(1, 1, 1),
    });
    
    yPosition = graphStartY - graphHeight - 50;
    
    // Contact Information
    page.drawText('Contact Info: info@n-blk.com', {
      x: 50,
      y: yPosition,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    
    // Footer with company info
    page.drawText('NBLK Consulting', {
      x: width - 120,
      y: 50,
      size: 12,
      font: boldFont,
      color: rgb(0.13, 0.55, 0.13),
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF report. Please try again later.');
  }
}; 