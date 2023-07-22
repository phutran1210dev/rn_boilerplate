import React, {FC} from 'react';
import {Modal, StyleProp, View, ViewStyle} from 'react-native';
import styles from './styles';

/**
 * Props for PopupView component.
 */
type PopupProps = {
  style?: StyleProp<ViewStyle>;
  styleContent?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  visible?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
};

/**
 * A reusable component for displaying a popup view.
 *
 * @param {PopupProps} props - The props for the PopupView component.
 * @returns {JSX.Element} The rendered PopupView component.
 */
export const PopupView: FC<PopupProps> = ({
  style,
  styleContent,
  children,
  visible = false,
  animationType = 'slide',
}) => {
  return (
    <Modal visible={visible} transparent animationType={animationType}>
      <View style={[styles.container, style]}>
        <View style={[styles.ctnContent, styleContent]}>{children}</View>
      </View>
    </Modal>
  );
};
