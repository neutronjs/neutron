import React from 'react';

import { StyledContainer, StyledNeutronLogo } from './styles';

export default function Hello() {
  return (
    <StyledContainer>
      <StyledNeutronLogo />
      <h1>Neutron JS</h1>
      <small>
        <b>For more information: </b>
        <a href="https://www.neutronjs.com" target="__blank">
          click here!
        </a>
      </small>
    </StyledContainer>
  );
}
