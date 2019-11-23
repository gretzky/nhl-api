import teams from '@nhl-api/teams';
import { get, throwError, BaseOptions, handleUrl } from '../util';

type ScheduleOptions = BaseOptions & {
  expand?: string;
  team?: any;
  date?: string;
  startDate?: string;
  endDate?: string;
};

export default async function getSchedule(
  options?: ScheduleOptions
): Promise<void> {
  const url = handleUrl('schedule', options);

  if (options && options.expand) {
    options.expand = `schedule.${options.expand}`;
  }

  if (options && options.team) {
    if (typeof options.team === 'string' && options.team.length > 2) {
      options.team = teams.filter(
        (team: any) => team.name === options.team
      )[0].id;
    }
    delete Object.assign(options, { ['teamId']: options['team'] })['team'];
  }

  try {
    const response = await get(url, options).then((data: any) => {
      delete data.wait;
      return data;
    });
    return Promise.resolve(response);
  } catch (err) {
    return throwError('getSchedule', err);
  }
}
