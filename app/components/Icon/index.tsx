import { Responsive } from '@utils';
import React, { FC, useLayoutEffect } from 'react';
import {
  Image,
  ImageStyle,
  Platform,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';


interface IconProps extends TouchableOpacityProps {
  icon: string | number;
  color?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

type WrapperProps = TouchableOpacityProps & {
  isPressable: boolean;
  hitSlop?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
};

const Wrapper: FC<WrapperProps> = ({ isPressable, ...props }) =>
  isPressable ? (
    <TouchableOpacity accessibilityRole="imagebutton" {...props} />
  ) : (
    <View {...props} />
  );

export const Icon: FC<IconProps> = ({
  icon,
  color,
  size = 24,
  style: $imageStyleOverride,
  containerStyle: $containerStyleOverride,
  ...wrapperProps
}) => {
  useLayoutEffect(() => {
    const callback = () => {
      if (Platform.OS === 'web') {
        Image.getSize(icon as any, callback);
      } else if (typeof icon === 'string') {
        Image.getSize(icon, callback);
      }
    };
    callback();
  }, [icon]);

  return (
    <Wrapper
      isPressable={!!wrapperProps.onPress}
      style={$containerStyleOverride}
      {...wrapperProps}
    >
      <Image
        style={[
          $imageStyle,
          color && { tintColor: color },
          size && {
            width: Responsive.width(size),
            height: Responsive.height(size),
          },
          $imageStyleOverride,
        ]}
        source={typeof icon === 'string' ? { uri: icon } : icon}
      />
    </Wrapper>
  );
};

const $imageStyle: ImageStyle = {
  resizeMode: 'contain',
};
