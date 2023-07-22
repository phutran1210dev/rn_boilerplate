import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  StyleProp,
} from 'react-native';

import styles from './styles';
import {AutoImage, Text} from '@components';

/**
 * The type of button.
 */
type ButtonType = 'default' | 'white';

/**
 * Props for the ButtonCustom component.
 */
type ButtonCustomProps<T> = {
  label?: string; // The text label for the button.
  isDisable?: boolean; // Determines whether the button is disabled or not.
  style?: StyleProp<ViewStyle>; // Custom style to be applied to the button container.
  typeButton?: ButtonType; // The type of button. Possible values are 'default' (default) or 'white'.
  labelUnit?: string; // The label for a unit button.
  isUnit?: boolean; // Determines if the button is a unit button.
  labelLeft?: string; // The left label for a unit button.
  labelRight?: string; // The right label for a unit button.
  onPress?: (data: T) => void; // Event handler for the button's onPress event.
  stylePrimary?: boolean; // Determines if the button has a primary style.
  icon?: any; // The icon component or image source for the button.
  styleIconButton?: StyleProp<ImageStyle>; // Custom style to be applied to the button's icon.
  styleTxtButton?: StyleProp<any>; // Custom style to be applied to the button's label text.
  styleWrapper?: StyleProp<ViewStyle>; // Custom style to be applied to the wrapper container.
};

/**
 * A custom button component.
 *
 * @template T - The type of data to be passed in the onPress event.
 */
export const Button = <T extends unknown>({
  label,
  isDisable,
  style,
  typeButton = 'default',
  labelLeft,
  isUnit = false,
  labelRight,
  onPress,
  stylePrimary = false,
  icon,
  styleIconButton,
  styleTxtButton,
  styleWrapper,
}: ButtonCustomProps<T>): JSX.Element => {
  /**
   * Renders the content of the button based on its configuration.
   *
   * @returns The rendered content JSX.
   */
  const renderButtonContent = () => {
    if (icon) {
      return <AutoImage source={icon} style={[styles.icon, styleIconButton]} />;
    }

    if (isUnit) {
      return (
        <View style={styles.ctnPayment}>
          <Text style={styles.txtPayment}>{labelLeft}</Text>
          <Text style={styles.txtPayment}>{labelRight}</Text>
        </View>
      );
    }

    return (
      <Text
        style={[
          styles.txtNormal,
          stylePrimary && styles.txtPrimary,
          styleTxtButton,
        ]}>
        {label}
      </Text>
    );
  };

  return (
    <View style={[styles.container, styleWrapper]}>
      {typeButton === 'default' ? (
        <TouchableOpacity
          disabled={isDisable}
          style={[
            isDisable ? styles.ctnDisable : styles.btnDefault,
            stylePrimary && styles.stylePrimary,
            style,
          ]}
          onPress={() => onPress?.(undefined as unknown as T)}>
          {renderButtonContent()}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={isDisable}
          style={[isDisable ? styles.ctnDisable : styles.ctnWhite, style]}>
          <Text style={styles.txtWhite}>{label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
