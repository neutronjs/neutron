import styled from 'styled-components/native';
import { colors, metrics } from '@/styles';

export const StyledContainer = styled.View`
  align-items: center;
  background-color: ${colors.secundary};
  border-radius: ${metrics.baseRadius}px;
  display: flex;
  height: 300px;
  justify-content: center;
  margin-top: ${metrics.screenHeight * 0.2}px;
  width: 300px;
`;

export const StyledLogo = styled.Image`
  height: 150px;
  width: 150px;
`;

export const StyledTitle = styled.Text`
  color: ${colors.lighter};
  font-size: 24px;
  text-align: center;
`;

export const StyledMessage = styled.Text`
  color: ${colors.lighter};
  font-size: 14px;
  margin-top: ${metrics.baseMargin * 2}px;
  text-align: center;
`;
