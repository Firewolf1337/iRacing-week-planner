// @flow
import * as React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

type Props = {
  race: {
    raceweek: string,
  }
};
export default function RaceWeek({ race }: Props) {
  const { t } = useTranslation();

  return (
    <td>
      <div>
        {race.week+1}
      </div>
    </td>
  );
}
