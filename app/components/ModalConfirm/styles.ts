import {StyleSheet} from 'react-native';
import {Color} from '~constants';
import {Responsive} from '~utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.BackgroundDialog,
  },

  ctnContent: {
    width: '80%',
    backgroundColor: Color.White,
    paddingVertical: Responsive.height(16),
    paddingHorizontal: Responsive.width(16),
    borderRadius: 16,
  },
});
