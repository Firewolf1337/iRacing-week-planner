// @flow

import classnames from 'classnames';
import intersection from 'lodash.intersection';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import StarIcon from '../icon/StarIcon';
import SeriesModal from '../modal/SeriesModal';
import ClickableCell from './ClickableCell';
import styles from './styles/columns.module.scss';

import allRaces from '../../lib/races';

type Props = {
  race: {
    seriesId: number,
    series: string,
  },
  favouriteSeries: Array<number>,
  ownedTracks: Array<number>,
  image: string,
  showImage: boolean,
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

export default function Series({ race, favouriteSeries, ownedTracks, showImage, image }: Props) {
  const races = allRaces.filter((loadrace) => loadrace.seriesId === race.seriesId);
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const { t } = useTranslation();
  const img = "./static/series/"+ race.seriesId + ".jpg";
  const showImg = true;
  const ownedTracksCount = getOwnedTracksCount(races, ownedTracks);
  return (
    <>
      <ClickableCell onClick={openModal}>
      <img src={img} style={{height: '1.7em'}}/>
        {favouriteSeries.indexOf(race.seriesId) !== -1 ? (
          <StarIcon />
        ) : null}

        <span> </span>

        {t(race.series)}  ({ownedTracksCount}/{races.length})
      </ClickableCell>
      {modalOpen ? (
        <SeriesModal isOpen={modalOpen} onClose={closeModal} ownedTracks={ownedTracks} seriesId={race.seriesId} showImage={showImg} image ={img} />
      ) : null}
    </>
  );
}
