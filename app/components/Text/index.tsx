import { textColor } from '@constants';
import { Responsive } from '@utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';

export interface TextProps extends RNTextProps {
  style?: StyleProp<TextStyle>;
  txtContent?: string;
  i18nKey?: string;
}

export const Text: React.FC<TextProps> = ({ style, txtContent, i18nKey, ...props }) => {
  const { t } = useTranslation();

  const textDefaultStyle: TextStyle = {
    includeFontPadding: false,
    fontSize: Responsive.height(14),
    color: textColor.descText,
    overflow: 'hidden',
    letterSpacing: Responsive.width(0.5),
  };

  let translatedText = txtContent;

  if (i18nKey) {
    translatedText = t(i18nKey);
  }

  return (
    <RNText style={[textDefaultStyle, style]} {...props}>
      {translatedText}
    </RNText>
  );
};
