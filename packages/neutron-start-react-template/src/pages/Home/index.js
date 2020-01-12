import React from 'react';

import Hello from '@/components/Hello';
import Toast from '@/utils/toast';

import { StyledContainer } from './styles';

function Home() {
  Toast.success('Hello, dev! How are you?');
  return (
    <StyledContainer>
      <Hello />
    </StyledContainer>
  );
}

export default Home;
