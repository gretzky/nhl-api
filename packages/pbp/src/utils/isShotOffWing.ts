/**
 * isShotOffWing - whether or not a player's shot was off their wing (shot from the opposite wing of their shooting side, i.e. a player that shoots right shooting from the left)
 *
 * @param playerShootSide - the player's shooting side
 */
export const isShotOffWing = (
  playerShootSide: string,
  teamSide: string,
  period: number,
  yCoord: number
): boolean => {
  // the home team is on the left side of the rink during periods 1 and 3
  const isLeftSideHome: boolean =
    teamSide === "home" && (period === 1 || period === 3);
  // away team is on the left during period 2
  const isLeftSideAway: boolean = teamSide === "away" && period === 2;
  // home team is on the right period 2
  const isRightSideHome: boolean = teamSide === "home" && period === 2;
  // away team is on the right periods 1 and 3
  const isRightSideAway: boolean =
    teamSide === "away" && (period === 1 || period === 3);

  // to get the off wing, we match the opposite coordinate to the player's shooting side based on the side of the rink they're shooting at

  if (isLeftSideAway || isLeftSideHome) {
    // if the player is a left-handed shooter on the left-hand side of the rink
    // their offwing side is positive y coordinate.
    // if they're a right handed shooter, it's the negative y coordinate
    return playerShootSide === "left" ? yCoord > 0 : yCoord < 0;
  } else if (isRightSideAway || isRightSideHome) {
    // if the player is shooting on the right side, it's the opposite case
    // where the off wing is the negative coordinate if they're left-handed
    // and the positive coordiante in they're right handed
    return playerShootSide === "left" ? yCoord < 0 : yCoord > 0;
  }
};
