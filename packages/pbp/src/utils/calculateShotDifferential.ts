export interface Corsi {
  cf: number;
  ca: number;
  corsi: number;
  corsiPctg: string;
}

export interface Fenwick {
  ff: number;
  fa: number;
  fenwick: number;
  fenwickPctg: string;
}

export interface Shots {
  goals: number;
  shots: number;
  missed: number;
  blocked: number;
}

/**
 * calculateShotDifferential - get the shot differential (either corsi or fenwick) rating/percentage for a team/player
 *
 * @param goals - goals scored
 * @param shots - shots on target
 * @param missedShots - missed shots (off net)
 * @param blockedShots - blocked shots
 */
export const calculateShotDifferential = (
  forShots: Shots,
  againstShots: Shots
): Corsi | Fenwick => {
  const cf: number =
    forShots.goals + forShots.shots + forShots.missed + forShots.blocked;
  const ca: number =
    againstShots.goals +
    againstShots.shots +
    againstShots.missed +
    againstShots.blocked;

  const ff: number = forShots.goals + forShots.shots + forShots.missed;
  const fa: number =
    againstShots.goals + againstShots.shots + againstShots.missed;

  return {
    cf,
    ca,
    corsi: cf - ca,
    corsiPctg: ((cf / (cf + ca)) * 100).toFixed(1),
    ff,
    fa,
    fenwick: ff - fa,
    fenwickPctg: ((ff / (ff + fa)) * 100).toFixed(1),
  };
};
