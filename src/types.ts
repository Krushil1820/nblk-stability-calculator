export interface Indicator {
  id: string;
  name: string;
  description: string;
  weight: number;
  grade: string;
  score: number;
  color?: string;
}

export interface Demographics {
  ageRange?: string;
  region?: string;
}

export interface CommunityAverages {
  [x: string]: any;
  overall: number;
  byAge?: Record<string, number>;
}

export interface Results {
  compositeScore: number;
  label: string;
  indicators: Indicator[];
  communityAverages?: CommunityAverages;
  surveyId?: string;
}

export interface EvaluationState {
  demographics: Demographics;
} 