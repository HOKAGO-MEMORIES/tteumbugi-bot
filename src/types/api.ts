export interface Tier {
  tierName: string;
  tierPoint: number;
}

export interface DjClass {
score: number;
  rawTotal: number;
  basicSum: number;
  newSum: number;
  displayScore: string; 
  grade: string;        
}

export interface ImprovementRecommendation {
  title: string;
  difficulty: string;
  level: number;
  currentScore: number;
  currentDjPower: number;
  targetScore: number;
  targetDjPower: number;
  powerIncrease: number;
}

export interface NewSongRecommendation {
  title: string;
  category: string;
  difficulty: string;
  level: number;
  targetScore: number;
  expectedDjPower: number;
  gapOverCutoff: number;
}

// API 전체 응답
export interface AnalyzeResponse {
  tier: Tier;
  djClass: DjClass;
  improvements: ImprovementRecommendation[];
  newSongs: NewSongRecommendation[];
}