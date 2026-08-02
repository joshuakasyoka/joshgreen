import React from 'react';
import RotatingClientLogo from './RotatingClientLogo';

/** Climate Truth Crisis / Erasmus+ EU flag badge. */
const EuRotatingLogo = ({ className = '', size = 40 }) => (
  <RotatingClientLogo
    src="/images/participatory/climate-truth-crisis/eu-flag.svg"
    clientLabel="Client: Erasmus +"
    className={className}
    size={size}
    fit="cover"
  />
);

export default EuRotatingLogo;
