import {iPad, isTabletAndroid} from './checkDevice';
import {Dimensions, PixelRatio} from 'react-native';

const {width: DEVICE_SCREEN_WIDTH, height: DEVICE_SCREEN_HEIGHT} =
  Dimensions.get('screen');

/**
 * DESIGN_SCREEN_WIDTH: number
 * Width of screen on figma
 */
const DESIGN_SCREEN_WIDTH = 375;

/**
 * DESIGN_SCREEN_HEIGHT: number
 * Height of screen on figma
 */
const DESIGN_SCREEN_HEIGHT = 812;

/**
 * Get width for each device.
 *
 * @param {number | string} designWidth - The width on the design.
 * @returns {number} The calculated width for the current device.
 * Recommend using this function rather than the "height" function.
 */
const width = (designWidth: number | string): number => {
  const elemWidth =
    typeof designWidth === 'number' ? designWidth : parseFloat(designWidth);
  const tabletWidth = iPad || isTabletAndroid ? 2 : 1;
  return PixelRatio.roundToNearestPixel(
    (DEVICE_SCREEN_WIDTH * elemWidth) / tabletWidth / DESIGN_SCREEN_WIDTH,
  );
};

/**
 * Get height for each device.
 *
 * @param {number | string} designHeight - The height on the design.
 * @returns {number} The calculated height for the current device.
 * If a screen has used both width and height, the UI might be wrong on tablets.
 * Recommend using the "width" function instead.
 */
const height = (designHeight: number | string): number => {
  const elemHeight =
    typeof designHeight === 'number' ? designHeight : parseFloat(designHeight);
  return PixelRatio.roundToNearestPixel(
    (DEVICE_SCREEN_HEIGHT * elemHeight) / DESIGN_SCREEN_HEIGHT,
  );
};

const Responsive = {
  width,
  height,
  WIDTH: DEVICE_SCREEN_WIDTH,
  HEIGHT: DEVICE_SCREEN_HEIGHT,
};

export {Responsive};
