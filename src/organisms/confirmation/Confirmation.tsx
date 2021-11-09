import React from 'react';
import { Box } from 'atoms/Box';
import { Text } from 'atoms/Text';
import { Button } from 'molecules/Button';
import { ImageBase } from 'atoms/Image';
import { LocaleString } from 'locales/en';
import { PressEvent } from 'typings/utils';
import { ImageSourcePropType } from 'react-native';

type confirmationProps = {
  source: ImageSourcePropType;
  heading?: LocaleString;
  message?: LocaleString;
  buttonText: LocaleString;
  onPress: PressEvent;
};
export const Confirmation = ({
  source,
  heading,
  message,
  buttonText,
  onPress,
}: confirmationProps) => {
  return (
    <Box width="100%" alignSelf="center" p="m">
      <Box alignSelf="center" pt="xl" py="ml" top={25}>
        <ImageBase source={source} size={120} />
      </Box>
      <Text
        localeId={heading}
        p="m"
        pt="xxl"
        lineHeight={25}
        textAlign="center"
        variant="headlineSemibold"
      />
      {message && (
        <Text
          p="l"
          pt="-l"
          localeId={message}
          textAlign="center"
          variant="titleRegular"
        />
      )}
      <Box pt="m">
        <Button title={buttonText} variant="primary" onPress={onPress} />
      </Box>
    </Box>
  );
};
