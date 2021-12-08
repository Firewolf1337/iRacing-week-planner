// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import classnames from 'classnames';
import Modal from './Modal';
import TrackModal from './TrackModal';
import RaceLength from '../columns/RaceLength';
import ClickableCell from '../columns/ClickableCell';
import ShoppingCartIcon from '../icon/ShoppingCartIcon';
import allRaces from '../../lib/races';

import styles from '../../styles/main.module.scss';

const now = moment().utc();

type Props = {
  onClose: () => void,
  isOpen: boolean,
  ownedTracks: Array<number>,
  seriesId: number,
  showImage: boolean,
  image: string,
};

export function getOwnedTracksCount(races, ownedTracks){
  var c = 0; 
  for(var i = 0; i < (races).length; i++){
    if((ownedTracks.indexOf(races[i].trackId)) !== -1){
      c ++;
    }
  }
  return c;
}

export default function SeriesModal({ onClose, ownedTracks, isOpen, seriesId, showImage, image }: Props) {
  const races = allRaces.filter((race) => race.seriesId === seriesId);
  const { t } = useTranslation();
  const ownedTracksCount = getOwnedTracksCount(races, ownedTracks);
  const img = "./static/series/"+ seriesId + ".jpg";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('Tracks for {{series}}', {
        series: t(races[0].series),
      })}
      doneAction={onClose}
      showImage={true}
      image={img}

    >
      <div className={styles['container-fluid']}>
        <div className={styles['table-responsive']}>
          <table className={styles.table} style={{ fontSize: '0.8em' }}>
            <thead>
              <tr>
                <th>{t('Week')}</th>
                <th>{t('Track')} ({ownedTracksCount}/{races.length}) </th>
                <th>{t('Start')}</th>
                <th>{t('End')}</th>
                <th>{t('Length')}</th>
                <th>{t('Link')}</th>
              </tr>
            </thead>
            <tbody>
              {races.map((race) => {
                const raceWeekEnd = moment(race.startTime).add(race.weekLength);
                const current = now.isBetween(race.startTime, raceWeekEnd);

                const startDate = moment(race.startTime).local().toDate();
                const endDate = moment(race.startTime).local().add(race.weekLength)
                  .subtract(1, 'days')
                  .toDate();
                  const [modalOpen, setModalOpen] = React.useState(false);
                  const openModal = () => {
                    setModalOpen(true);
                  };
                return (
                  <tr key={race.week} style={current ? { fontWeight: 700 } : {}}>
                    <td>
                      {race.week + 1}
                    </td>
                        <ClickableCell 
                          className={classnames({
                            [styles.success]: ownedTracks.indexOf(race.trackId) !== -1,
                          })}
                          onClick={openModal}
                          >
                            {race.track}
                        </ClickableCell>
                        <TrackModal
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            trackId={race.trackNumber}
                            track={race.track}
                          />
                    <td>
                      {t('{{date, YYYY-MM-DD}}', { date: startDate })}
                    </td>
                    <td>
                      {t('{{date, YYYY-MM-DD}}', { date: endDate })}
                    </td>
                    <RaceLength race={race} />
                    <td>
                      <a
                        href={`https://members.iracing.com/membersite/member/TrackDetail.do?trkid=${race.trackNumber}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                      <ShoppingCartIcon />
                    </a>
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
