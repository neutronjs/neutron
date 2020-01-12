import Toast from 'react-native-simple-toast';

export default (message) => {
  Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
};
