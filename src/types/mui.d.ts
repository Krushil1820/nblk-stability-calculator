import '@mui/material';

declare module '@mui/material/Grid' {
  interface GridProps {
    item?: boolean;
    container?: boolean;
    xs?: number | 'auto' | true;
    sm?: number | 'auto' | true;
    md?: number | 'auto' | true;
    lg?: number | 'auto' | true;
    xl?: number | 'auto' | true;
  }
} 

export type EvaluationState = {
  demographics: {
    ageRange: string;
    region: string;
  };
};
