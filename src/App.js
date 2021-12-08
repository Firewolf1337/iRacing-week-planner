// @flow

import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StaticRouter } from 'react-router-dom';


import DateSlider from './components/DateSlider';
import GlobalModals from './components/GlobalModals';
import Navbar from './components/Navbar';

import { startListener } from './actions/auth';

import RaceListing from './components/RaceListing';
import Filters from './components/Filters';

import styles from './styles/main.module.scss';

import '@blueprintjs/core/lib/css/blueprint.css';
import { Switch } from '@blueprintjs/core';

export default function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(startListener());
  }, []);

  return (
    <div>
      <Navbar />
      <GlobalModals />
      <div className={styles['container-fluid']}>
        <div className={styles.row}>
        <div className={styles['col-md-12']}>
            <details>
		        <summary style={{display: 'list-item', fontSize: '1.5em', outline: 'none' }}>{t('Filters')}</summary>
            <Filters /></details>
          </div>
          <div className={styles['col-md-12']}>
            <DateSlider />
            <RaceListing />
          </div>
        </div>
      </div>
    </div>
  );
}
