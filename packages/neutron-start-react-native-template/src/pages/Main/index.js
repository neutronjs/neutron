import React from 'react';

import Hello from '@/components/Hello';
import Toast from '@/utils/toast';

import { StyledContainer } from './styles';

const Main = () => {
  Toast('Hello, dev! How are you?');
  return (
    <StyledContainer>
      <Hello title="Neutron JS" message="React Native Template!" />
    </StyledContainer>
  );
};

export default Main;
