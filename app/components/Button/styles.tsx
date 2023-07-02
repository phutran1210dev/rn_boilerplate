import { backgroundColor, borderColor, textColor, pastelColor } from '@constants';
import { Responsive } from '@utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  btnDefault: {
    flexDirection: 'row',
    height: Responsive.height(57),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor.background,
    borderRadius: 8,
    borderWidth: Responsive.width(1),
    borderColor: borderColor.pastelCoral,
  },
  txtNormal: {
    includeFontPadding: false,
  },
  ctnDisable: {
    flexDirection: 'row',
    height: Responsive.height(57),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    borderRadius: 8,
    backgroundColor: backgroundColor.backgroundInactive,
    opacity: 0.4,
  },
  ctnWhite: {
    flexDirection: 'row',
    height: Responsive.height(57),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    color: textColor.descText,
    backgroundColor: backgroundColor.background,
    borderWidth: Responsive.width(1),
  },
  txtWhite: {
    color: textColor.txtWhite,
    includeFontPadding: false,
  },
  ctnPayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: Responsive.width(13),
    marginRight: Responsive.width(13),
  },
  txtPayment: {
    color: textColor.primaryText,
    includeFontPadding: false,
  },
  stylePrimary: {
    backgroundColor: pastelColor.pastelAqua,
    borderColor: pastelColor.pastelAqua,
  },
  txtPrimary: {
    color: textColor.txtWhite,
  },
  icon: {},
});
