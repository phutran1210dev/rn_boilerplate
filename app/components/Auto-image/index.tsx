import React, {FC, useLayoutEffect, useState} from 'react';
import {
  Image as RNImage,
  ImageProps as DefaultImageProps,
  ImageURISource,
  Platform,
  ViewStyle,
} from 'react-native';

/**
 * Props for the AutoImage component.
 */
type ImageProps = DefaultImageProps & {
  source: ImageURISource | string; // The image source or URI.
  style?: ViewStyle; // Custom style to be applied to the image.
};

/**
 * An image component that automatically adjusts its size based on the image source.
 */
export const AutoImage: FC<ImageProps> = props => {
  const {source, style, ...rest} = props;

  const [imageSize, setImageSize] = useState<{width: number; height: number}>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const callback = (width: number, height: number) =>
      setImageSize({width, height});

    if (Platform.OS === 'web') {
      RNImage.getSize(source as any, callback);
    } else if (typeof source === 'string') {
      RNImage.getSize(source, callback);
    } else {
      const {width, height} = RNImage.resolveAssetSource(source);
      setImageSize({width, height});
    }
  }, [source]);

  return (
    <RNImage
      {...rest}
      source={typeof source === 'string' ? {uri: source} : source}
      style={[imageSize, style]}
    />
  );
};
