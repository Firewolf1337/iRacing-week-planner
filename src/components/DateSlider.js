// @flow

import { Slider, RangeSlider } from '@blueprintjs/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateDays } from '../actions/app';

import { seasonStart, seasonEnd } from '../config';
import styles from '../styles/main.module.scss';

const seasonLengthDays = seasonEnd.diff(seasonStart, 'days');

const dateDaysSelector = (state) => state.app.daysSinceSeasonStart;
const dateDaysSelector2 = (state) => state.app.daysSinceSeasonStart2;
const dateSelector = (state) => state.app.date;
const dateSelector2 = (state) => state.app.date2;
const weekSelector = (state) => state.app.week;
const weekSelector2 = (state) => state.app.week2;



export default function DateSlider() {
  const { t } = useTranslation();
  const dateDays = useSelector(dateDaysSelector);
  const dateDays2 = useSelector(dateDaysSelector2);
  const date = useSelector(dateSelector, shallowEqual);
  const date2 = useSelector(dateSelector2, shallowEqual);
  const week = useSelector(weekSelector);
  const week2 = useSelector(weekSelector2);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.row}>
        <h3 className={styles['col-xs-8']}>
          {t('Races for date: {{date, YYYY MMM DD}}', { date: date.local().toDate() })} - {t('{{date, YYYY MMM DD}}', { date: date2.local().toDate() })} 
        </h3>
        <h3 className={styles['col-xs-4']} style={{ textAlign: 'right' }}>
          {t('Week {{week}}', { week })} - { week2 }
        </h3>
      </div>
      <div style={{ marginBottom: 10 }}>
        <RangeSlider
          min={0}
          max={seasonLengthDays}
          value={[dateDays, dateDays2]}
          stepSize={1}
          labelStepSize={seasonLengthDays}
          onChange={(days) => dispatch(updateDays(days)) }
          labelRenderer={true}
        />
      </div>
    </>
  );
}
