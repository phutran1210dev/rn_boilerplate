import React, {FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Responsive} from '@utils';
import {backgroundColor, textColor} from '@constants';
import {Text, Button, PopupView} from '@components';

/**
 * Props for the CModalConfirm component
 */
type PopupProps = {
  style?: StyleProp<ViewStyle>;
  styleContent?: StyleProp<ViewStyle>;
  visible?: boolean;
  onOk?: () => any;
  onCancel?: () => any;
  title?: string;
  isOnOk?: boolean;
};

/**
 * A modal confirmation component
 */
export const ModalConfirm: FC<PopupProps> = ({
  style,
  styleContent,
  onOk,
  onCancel,
  title,
  visible = false,
  isOnOk = false,
}) => {
  return (
    <PopupView
      visible={visible}
      style={[styles.modalContainer, style]}
      styleContent={[styleContent]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <Button
          label="Cancel"
          onPress={onCancel}
          styleWrapper={styles.buttonWrapper}
          styleTxtButton={styles.button}
          style={{height: Responsive.height(32)}}
        />
        {isOnOk && (
          <Button
            label="OK"
            onPress={onOk}
            styleWrapper={[
              styles.buttonWrapper,
              {marginLeft: Responsive.width(16)},
            ]}
            styleTxtButton={styles.button}
            style={{height: Responsive.height(32)}}
          />
        )}
      </View>
    </PopupView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: backgroundColor.backgroundDialog,
  },
  title: {
    includeFontPadding: false,
    color: textColor.txtTitleLogin,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    marginTop: Responsive.height(16),
  },
  buttonWrapper: {
    width: Responsive.width(100),
  },
  button: {
    fontSize: Responsive.height(12),
  },
});
