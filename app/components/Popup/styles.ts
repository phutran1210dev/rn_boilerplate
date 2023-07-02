import {backgroundColor} from '@constants';
import {Responsive} from '@utils';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor.backgroundDialog,
  },
  ctnContent: {
    width: '80%',
    backgroundColor: backgroundColor.background,
    paddingVertical: Responsive.height(16),
    paddingHorizontal: Responsive.width(16),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
