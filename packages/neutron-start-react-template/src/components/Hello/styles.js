import styled from 'styled-components';

import { ReactComponent as Logo } from '@/assets/images/neutron-logo.svg';
import colors from '@/styles/colors';

export const StyledContainer = styled.div`
  align-items: center;
  background-color: ${colors.secundary};
  border-radius: 15px;
  color: ${colors.light};
  display: flex;
  flex-direction: column;
  max-width: 350px;
  padding: 20px 0 50px 0;
  width: 100%;

  img {
    margin: 24px;
    width: 150px;
  }

  small {
    font-size: 12px;
    letter-spacing: 0.9px;
    margin-top: 20px;

    a {
      color: ${colors.primary};
    }
  }
`;

export const StyledNeutronLogo = styled(Logo)`
  fill: ${colors.light};
  margin: 20px;
  height: 150px;
  width: 150px;
`;
