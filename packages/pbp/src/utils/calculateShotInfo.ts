const NET_LOCATION: number = 89;

/**
 * calculateShotDistance - calculate the distance of the shot in feet based on the play location coordinates and net location
 *
 * the NHL API gives coordinate location in feet
 * helpful diagram: https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Ice_hockey_layout.svg/400px-Ice_hockey_layout.svg.png
 *
 * @param x - X coordinate of the play
 * @param y - Y coordinate of the play
 */
export const calculateShotDistance = (x: number, y: number): number => {
  const deltaX: number = NET_LOCATION - Math.abs(x);
  const deltaY: number = -1 * y;

  const shotDistance: number = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  return Number(shotDistance.toFixed(2));
};

/**
 * calculateShotAngle - calculate the angle in degrees of a shot based on the play location coordinates and net location
 *
 * @param x - X coordinate of the play
 * @param y - Y coordinate of the play
 */
export const calculateShotAngle = (x: number, y: number): number => {
  // get the angle between the Y coordinate and the offset X coordinate
  const arcRads: number = Math.atan(y / (NET_LOCATION - Math.abs(x)));
  // arctangent is returned in radians, we want degrees
  const radiansToDegrees: number = 180 / Math.PI;

  const shotAngle: number = Math.abs(arcRads * radiansToDegrees);

  return Number(shotAngle.toFixed(2));
};

/**
 * calculateShotInfo - helper that gets both shot angle and distance
 *
 * @param x - X coordinate of the play
 * @param y - Y coordinate of the play
 */
export const calculateShotInfo = (
  x: number,
  y: number
): { shotAngle: number; shotDistance: number } => {
  const shotAngle = calculateShotAngle(x, y);
  const shotDistance = calculateShotDistance(x, y);

  return {
    shotAngle,
    shotDistance
  };
};
