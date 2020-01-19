import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  baseMargin: 10,
  basePadding: 15,
  baseRadius: 5,
  screenWidth: width < height ? width : height,
  screenHeight: height > width ? height : width,
};
