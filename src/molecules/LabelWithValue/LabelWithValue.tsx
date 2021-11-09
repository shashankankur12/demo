import React from 'react';
import { Row } from 'atoms/Row';
import { Text } from 'atoms/Text';
import { LocaleString } from 'locales/en';
import { Box } from 'atoms/Box';

export const LabelWithValue = ({ value, label, locale, ...props }) => {
  return (
    <Row alignItems="center" {...props} mt="s">
      <Box flex={3}>
        <Text
          lineHeight={30}
          variant="titleDescription"
          color="greyText"
          localeId={label as LocaleString}
        />
      </Box>
      <Box flex={4}>
        <Text variant="titleDescription">{value}</Text>
      </Box>
    </Row>
  );
};
