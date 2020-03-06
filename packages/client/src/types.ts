type Award = GenericKeys & {
  shortName: string;
  recipientType: string;
  history: string;
  imageUrl: string;
  homePageUrl: string;
};
type Awards = Award[];

type Venue = GenericKeys & {
  appEnabled: boolean;
};

interface TeamStats {
  gamesPlayed?: number;
  wins: number;
  losses: number;
  ot: number;
  pts: number;
  ptPctg: string;
  goalsPerGame: number;
  goalsAgainstPerGame: number;
  evGGARatio: number;
  powerPlayPercentage: string;
  powerPlayGoals: number;
  powerPlayGoalsAgainst: number;
  powerPlayOpportunities: number;
  penaltyKillPercentage: string;
  shotsPerGame: number;
  shotsAllowed: number;
  winScoreFirst: number;
  winOppScoreFirst: number;
  winLeadFirstPer: number;
  winLeadSecondPer: number;
  winOutshootOpp: number;
  winOutshotByOpp: number;
  faceOffsTaken: number;
  faceOffsWon: number;
  faceOffsLost: number;
  faceOffWinPercentage: string;
  shootingPctg: number;
  savePctg: number;
}

type Standing = Pick<GenericKeys, "name" | "description">;
type Standings = Standing[];
