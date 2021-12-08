// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import styles from '../../styles/main.module.scss';


type Props = {
  onClose: () => void,
  isOpen: boolean,
  trackId: number,
  track: string,
};

export default function TrackModal({ onClose, trackId, isOpen, track }: Props) {
  const { t } = useTranslation();
  const img = "/static/tracks/"+ trackId + ".png";
  const svgpath = "./static/tracks/"+ trackId + ".html";
  const css = 'track.svg.scss';
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('{{trackname}}', {
        trackname: t(track),
      })}
      doneAction={onClose}
    >
      <div className={styles['container-fluid']}>
        <div className={styles['table-responsive']}>
          <iframe src={svgpath} width="100%" height="500" style={{ boader: 'none', overflow:'hidden' }} frameBorder="0" scrolling="no"></iframe>
        </div>
      </div>
    </Modal>
  );
}
