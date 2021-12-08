// @flow

import axios from 'axios';
import i18n from 'i18next';
import * as React from 'react';

import { useTranslation } from 'react-i18next';
import styles from './styles/buyACoffee.module.css';

export default function BuyACoffee(): React.Node {
  const { t, i18n } = useTranslation();
  const getBCUrl = async () => {
    let response;
    try {
      response = await axios.get(' https://geolocation-db.com/json/09068b10-55fe-11eb-8939-299a0c3ab5e5', {
        headers: { Accept: '' }, // Avoid OPTION
      });
    } catch (error) {
      if (i18n.language === 'en-GB') {
        return 'https://www.buymeacoffee.com/iwpgbp';
      }
      if (['es', 'fr', 'de'].includes(i18n.language)) {
        return 'https://www.buymeacoffee.com/iwpeur';
      }
      return 'https://www.buymeacoffee.com/tmoitie';
    }

    if (response.data.country_code === 'GB') {
      return 'https://www.buymeacoffee.com/iwpgbp';
    }

    const euroCountries = [
      'AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'ES', 'SI', 'SK',
      'XK', 'ME', 'AD', 'MC', 'SM', 'VA',
    ];

    if (euroCountries.includes(response.data.country_code)) {
      return 'https://www.buymeacoffee.com/iwpeur';
    }

    return 'https://www.buymeacoffee.com/tmoitie';
  };

  const clickBuyCoffee = async () => {
    window.location = await getBCUrl();
  };
  const blink_text = {
    animation:'4s `${blinker} linear infinite',
    WebkitAnimation:'4s `${blinker} linear infinite',
    MozAnimation:'4s `${blinker} linear infinite',

     color: 'red',
    };
  const blinker = (props) =>  keyframes` 
     0% { opacity: 1.0; }
     50% { opacity: 0.0; }
     100% { opacity: 1.0; }
     }
`;

  return (
	    <a
              id="navbar-link-buyCoffee"
              href=""
              onClick={clickBuyCoffee}
            >
              <span className="blink_text">{t('Buy me a coffee')}</span>
            </a>
  );
}
