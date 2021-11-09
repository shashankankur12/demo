import React from 'react';
import { Box } from 'atoms/Box';
import { Text } from 'atoms/Text';
import { LocaleString } from 'locales/en';
import { Icon, IconName } from 'atoms/Icon';
import { Touch } from 'atoms/Touch';
import { Row } from 'atoms/Row';
import { PressEvent } from 'typings/utils';
import { Card } from 'atoms/Card';

type SettingCardProps = {
  heading?: LocaleString;
  iconname?: IconName;
  onPress?: PressEvent;
};
export const SettingCard = ({
  heading,
  iconname,
  onPress,
}: SettingCardProps) => {
  return (
    <Box m="m" bg="whiteText">
      <Touch onPress={onPress}>
        <Card p="m" bg="lightBackground">
          <Row alignItems="center" width="100%" justifyContent="flex-start">
            <Text localeId={heading} variant="title" color="primary" />
            <Box position="absolute" right={0}>
              <Icon size={18} name={iconname!} color="grey" />
            </Box>
            <Box />
          </Row>
        </Card>
      </Touch>
    </Box>
  );
};
