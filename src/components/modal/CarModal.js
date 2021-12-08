// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import StarIcon from '../icon/StarIcon';
import Modal from './Modal';
import ShoppingCartIcon from '../icon/ShoppingCartIcon';

import raceListingStyles from '../styles/raceListing.module.scss';

import allCars from '../../data/cars.json';
import styles from '../../styles/main.module.scss';

type Props = {
  onClose: () => void,
  isOpen: boolean,
  ownedCars: Array<number>,
  favouriteCars: Array<number>,
  carIds: Array<number>,
  seriesName: string,
};

export default function CarModal({ onClose, ownedCars, favouriteCars, isOpen, carIds, seriesName }: Props) {
  const cars = allCars.filter((car) => carIds.includes(car.sku));
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('Cars for {{series}}', {
        series: t(seriesName),
      })}
      doneAction={onClose}
    >
      <div className={styles['container-fluid']}>
        <div className={styles['table-responsive']}>
          <table className={styles.table} style={{ fontSize: '0.8em' }}>
            <thead>
              <tr>
                <th>{t('Car')}</th>
                <th>{t('Car')}</th>
                <th>{t('Price')}</th>
                <th>{t('Link')}</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr
                  key={car}
                  className={classnames({
                    [styles.success]: ownedCars.includes(car.sku),
                    [raceListingStyles.clickableCell]: true,
                  })}
                >
                  <td style={{padding: '0px'}}>
                    <div>
                    <img src={`./static/cars/${car.carId}.jpg`} alt={t(car.name)} style={{height:'50px'}}/>
                    </div>
                  </td>
                  <td>
                    {favouriteCars.includes(car.sku) ? (
                      <StarIcon />
                    ) : null}
                    <span> </span>
                    {t(car.name)}
                  </td>
                  <td>
                    {t('$'+car.carPrice)}
                  </td>
                  <td>
                  <a
                      href={`https://members.iracing.com/membersite/member/CarDetail.do?carid=${car.carId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ShoppingCartIcon />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
