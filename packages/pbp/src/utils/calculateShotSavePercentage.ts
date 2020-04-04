/**
 * calculateShotPercentage - get the shooting percentage for a given player/team based off of their goals vs. shots
 *
 * @param goals - number of goals scored
 * @param shots - number of shots taken
 */
export const calculateShotPercentage = (
  goals: number,
  shots: number
): number => {
  const shotPercentage = (goals / shots) * 100;

  return Number(shotPercentage.toFixed(1));
};

/**
 * calculateSavePercentage - get the save percentage for a given player/team based on saves vs shots
 *
 * @param goals - number of goals scored
 * @param shots - number of shots taken
 */
export const calculateSavePercentage = (
  goals: number,
  shots: number
): number => {
  const saves = shots - goals;
  const savePercentage = (saves / shots) * 100;

  return Number(savePercentage.toFixed(2));
};
